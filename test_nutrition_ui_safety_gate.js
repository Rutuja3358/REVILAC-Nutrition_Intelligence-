'use strict';
const fs = require('fs');
const html = fs.readFileSync(require('path').join(__dirname, 'index.html'), 'utf8');
const start = html.indexOf('function buildNutritionIntelligence()');
const end = html.indexOf('\nfunction saveNIContext()', start);
if (start < 0 || end < 0) throw new Error('Nutrition intelligence function not found');
const fn = html.slice(start, end);
const tests = [
  ['diabetes included in high-risk gate', /\['kidney','liver','pregnancy','child','cancer','diabetes','other'\]\.includes\(risk\)/.test(fn)],
  ['under-18 age included in high-risk gate', /ageRaw!==''&&age<18/.test(fn)],
  ['invalid age entry triggers review', /ageInvalid=ageRaw!==''&&\(!Number\.isFinite\(age\)\|\|age<0\|\|age>120\)/.test(fn) && /\|\|ageInvalid/.test(fn)],
  ['allergy notes trigger review', /allergy\.length>0/.test(fn)],
  ['kidney/liver topic triggers review', /\['kidney','liver'\]\.includes\(topic\)/.test(fn)],
  ['review gate returns before rendering food cards', /if\(needsReview\)[\s\S]*?\$\('niResults'\)\.innerHTML=html;return;[\s\S]*?foods\.map/.test(fn)],
  ['review notice says tailored food list is not generated', /No tailored food list is generated/.test(fn)],
];
let failed = 0;
for (const [name, ok] of tests) { console.log(`${ok ? 'PASS' : 'FAIL'} ${name}`); if (!ok) failed++; }
console.log(`Nutrition UI safety-gate regression: ${tests.length-failed}/${tests.length} passed`);
process.exitCode = failed ? 1 : 0;
const planStart = html.indexOf("p26('p26PlanBuild')?.addEventListener('click'");
const planEnd = html.indexOf("p26('p26RunTests')?.addEventListener('click'", planStart);
if (planStart < 0 || planEnd < 0) throw new Error('Meal planner handler not found');
const planFn = html.slice(planStart, planEnd);
const planTests = [
  ['meal planner blocks selected safety flags', /checkedFlags\.length>0/.test(planFn)],
  ['meal planner blocks free-text allergy/restriction notes', /allergyNotes\.length>0/.test(planFn)],
  ['meal planner blocks free-text preferences/exclusions instead of guessing', /needs\.length>0/.test(planFn)],
  ['safety screen records allergy notes as review-needed', /const high=flags\.length>0\|\|allergyNotes\.length>0/.test(html)],
];
for (const [name, ok] of planTests) { console.log(`${ok ? 'PASS' : 'FAIL'} ${name}`); if (!ok) failed++; }
console.log(`Additional planner safety regressions: ${planTests.length-planTests.filter(t=>!t[1]).length}/${planTests.length} passed`);
