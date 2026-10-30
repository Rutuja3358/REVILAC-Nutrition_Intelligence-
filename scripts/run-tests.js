'use strict';
const fs = require('node:fs');
const path = require('node:path');
const { spawnSync } = require('node:child_process');
const root = path.resolve(__dirname, '..');
const tests = fs.readdirSync(root).filter(n => /^test_.*\.js$/.test(n)).sort();
if (!tests.length) { console.error('No test_*.js files found.'); process.exit(2); }
let failed = 0;
for (const file of tests) {
  process.stdout.write(`\n=== ${file} ===\n`);
  const result = spawnSync(process.execPath, [path.join(root, file)], { cwd: root, encoding: 'utf8', timeout: 120000 });
  if (result.stdout) process.stdout.write(result.stdout);
  if (result.stderr) process.stderr.write(result.stderr);
  if (result.error || result.status !== 0) {
    failed++;
    console.error(`FAIL ${file}: ${result.error ? result.error.message : `exit ${result.status}`}`);
  } else {
    console.log(`PASS ${file}`);
  }
}
console.log(`\nRESULT: ${tests.length - failed}/${tests.length} scripts passed; ${failed} failed.`);
process.exitCode = failed ? 1 : 0;
