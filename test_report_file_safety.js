const fs=require('fs');
const html=fs.readFileSync('index.html','utf8');
let pass=0,fail=0;
function t(name,fn){try{if(fn()){console.log('PASS '+name);pass++}else{console.log('FAIL '+name);fail++}}catch(e){console.log('FAIL '+name+': '+e.message);fail++}}
t('15 MiB report upload limit is declared',()=>html.includes('MAX_REPORT_FILE_BYTES=15*1024*1024'));
t('oversize helper checks actual file size',()=>html.includes('file.size>MAX_REPORT_FILE_BYTES'));
t('file picker warns when selected file exceeds limit',()=>html.includes("$('fileInfo').textContent=reportFileSizeMessage()"));
t('image OCR blocks oversize files',()=>/async function runImageOCR\(\)\{[\s\S]{0,180}reportFileTooLarge\(file\)/.test(html));
t('PDF text extraction blocks oversize files',()=>/async function runPdfText\(\)\{[\s\S]{0,180}reportFileTooLarge\(file\)/.test(html));
t('scanned PDF OCR blocks oversize files',()=>/async function runScannedPdfOCR\(\)\{[\s\S]{0,180}reportFileTooLarge\(file\)/.test(html));
t('selectable PDF extraction has page cap',()=>html.includes('const maxPages=Math.min(pdf.numPages,50)'));
t('scanned PDF OCR remains capped at 20 pages',()=>html.includes('Math.min(pdf.numPages,20)'));
console.log(`\nReport file safety: ${pass} passed, ${fail} failed`);process.exitCode=fail?1:0;
