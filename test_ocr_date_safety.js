const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');
const start = html.indexOf('function autoFillFromExtractedText');
const end = html.indexOf("$('autoFillBtn').addEventListener", start);
const block = html.slice(start, end);
const checks = [
  ['OCR date autofill treats the prefilled current date as untouched', /if\(!date\.value\|\|date\.value===defaultToday\)/.test(block)],
  ['ambiguous day/month dates require manual review', /date needs manual review \(ambiguous day\/month order\)/.test(block)],
  ['invalid calendar dates require manual review', /date needs manual review \(invalid calendar date\)/.test(block)],
  ['date candidates are validated by ISO round-trip', /parsed\.toISOString\(\)\.slice\(0,10\)===candidate/.test(block)],
  ['autofill never claims date verification', /Verify them against the original/.test(block) || /Verify every field against the original report/.test(block)]
];
let failed = 0;
for (const [name, ok] of checks) { console.log(`${ok ? 'PASS' : 'FAIL'} ${name}`); if (!ok) failed++; }
console.log(`OCR date safety checks: ${checks.length - failed} passed, ${failed} failed`);
process.exitCode = failed ? 1 : 0;
