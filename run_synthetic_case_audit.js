'use strict';
const fs = require('fs');
const path = require('path');
const root = __dirname;
const fixtures = JSON.parse(fs.readFileSync(path.join(root, 'SYNTHETIC_REPORT_TEST_CASES.json'), 'utf8'));
const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const checks = [
  ['synthetic fixture notice exists', fixtures.notice.includes('Synthetic QA fixtures only')],
  ['at least ten synthetic cases exist', fixtures.cases.length >= 10],
  ['case IDs are unique', new Set(fixtures.cases.map(x => x.id)).size === fixtures.cases.length],
  ['each case has expected behavior', fixtures.cases.every(x => typeof x.expected === 'string' && x.expected.length > 10)],
  ['no real patient name in fixtures', !/Rutuja|Tandle/i.test(JSON.stringify(fixtures))],
  ['workbench remains in app', /Eight-pillar workbench/.test(html)],
  ['safety language remains in app', /safety|clinician|review/i.test(html)],
  ['limitations documented', fs.existsSync(path.join(root, 'RELEASE_CHECKLIST_v3.1.md'))]
];
let failed = 0;
for (const [name, ok] of checks) { console.log(`${ok ? 'PASS' : 'FAIL'}: ${name}`); if (!ok) failed++; }
console.log(`Synthetic QA fixture audit: ${checks.length-failed}/${checks.length} passed`);
process.exitCode = failed ? 1 : 0;
