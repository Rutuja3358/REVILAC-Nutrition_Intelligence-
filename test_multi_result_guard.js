'use strict';
const fs = require('fs');
const assert = require('assert');
const html = fs.readFileSync(require('path').join(__dirname, 'index.html'), 'utf8');
const checks = [
  ['collects all recognized matches', /const foundAll\s*=\s*\[\]/.test(html) && /text\.matchAll\(/.test(html)],
  ['deduplicates repeated identical results', /!foundAll\.some\(x=>x\.name===item\.name&&x\.value===item\.value&&x\.unit===item\.unit\)/.test(html)],
  ['single-result autofill is only a fallback when no automatic queue was created', /if\(found && autoQueued===0\)/.test(html)],
  ['all confident results are queued without typing', /queueDetectedMeasurementsAutomatically\(foundAll,text\)/.test(html)],
  ['automatic extraction still requires patient visual confirmation before saving', /measurements\.length&&!\$\('confirmValues'\)\.checked/.test(html)],
  ['ambiguous numeric tokens are held back', /if\(!normalized\?\.ok\)\{ambiguousNumericTokens\.push/.test(html)]
];
for (const [name, ok] of checks) { console.log(`${ok ? 'PASS' : 'FAIL'} ${name}`); assert.ok(ok, name); }
console.log(`Automatic report flow: ${checks.length}/${checks.length} checks passed`);
