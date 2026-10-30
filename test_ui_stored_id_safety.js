const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');
const checks = [
  ['report delete uses escaped data attribute', /data-delete-report="\$\{esc\(r\.id\)\}"/.test(html)],
  ['reminder toggle uses escaped data attribute', /data-toggle-reminder="\$\{esc\(r\.id\)\}"/.test(html)],
  ['reminder delete uses escaped data attribute', /data-delete-reminder="\$\{esc\(r\.id\)\}"/.test(html)],
  ['report renderer does not interpolate ID into inline handler', !/onclick="deleteReport\('\$\{r\.id\}'\)"/.test(html)],
  ['reminder renderer does not interpolate ID into inline handlers', !/onclick="(?:toggleReminder|deleteReminder)\('\$\{r\.id\}'\)"/.test(html)],
  ['delegated click handler exists', /document\.addEventListener\('click',e=>\{const b=e\.target\.closest\('button\[data-delete-report\]/.test(html)],
];
for (const [name, ok] of checks) console.log(`${ok ? 'PASS' : 'FAIL'}: ${name}`);
const failed = checks.filter(([, ok]) => !ok).length;
console.log(`Stored-ID UI safety checks: ${checks.length - failed}/${checks.length} passed`);
if (failed) process.exit(1);
