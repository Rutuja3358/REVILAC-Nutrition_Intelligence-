'use strict';
const fs=require('node:fs');const assert=require('node:assert');const path=require('node:path');
const server=fs.readFileSync(path.join(__dirname,'local-server.js'),'utf8');const html=fs.readFileSync(path.join(__dirname,'index.html'),'utf8');
const checks=[
 ['local PDF OCR endpoint is registered',/pathname === '\/api\/local-pdf-ocr' && req\.method === 'POST'/.test(server)],
 ['PDF endpoint accepts PDF MIME only',/type !== 'application\/pdf'/.test(server)],
 ['PDF body is bounded to 25 MB',/const chunks=\[\]; let size=0; const limit=25\*1024\*1024/.test(server)],
 ['native PDF text extraction is attempted first',/execFileAsync\('pdftotext',\['-layout',input,'-'\]/.test(server)],
 ['scanned PDF pages are capped at 20',/if\(pageCount>20\)/.test(server)],
 ['PDF rasterization uses argument array without shell',/execFileAsync\('pdftoppm',\[/.test(server)],
 ['Tesseract reads rendered PDF pages locally',/execFileAsync\('tesseract',\[path\.join\(dir,pages\[i\]\),'stdout','-l','eng'\]/.test(server)],
 ['temporary PDF working directory is cleaned',/fs\.rmSync\(dir,\{recursive:true,force:true\}\)/.test(server)],
 ['browser tries local PDF processing before CDN PDF.js',html.indexOf('tryLocalPdfOCR(file)')>0&&html.indexOf('tryLocalPdfOCR(file)')<html.indexOf('https://cdnjs.cloudflare.com/ajax/libs/pdf.js')],
 ['manual confirmation remains required before saving',/if\(measurements\.length&&!\$\('confirmValues'\)\.checked\)/.test(html)]
];
for(const [name,ok] of checks){console.log(`${ok?'PASS':'FAIL'} ${name}`);assert.ok(ok,name)}
console.log(`Local PDF OCR offline-path checks: ${checks.length}/${checks.length} passed`);
