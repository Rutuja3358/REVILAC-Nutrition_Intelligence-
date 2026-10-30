'use strict';
const fs=require('fs');
const html=fs.readFileSync(require('path').join(__dirname,'index.html'),'utf8');
const checks=[
 ['picker container exists',html.includes('id="ocrResultPicker"')],
 ['accessible select exists',html.includes('id="ocrDetectedSelect" aria-label="Detected measurement to use"')],
 ['use-selected button exists',html.includes('id="ocrUseDetectedBtn"')],
 ['detected results are populated from parser output',html.includes('foundAll.forEach((item,i)=>')],
 ['selection bounds are checked',html.includes('i<0||i>=list.length')],
 ['selected result fills only its own measurement fields',html.includes("$('metricName').value=item.name")&&html.includes("$('metricValue').value=item.value")&&html.includes("$('metricUnit').value=item.unit||''")],
 ['reference range is not guessed for selected result',html.includes("$('metricRange').value='';")],
 ['save confirmation is reset for each selected result',html.includes("$('confirmValues').checked=false")],
 ['manual source verification is explicitly requested',html.includes('Verify value and unit against the original report')]
];
for(const [name,ok] of checks) console.log(`${ok?'PASS':'FAIL'} ${name}`);
console.log(`${checks.filter(x=>x[1]).length}/${checks.length} multi-measurement picker checks passed`);
if(checks.some(x=>!x[1]))process.exit(1);
