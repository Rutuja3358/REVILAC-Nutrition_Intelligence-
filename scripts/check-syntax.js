'use strict';
const fs = require('node:fs');
const path = require('node:path');
const { spawnSync } = require('node:child_process');
const root = path.resolve(__dirname, '..');
const files = fs.readdirSync(root).filter(n => n.endsWith('.js')).sort();
let failed = 0;
for (const file of files) {
  const result = spawnSync(process.execPath, ['--check', path.join(root, file)], { cwd: root, encoding: 'utf8' });
  if (result.status !== 0) {
    failed++;
    console.error(`FAIL ${file}\n${result.stderr || result.stdout}`);
  }
}
console.log(`Syntax check: ${files.length - failed}/${files.length} root JavaScript files passed.`);
process.exitCode = failed ? 1 : 0;
