'use strict';
const fs = require('fs');
const assert = require('assert');
const html = fs.readFileSync(require('path').join(__dirname, 'index.html'), 'utf8');
const checks = [
  ['file selection starts automatic extraction', /reportFile'\)\.addEventListener\('change',async e=>/.test(html)],
  ['PDF text extraction automatically falls back to scanned PDF OCR', /const ok=await runPdfText\(\); if\(ok===false\) await runScannedPdfOCR\(\)/.test(html)],
  ['images start OCR automatically', /await runImageOCR\(\)/.test(html)],
  ['extracted text is read-only', /id="ocrText" readonly/.test(html)],
  ['recognized values are queued automatically', /queueDetectedMeasurementsAutomatically\(foundAll,text\)/.test(html)],
  ['ambiguous values are held for review', /if\(!normalized\?\.ok\)\{ambiguousNumericTokens\.push/.test(html)],
  ['saving detected values requires explicit visual confirmation', /measurements\.length&&!\$\('confirmValues'\)\.checked/.test(html)],
  ['clinical clearance remains false on saved records', /clinicalClearance:false/.test(html)]
];
for (const [name, ok] of checks) { console.log(`${ok ? 'PASS' : 'FAIL'} ${name}`); assert.ok(ok, name); }
console.log(`Automatic upload no-typing checks: ${checks.length}/${checks.length} passed`);
