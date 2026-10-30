'use strict';
const fs = require('fs');
const assert = require('assert');
const path = require('path');
const html = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8');
const start = html.indexOf(' const analytes=[');
const end = html.indexOf(' // Collect every recognizable analyte', start);
assert.ok(start >= 0 && end > start, 'analyte parser block exists');
const block = html.slice(start, end);
const checks = [
  ['analyte parser exists', start >= 0 && end > start],
  ['HbA1c label/value whitespace is horizontal-only', /glycosylated haemoglobin\)\[ \\t\]\*/.test(block)],
  ['hemoglobin label/value whitespace is horizontal-only', /\|Hb\)\[ \\t\]\*/.test(block)],
  ['glucose label/value whitespace is horizontal-only', /\|glucose\)\[ \\t\]\*/.test(block)],
  ['vitamin D label/value whitespace is horizontal-only', /vitamin\[ \\t\]\*D\)\[ \\t\]\*/.test(block)],
  ['creatinine label/value whitespace is horizontal-only', /creatinine\[ \\t\]\*\[:=\]/.test(block)],
  ['analyte regexes do not contain newline-capable whitespace wildcard', !/\\s\*/.test(block)],
  ['manual verification notice remains in picker flow', /Verify value and unit against the original report/.test(html)],
];
for (const [name, ok] of checks) {
  console.log(`${ok ? 'PASS' : 'FAIL'} ${name}`);
  assert.ok(ok, name);
}
console.log(`OCR analyte pairing safety: ${checks.length}/${checks.length} passed`);
