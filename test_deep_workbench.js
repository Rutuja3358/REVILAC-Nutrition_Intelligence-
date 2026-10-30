'use strict';
const fs = require('fs');
const path = require('path');
const vm = require('vm');
const root = __dirname;
const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const checks = [];
function check(name, condition, detail='') { checks.push({name, pass: !!condition, detail}); }
const required = [
  ['Universal Report Intelligence', /Universal Report Intelligence/i],
  ['Medical Terminology and Coding', /Medical Terminology/i],
  ['Specific Food and Nutrient Reference', /Specific Food/i],
  ['Explainable Nutrition Reasoning', /Explainable Nutrition/i],
  ['Patient Safety Engine', /Patient Safety/i],
  ['Multilingual Patient Explainer', /Multilingual Patient/i],
  ['Patient-controlled Food-source Alternatives', /Food-source alternatives/i],
  ['Verification and Test Centre', /Verification & Test Centre/i]
];
for (const [name, re] of required) check('module present: '+name, re.test(html));
check('medical-use limitation present', /not a diagnosis|not medical advice|clinician|clinical/i.test(html));
check('safety language present', /safety hold|safety flag|allerg/i.test(html));
check('source/verification language present', /source|verify|verification/i.test(html));
check('local persistence explicitly identifiable', /localStorage/i.test(html));
check('HTML document has closing tags', /<\/html\s*>/i.test(html) && /<\/body\s*>/i.test(html));
check('built-in missing-test self-check matches validator wording', /Missing test identity is detected',[^\n]*includes\('Missing required report field: test\.'\)/.test(html), 'Protects the in-app test from stale error-message expectations');
// Parse inline JavaScript syntax without executing application code.
const scripts = [...html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script\s*>/gi)];
let inlineCount = 0, syntaxErrors = [];
for (const m of scripts) {
  if (/\bsrc\s*=/.test(m[1]) || !m[2].trim()) continue;
  inlineCount++;
  try { new vm.Script(m[2], {filename:'index.html:inline-script-'+inlineCount}); }
  catch (e) { syntaxErrors.push('inline script '+inlineCount+': '+e.message); }
}
check('inline JavaScript syntax', inlineCount > 0 && syntaxErrors.length === 0, syntaxErrors.join('; '));
let catalog;
try { catalog = JSON.parse(fs.readFileSync(path.join(root,'local-terminology-catalog.json'),'utf8')); }
catch(e) { catalog = null; }
check('terminology catalogue parses', !!catalog);
check('terminology catalogue has concepts', !!catalog && Array.isArray(catalog.concepts) && catalog.concepts.length > 0,
  catalog && Array.isArray(catalog.concepts) ? `${catalog.concepts.length} entries` : 'missing concepts');
const server = fs.readFileSync(path.join(root,'terminology-server.js'),'utf8');
check('server uses bounded fetch timeout', /AbortController/.test(server) && /15000/.test(server));
check('provider secrets read from environment', /process\.env/.test(server) && /\.env/.test(server));
check('starter catalogue warns official codes require verification', !!catalog && /verify official codes/i.test(JSON.stringify(catalog)) || /official code not assigned/i.test(server));
const failed = checks.filter(x=>!x.pass);
console.log(`Deep Workbench QA: ${checks.length-failed.length}/${checks.length} static checks passed`);
for (const c of checks) console.log(`${c.pass?'PASS':'FAIL'}: ${c.name}${c.detail?' — '+c.detail:''}`);
console.log('LIMIT: This is a static/logic-surface check, not a browser end-to-end test, OCR accuracy benchmark, security audit, or clinical validation.');
if (failed.length) process.exitCode = 1;
