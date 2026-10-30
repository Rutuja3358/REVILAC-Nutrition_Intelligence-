'use strict';
const fs=require('node:fs');
const path=require('node:path');
const root=__dirname;
const wf=fs.readFileSync(path.join(root,'.github/workflows/deploy-pages.yml'),'utf8');
const guide=fs.readFileSync(path.join(root,'ZERO_COST_PUBLIC_LAUNCH_GUIDE_v3.38.7.md'),'utf8');
const pkg=JSON.parse(fs.readFileSync(path.join(root,'package.json'),'utf8'));
const sw=fs.readFileSync(path.join(root,'service-worker.js'),'utf8');
const builder=fs.readFileSync(path.join(root,'scripts/build-pages.js'),'utf8');
const qr=fs.readFileSync(path.join(root,'tools/generate_app_qr.py'),'utf8');
const checks=[
 ['package version is 3.38.8',pkg.version==='3.38.8'],
 ['Pages deployment is opt-in/manual',wf.includes('workflow_dispatch:')],
 ['deployment runs syntax checks',wf.includes('npm run test:syntax')],
 ['deployment runs regression suite',wf.includes('npm test')],
 ['deployment calls the tested static build script',wf.includes('npm run build:pages')],
 ['static builder uses an explicit allowlist',builder.includes("const files = [") && !builder.includes("readdirSync(root).filter")],
 ['deployment does not copy backend source by wildcard',!wf.includes('cp *.js dist/')],
 ['guide clearly says Pages does not provide cloud sync',guide.includes('does **not** automatically sync between devices')],
 ['guide blocks public patient record QR until secure share service exists',guide.includes('Do not create or distribute patient-specific public URLs/QRs')],
 ['QR tool only accepts HTTPS public app URL',qr.includes("parsed.scheme != 'https'")],
 ['QR tool warns against patient data',qr.includes('contains no patient ID or medical data')],
 ['service worker cache version updated',sw.includes('revilac-app-shell-v3.38.10-brand-assets')]
];
for(const [name,ok] of checks) console.log(`${ok?'PASS':'FAIL'} · ${name}`);
console.log(`${checks.filter(x=>x[1]).length}/${checks.length} zero-cost deployment checks passed`);
if(checks.some(x=>!x[1]))process.exit(1);
