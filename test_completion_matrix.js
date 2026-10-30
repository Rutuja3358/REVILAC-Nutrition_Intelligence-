// Structural completeness matrix guard; not a production-readiness test.
'use strict';
const assert=require('assert'),fs=require('fs');
const scope=fs.readFileSync('REVILAC_30_SECTION_SCOPE.md','utf8');
const matrix=fs.readFileSync('FINAL_COMPLETION_MATRIX_v3.31.md','utf8');
const titles=[
'Patient Intelligence Profile','Comprehensive Nutrition Engine','Personalized Requirement Engine','Patient-Controlled Food Intelligence','Dynamic Intake Calculator','Nutrient Gap Analysis','Nutrition Trend Intelligence','Evidence & Uncertainty Engine','Nutrition Report Reader','OCR Verification','Patient History & Timeline','Context Correlation','Allergy & Restriction Safety','Daily Wellness Tracker','Personalized Reminders','Progress & Feedback','Adaptive Guidance','Multilingual Interface','Voice & Picture Assistance','Accessible Interface','Age-Appropriate Safety','Privacy & Consent','Backup & Data Recovery','Multi-Device Support','Verified Nutrition Database','Reliable Calculations','Safety Escalation','Automated Testing','End-to-End Testing','Final Consolidated Package'];
for(let i=0;i<titles.length;i++){
 assert(scope.includes(`${i+1}. ${titles[i]}`),`scope preserves section ${i+1}: ${titles[i]}`);
 assert(matrix.includes(`| ${i+1} | ${titles[i]} |`),`completion matrix covers section ${i+1}: ${titles[i]}`);
}
assert(matrix.includes('Not completed') || matrix.includes('not completed') || matrix.includes('Incomplete'),'matrix should disclose incomplete items');
assert(matrix.toLowerCase().includes('not production-ready'),'matrix must retain release boundary');
console.log('PASS completion matrix: all 30 pinned sections preserved and assigned a status');
console.log('PASS completion matrix: incomplete production gates explicitly disclosed');
