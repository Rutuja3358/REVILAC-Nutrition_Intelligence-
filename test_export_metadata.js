const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');
const checks = [
  ['workbench export reports current development version', /version:'3\.36 production-candidate development build'/.test(html)],
  ['stale 2.8 export version is absent', !/version:'2\.8 deep QA prototype'/.test(html)],
  ['export warns that this is educational and not diagnosis', /notice:'Educational prototype; no diagnosis or prescribed diet\./.test(html)],
  ['export timestamp is generated at export time', /exportedAt:new Date\(\)\.toISOString\(\)/.test(html)],
  ['export includes report and safety context', /report:window\.__P26_REPORT[\s\S]*safety:window\.__P26_SAFETY/.test(html)],
];
for (const [name, ok] of checks) console.log(`${ok ? 'PASS' : 'FAIL'}: ${name}`);
const failed = checks.filter(([, ok]) => !ok).length;
console.log(`Export metadata checks: ${checks.length - failed}/${checks.length} passed`);
if (failed) process.exit(1);
