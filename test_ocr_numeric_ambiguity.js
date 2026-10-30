'use strict';
const fs=require('fs');const assert=require('assert');const path=require('path');
const html=fs.readFileSync(path.join(__dirname,'index.html'),'utf8');
const core=require('./nutrition-core');
const checks=[
 ['parser delegates numeric normalization to shared core',/normalizeOcrNumericToken\(m\[1\]\)/.test(html)],
 ['ambiguous numeric values are not added to detected results',/if\(!normalized\?\.ok\)\{ambiguousNumericTokens\.push/.test(html)&&/continue\}/.test(html)],
 ['UI explains that ambiguous numeric formatting needs manual review',/Ambiguous numeric formatting needs manual review/.test(html)],
 ['4,5 is normalized as decimal 4.5',core.normalizeOcrNumericToken('4,5').value==='4.5'],
 ['1,234 is treated as ambiguous, not 1.234',!core.normalizeOcrNumericToken('1,234').ok],
 ['1,234.5 is held as mixed separators',!core.normalizeOcrNumericToken('1,234.5').ok],
 ['comparison operators survive normalization',core.normalizeOcrNumericToken('> 7,2').value==='>7.2'],
 ['internal digit whitespace is not silently removed',!core.normalizeOcrNumericToken('1 234').ok],
 ['OCR spacing ambiguity requests manual review',core.normalizeOcrNumericToken('12 34').reason.includes('whitespace')]
];
for(const [name,ok] of checks){console.log(`${ok?'PASS':'FAIL'} ${name}`);assert.ok(ok,name)}
console.log(`OCR numeric ambiguity checks: ${checks.length}/${checks.length} passed`);
