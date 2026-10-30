const fs=require('fs');
const core=require('./nutrition-core');
const html=fs.readFileSync('index.html','utf8');
let pass=0,fail=0;
function t(name,fn){try{if(fn()){console.log('PASS '+name);pass++;}else{console.log('FAIL '+name);fail++;}}catch(e){console.log('FAIL '+name+' '+e.message);fail++;}}
const complete={test:'Hb',value:'12.5',unit:'g/dL',range:'12 - 16',date:'2026-01-01',raw:'Hb 12.5 g/dL',specimen:'whole blood'};
t('complete report gets data-complete but still requires human review',()=>{const a=core.assessReportForSave(complete);return a.status==='data-complete-needs-human-review'&&a.clinicalClearance===false&&a.clinicalInterpretation==='NOT_PERFORMED';});
t('missing measurement fields are stored as incomplete review',()=>core.assessReportForSave({...complete,value:'',unit:''}).status==='incomplete-needs-review');
t('ambiguous values are stored as incomplete review',()=>core.assessReportForSave({...complete,value:'12.5 mg?'}).issues.some(x=>x.includes('ambiguous')));
t('future dates are flagged for review',()=>core.assessReportForSave({...complete,date:'2999-01-01'}).issues.some(x=>x.includes('future')));
t('empty source transcription is flagged',()=>core.assessReportForSave({...complete,raw:''}).issues.some(x=>x.includes('Original report')));
t('save handler invokes report data-quality assessment',()=>/assessReportForSave\s*\(/.test(html)&&/dataQualityStatus:overallStatus/.test(html));
t('save handler stores issues and does not grant clinical clearance',()=>/dataQualityIssues:overallIssues/.test(html)&&/clinicalClearance:false/.test(html));
t('timeline exposes saved data-quality status',()=>/r\.dataQualityStatus\s*\?/.test(html));
t('CSV export includes quality status and issues',()=>/dataQualityStatus','dataQualityIssues/.test(html));
t('user confirmation is recorded but not treated as clinical clearance',()=>/sourceValuesConfirmed:\$\('confirmValues'\)\.checked/.test(html)&&/clinicalClearance:false/.test(html));
console.log(`\nReport save validation: ${pass} passed, ${fail} failed`);
process.exitCode=fail?1:0;
