'use strict';
const fs=require('node:fs');
const s=fs.readFileSync('index.html','utf8');
const checks=[
 ['patient-facing nutrition overview exists',s.includes('id="rvxImmersiveStory"')&&s.includes('Make your nutrition journey clearer.')],
 ['educational body systems map exists',s.includes('id="rvxMapTitle"')&&s.includes('Stylized human silhouette')],
 ['body topic controls cover iron, B12, calcium and protein',['iron','b12','calcium','protein'].every(k=>s.includes('data-rvx-topic="'+k+'"'))],
 ['topic control updates existing nutrition selector',s.includes("const selector=byId('niGoal');if(selector)selector.value=key;")],
 ['live indicators update from existing dashboard refresh',s.includes('updateRvxVisualExperience();renderGuidance();')&&s.includes("byId('rvxReportBadge').textContent=count+' report'" )],
 ['missing report is not described as a deficiency',s.includes('A missing report is not a nutrition deficiency.')],
 ['responsive mobile styling exists',s.includes('@media(max-width:760px){.rvx-grid{grid-template-columns:1fr}')],
 ['reduced motion is respected',s.includes('@media(prefers-reduced-motion:reduce){.rvx-track span{transition:none}}')],
 ['prototype does not claim diagnosis',s.includes('not a reading of your organs or a diagnosis')],
 ['service worker cache revision refreshed',fs.readFileSync('service-worker.js','utf8').includes('v3.38.10-brand-assets')]
];
let failed=0;for(const [name,ok] of checks){console.log((ok?'PASS':'FAIL')+' '+name);if(!ok)failed++}console.log(`Premium visual experience: ${checks.length-failed}/${checks.length} checks passed`);process.exitCode=failed?1:0;
