'use strict';
const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const dist = path.join(root, 'dist');
const files = [
  'index.html', 'manifest.webmanifest', 'service-worker.js', 'privacy-vault-bootstrap.js',
  'nutrition-core.js', 'universal-report-nutrition.js', 'report-wellness-integration.js',
  'revilac-final-guidance.js', 'fooddata-central-client.js'
];
for (const file of files) {
  const source = path.join(root, file);
  if (!fs.existsSync(source) || !fs.statSync(source).isFile()) {
    console.error(`Missing required static asset: ${file}`);
    process.exit(1);
  }
}
fs.rmSync(dist, { recursive: true, force: true });
fs.mkdirSync(path.join(dist, 'icons'), { recursive: true });
for (const file of files) fs.copyFileSync(path.join(root, file), path.join(dist, file));
fs.copyFileSync(path.join(root, 'icons', 'revilac-icon.svg'), path.join(dist, 'icons', 'revilac-icon.svg'));
fs.writeFileSync(path.join(dist, '.nojekyll'), '');
const forbidden = [];
function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full);
    else if (/^\.env(?:\.|$)/i.test(entry.name) || /patient.*data|server-data|accounts\.json/i.test(entry.name) || /(^|\/)(?:production-server|account-server)\.js$/i.test(full.slice(dist.length + 1))) forbidden.push(full);
  }
}
walk(dist);
if (forbidden.length) {
  console.error('Forbidden file found in public static artifact:', forbidden.join(', '));
  process.exit(1);
}
console.log(`Built allowlisted static PWA at dist/ (${files.length + 2} files).`);
console.log('This artifact is local-first only; it does not provide backend accounts or cross-device cloud sync.');
