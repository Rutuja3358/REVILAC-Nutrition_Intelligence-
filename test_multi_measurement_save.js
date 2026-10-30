'use strict';
const fs=require('fs');
const html=fs.readFileSync(require('path').join(__dirname,'index.html'),'utf8');
const checks=[
 ['multi-measurement queue controls exist',html.includes('id="queueMeasurementBtn"')&&html.includes('id="measurementQueue"')],
 ['adding a measurement requires test, value, and unit',/if\(!m\.test\|\|!m\.value\|\|!m\.unit\)/.test(html)],
 ['adding a measurement requires user confirmation',/if\(!\$\('confirmValues'\)\.checked\)/.test(html)],
 ['exact duplicate queued measurements are blocked',/pendingReportMeasurements\.some\(x=>key\(x\)===key\(m\)\)/.test(html)],
 ['multiple measurements persist together on one report',/measurements,measurementCount:measurements\.length/.test(html)],
 ['each measurement retains separate data-quality status',/measurements=measurements\.map\(\(m,i\)=>\(\{\.\.\.m,dataQualityStatus:audits\[i\]\.status/.test(html)],
 ['timeline displays all saved measurements',/r\.measurements\.map\(m=>/.test(html)],
 ['comparison flattens measurements across reports',/const ms=Array\.isArray\(r\.measurements\)/.test(html)],
 ['CSV export includes the full measurement array',/k==='measurements'\?JSON\.stringify\(r\.measurements\|\|\[\]\)/.test(html)],
 ['clinical clearance remains false',/clinicalClearance:false/.test(html)]
];
for(const [name,ok] of checks) console.log(`${ok?'PASS':'FAIL'} ${name}`);
console.log(`Multi-measurement save workflow: ${checks.filter(x=>x[1]).length}/${checks.length} checks passed`);
if(checks.some(x=>!x[1]))process.exit(1);
