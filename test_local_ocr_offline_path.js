'use strict';
const fs=require('node:fs');
const assert=require('node:assert');
const path=require('node:path');
const server=fs.readFileSync(path.join(__dirname,'local-server.js'),'utf8');
const html=fs.readFileSync(path.join(__dirname,'index.html'),'utf8');
const checks=[
 ['local OCR endpoint is localhost server route',/pathname === '\/api\/local-ocr' && req\.method === 'POST'/.test(server)],
 ['local OCR restricts MIME types',/\['image\/png','image\/jpeg','image\/webp','image\/bmp','image\/tiff'\]/.test(server)],
 ['local OCR bounds request to 15 MB',/const limit=15\*1024\*1024/.test(server)],
 ['Tesseract invoked without shell interpolation',/execFileAsync\('tesseract',\[input,'stdout','-l','eng'\]/.test(server)],
 ['temporary image is deleted after OCR',/fs\.rmSync\(dir,\{recursive:true,force:true\}\)/.test(server)],
 ['browser tries local OCR before CDN fallback',html.indexOf("fetch('/api/local-ocr'")>0 && html.indexOf("fetch('/api/local-ocr'")<html.indexOf('https://cdn.jsdelivr.net/npm/tesseract.js@5/dist/tesseract.min.js')],
 ['manual confirmation remains required',/measurements\.length&&!\$\('confirmValues'\)\.checked/.test(html)],
 ['clinical clearance remains false',/clinicalClearance:false/.test(html)]
];
for(const [name,ok] of checks){console.log(`${ok?'PASS':'FAIL'} ${name}`);assert.ok(ok,name)}
console.log(`Local OCR offline-path checks: ${checks.length}/${checks.length} passed`);
