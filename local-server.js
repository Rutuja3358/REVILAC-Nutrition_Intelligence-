'use strict';
const http = require('http');
const fs = require('fs');
const path = require('path');
const os = require('os');
const {execFile} = require('child_process');
const {promisify} = require('util');
const execFileAsync = promisify(execFile);
const root = __dirname;
const host = '127.0.0.1';
const port = Number(process.env.PORT || 8000);
try {
  const envFile = fs.readFileSync(path.join(root, '.env'), 'utf8');
  for (const line of envFile.split(/\r?\n/)) {
    const m = line.match(/^\s*FDC_API_KEY\s*=\s*(.*?)\s*$/);
    if (m && !process.env.FDC_API_KEY) process.env.FDC_API_KEY = m[1].replace(/^['\"]|['\"]$/g, '');
  }
} catch (_) {}
const types = {'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.json':'application/json; charset=utf-8','.webmanifest':'application/manifest+json; charset=utf-8','.svg':'image/svg+xml','.png':'image/png','.jpg':'image/jpeg','.jpeg':'image/jpeg','.ico':'image/x-icon'};
const searchCache = new Map();
const SEARCH_CACHE_MAX = 200;
function pruneSearchCache(now = Date.now()) {
  for (const [key, value] of searchCache) if (now - value.at >= 5 * 60_000) searchCache.delete(key);
  while (searchCache.size > SEARCH_CACHE_MAX) searchCache.delete(searchCache.keys().next().value);
}
let searchWindowStart = Date.now();
let searchWindowCount = 0;
function sendJson(res, status, body) {
  res.writeHead(status, {'Content-Type':'application/json; charset=utf-8','Cache-Control':'no-store','X-Content-Type-Options':'nosniff','Referrer-Policy':'no-referrer','X-Frame-Options':'DENY','Permissions-Policy':'camera=(), microphone=(self), geolocation=()'});
  res.end(JSON.stringify(body));
}
async function foodSearch(url, res) {
  const q = String(url.searchParams.get('q') || '').trim();
  if (q.length < 2 || q.length > 80 || /[\u0000-\u001f]/.test(q)) return sendJson(res, 400, {error:'Enter a food name from 2 to 80 characters.'});
  if (Date.now() - searchWindowStart > 60_000) { searchWindowStart = Date.now(); searchWindowCount = 0; }
  searchWindowCount += 1;
  if (searchWindowCount > 20) return sendJson(res, 429, {error:'Local food-search limit reached. Please wait a minute.'});
  pruneSearchCache();
  const key = q.toLowerCase();
  const cached = searchCache.get(key);
  if (cached && Date.now() - cached.at < 5 * 60_000) return sendJson(res, 200, {...cached.data, cached:true});
  if (typeof fetch !== 'function') return sendJson(res, 503, {error:'This Node.js version does not support online food search. Use Node.js 18 or later.'});
  const apiKey = process.env.FDC_API_KEY || 'DEMO_KEY';
  const endpoint = new URL('https://api.nal.usda.gov/fdc/v1/foods/search');
  endpoint.searchParams.set('query', q);
  endpoint.searchParams.set('pageSize', '8');
  endpoint.searchParams.set('api_key', apiKey);
  try {
    const upstream = await fetch(endpoint, {signal:AbortSignal.timeout(9000), headers:{'Accept':'application/json'}});
    if (!upstream.ok) {
      const status = upstream.status === 429 ? 429 : 502;
      return sendJson(res, status, {error:upstream.status === 429 ? 'The food database rate limit was reached. Try again later.' : 'The online food database is temporarily unavailable.', providerStatus:upstream.status});
    }
    const payload = await upstream.json();
    const foods = (Array.isArray(payload.foods) ? payload.foods : []).slice(0,8).map(f => ({
      fdcId: Number.isFinite(Number(f.fdcId)) ? Number(f.fdcId) : null,
      description: String(f.description || '').slice(0,240),
      dataType: String(f.dataType || '').slice(0,80),
      brandOwner: String(f.brandOwner || '').slice(0,160),
      publicationDate: String(f.publicationDate || '').slice(0,30),
      foodNutrients: (Array.isArray(f.foodNutrients) ? f.foodNutrients : []).slice(0,120).map(n => ({
        nutrientId: Number.isFinite(Number(n.nutrientId)) ? Number(n.nutrientId) : null,
        nutrientNumber: String(n.nutrientNumber || '').slice(0,30),
        nutrientName: String(n.nutrientName || n.name || '').slice(0,120),
        unitName: String(n.unitName || n.unit || '').slice(0,20),
        value: Number.isFinite(Number(n.value)) ? Number(n.value) : null
      }))
    }));
    const data = {provider:'USDA FoodData Central',query:q,foods,notice:'Database values describe the selected food record, not a personalized prescription. Confirm the exact food form, edible portion, brand, and units.'};
    searchCache.delete(key);
    searchCache.set(key,{at:Date.now(),data});
    pruneSearchCache();
    return sendJson(res,200,data);
  } catch (e) {
    return sendJson(res,502,{error:'Could not reach the online food database. Check the internet connection or use manually verified food-label data.'});
  }
}
async function localPdfOCR(req,res) {
  const type = String(req.headers['content-type'] || '').split(';')[0].toLowerCase();
  if (type !== 'application/pdf') return sendJson(res,415,{error:'Local PDF OCR accepts application/pdf only.'});
  const chunks=[]; let size=0; const limit=25*1024*1024;
  try {
    for await (const chunk of req) { size += chunk.length; if(size>limit) { sendJson(res,413,{error:'PDF exceeds the 25 MB local processing limit.'}); req.destroy(); return; } chunks.push(chunk); }
    if(!size) return sendJson(res,400,{error:'No PDF bytes received.'});
    const dir=fs.mkdtempSync(path.join(os.tmpdir(),'revilac-pdf-'));
    const input=path.join(dir,'report.pdf');
    try {
      fs.writeFileSync(input,Buffer.concat(chunks),{flag:'wx'});
      // Prefer native PDF text extraction. It is faster and avoids OCR errors when text exists.
      let digitalText='';
      try {
        const result=await execFileAsync('pdftotext',['-layout',input,'-'],{timeout:20000,maxBuffer:5*1024*1024,windowsHide:true});
        digitalText=String(result.stdout||'').trim();
      } catch (_) { /* Try raster OCR below; the error will be explained if tools are missing. */ }
      if(digitalText.replace(/\s/g,'').length>=20) return sendJson(res,200,{text:digitalText.slice(0,500000),engine:'local-pdftotext',pages:null,notice:'Processed locally on this device. Verify every value against the original report.'});
      let info;
      try { info=await execFileAsync('pdfinfo',[input],{timeout:15000,maxBuffer:1024*1024,windowsHide:true}); }
      catch (_) { return sendJson(res,503,{error:'Local PDF tools were not found or this PDF could not be opened. Install Poppler utilities (pdftotext, pdfinfo, pdftoppm) and Tesseract OCR.'}); }
      const pageMatch=String(info.stdout||'').match(/^Pages:\s*(\d+)/m);
      const pageCount=pageMatch?Number(pageMatch[1]):0;
      if(!pageCount) return sendJson(res,422,{error:'Could not determine PDF page count. The PDF may be encrypted, damaged, or unsupported.'});
      if(pageCount>20) return sendJson(res,413,{error:'This PDF has '+pageCount+' pages. For local safety and performance, split it into files of 20 pages or fewer.'});
      try {
        await execFileAsync('pdftoppm',['-f','1','-l',String(pageCount),'-r','180','-png',input,path.join(dir,'page')],{timeout:60000,maxBuffer:2*1024*1024,windowsHide:true});
      } catch (_) { return sendJson(res,503,{error:'Could not render scanned PDF locally. Install Poppler utilities including pdftoppm.'}); }
      const pages=fs.readdirSync(dir).filter(n=>/^page-\d+\.png$/.test(n)).sort((a,b)=>Number(a.match(/page-(\d+)/)[1])-Number(b.match(/page-(\d+)/)[1]));
      if(!pages.length) return sendJson(res,422,{error:'No PDF pages could be rendered for OCR.'});
      const parts=[];
      for(let i=0;i<pages.length;i++){
        try {
          const out=await execFileAsync('tesseract',[path.join(dir,pages[i]),'stdout','-l','eng'],{timeout:45000,maxBuffer:2*1024*1024,windowsHide:true});
          parts.push('--- Scanned PDF page '+(i+1)+' ---\n'+String(out.stdout||'').trim());
        } catch(e) {
          const missing=e&&e.code==='ENOENT';
          return sendJson(res,missing?503:422,{error:missing?'Tesseract OCR was not found. Install Tesseract and ensure it is on PATH.':'OCR failed on scanned PDF page '+(i+1)+'. Try a clearer scan or split the PDF.'});
        }
      }
      return sendJson(res,200,{text:parts.join('\n\n').slice(0,500000),engine:'local-tesseract-pdf',pages:pages.length,notice:'Processed locally on this device. OCR can misread medical values; verify every value, unit, date and reference range against the original report.'});
    } finally { fs.rmSync(dir,{recursive:true,force:true}); }
  } catch(e) {
    return sendJson(res,422,{error:'Local PDF processing failed. The file may be damaged or unsupported.'});
  }
}

async function localImageOCR(req,res) {
  const type = String(req.headers['content-type'] || '').split(';')[0].toLowerCase();
  if (!['image/png','image/jpeg','image/webp','image/bmp','image/tiff'].includes(type)) return sendJson(res,415,{error:'Local OCR accepts PNG, JPEG, WebP, BMP or TIFF images only.'});
  const chunks=[]; let size=0; const limit=15*1024*1024;
  try {
    for await (const chunk of req) { size += chunk.length; if(size>limit) { sendJson(res,413,{error:'Image exceeds the 15 MB local OCR limit.'}); req.destroy(); return; } chunks.push(chunk); }
    if(!size) return sendJson(res,400,{error:'No image bytes received.'});
    const dir=fs.mkdtempSync(path.join(os.tmpdir(),'revilac-ocr-'));
    const ext=({ 'image/png':'.png','image/jpeg':'.jpg','image/webp':'.webp','image/bmp':'.bmp','image/tiff':'.tif'})[type];
    const input=path.join(dir,'report'+ext);
    try {
      fs.writeFileSync(input,Buffer.concat(chunks),{flag:'wx'});
      const {stdout}=await execFileAsync('tesseract',[input,'stdout','-l','eng'],{timeout:90000,maxBuffer:5*1024*1024,windowsHide:true});
      return sendJson(res,200,{text:String(stdout||'').slice(0,500000),engine:'local-tesseract',language:'eng',notice:'Processed on this device. Verify every value against the original report.'});
    } finally { fs.rmSync(dir,{recursive:true,force:true}); }
  } catch(e) {
    const missing=e && (e.code==='ENOENT'||e.code==='ENOEXEC');
    return sendJson(res,missing?503:422,{error:missing?'Local Tesseract was not found. Install Tesseract OCR and ensure it is on PATH, or use the browser OCR fallback.':'Local OCR could not read this image. Try a clearer image or the browser OCR fallback.'});
  }
}

http.createServer(async (req,res)=>{
  let url, pathname;
  try { url = new URL(req.url, `http://${host}:${port}`); pathname = decodeURIComponent(url.pathname); }
  catch { res.writeHead(400); return res.end('Bad request'); }
  // Same-origin proxy to the loopback-only account prototype, kept separate from the app server.
  const accountPaths = new Set(['/api/health','/api/register','/api/login','/api/me','/api/data','/api/logout','/api/password/change','/api/account']);
  if (accountPaths.has(pathname)) {
    const options = {hostname:'127.0.0.1',port:Number(process.env.REVILAC_ACCOUNT_PORT||8001),path:pathname+url.search,method:req.method,headers:{...req.headers,host:'127.0.0.1'}};
    const upstream = http.request(options, upstreamRes => {
      res.writeHead(upstreamRes.statusCode||502, {...upstreamRes.headers,'Cache-Control':'no-store','X-Content-Type-Options':'nosniff','Referrer-Policy':'no-referrer','X-Frame-Options':'DENY'});
      upstreamRes.pipe(res);
    });
    upstream.setTimeout(15000,()=>upstream.destroy(new Error('Account API timeout')));
    upstream.on('error',()=>{ if(!res.headersSent) sendJson(res,503,{error:'Account service is unavailable. Start the REVILAC account service and retry.'}); else res.destroy(); });
    req.pipe(upstream);
    return;
  }
  if (pathname === '/api/food-search' && req.method === 'GET') return foodSearch(url,res);
  if (pathname === '/api/local-ocr' && req.method === 'POST') return localImageOCR(req,res);
  if (pathname === '/api/local-pdf-ocr' && req.method === 'POST') return localPdfOCR(req,res);
  if (pathname === '/api/local-pdf-ocr') return sendJson(res,405,{error:'Use POST to send a PDF for local processing.'});
  if (pathname === '/api/local-ocr') return sendJson(res,405,{error:'Use POST to send an image for local OCR.'});
  if (pathname.startsWith('/api/')) return sendJson(res,404,{error:'Unknown local API endpoint.'});
  if (req.method !== 'GET' && req.method !== 'HEAD') { res.writeHead(405,{'Allow':'GET, HEAD'}); return res.end('Method not allowed'); }
  if (pathname.includes('\0') || pathname.split('/').includes('..')) { res.writeHead(400); return res.end('Bad path'); }
  if (pathname === '/') pathname = '/index.html';
  const file = path.resolve(root, '.' + pathname);
  if (!file.startsWith(root + path.sep) && file !== path.join(root,'index.html')) { res.writeHead(403); return res.end('Forbidden'); }
  fs.stat(file,(err,stat)=>{
    if(err || !stat.isFile()){res.writeHead(404,{'Content-Type':'text/plain; charset=utf-8'});return res.end('Not found');}
    res.writeHead(200,{'Content-Type':types[path.extname(file).toLowerCase()]||'application/octet-stream','X-Content-Type-Options':'nosniff','Referrer-Policy':'no-referrer','X-Frame-Options':'DENY','Permissions-Policy':'camera=(), microphone=(self), geolocation=()','Cache-Control':'no-cache'});
    if(req.method==='HEAD') return res.end();
    fs.createReadStream(file).pipe(res);
  });
}).listen(port,host,()=>console.log(`REVILAC local app server: http://${host}:${port}\nKeep this terminal open. Press Ctrl+C to stop.\nLocal-only server; not internet hosting or a secure multi-user account backend.\nOnline food lookup: USDA FoodData Central proxy enabled (DEMO_KEY limits apply unless FDC_API_KEY is configured).`));
