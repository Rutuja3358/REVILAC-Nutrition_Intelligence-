'use strict';
const fs=require('fs');
const vm=require('vm');
const html=fs.readFileSync(__dirname+'/index.html','utf8');
const start=html.indexOf('function csvCell(v){');
const end=html.indexOf('\nfunction exportReportsCSV',start);
if(start<0||end<0)throw new Error('Could not locate csvCell helper');
const sandbox={};
vm.runInNewContext(html.slice(start,end)+'\nthis.csvCell=csvCell;',sandbox);
const cell=sandbox.csvCell;
const checks=[
 ['quotes ordinary text',cell('Ferritin')==='"Ferritin"'],
 ['escapes embedded quotes',cell('a"b')==='"a""b"'],
 ['neutralizes equals formula',cell('=1+1')==='"\'=1+1"'],
 ['neutralizes plus formula',cell('+CMD')==='"\'+CMD"'],
 ['neutralizes minus formula',cell('-1+2')==='"\'-1+2"'],
 ['neutralizes at-sign formula',cell('@SUM(A1:A2)')==='"\'@SUM(A1:A2)"'],
 ['neutralizes leading whitespace before formula',cell('  =1+1')==='"\'  =1+1"'],
 ['handles null as empty cell',cell(null)==='""']
];
let failed=0;
for(const [name,ok] of checks){if(ok)console.log('PASS: '+name);else{console.error('FAIL: '+name);failed++;}}
console.log(`CSV export safety tests: ${checks.length-failed}/${checks.length} passed`);
if(failed)process.exit(1);
