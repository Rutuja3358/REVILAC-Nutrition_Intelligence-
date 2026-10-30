'use strict';
const fs=require('fs');
const html=fs.readFileSync('index.html','utf8');
const manifest=JSON.parse(fs.readFileSync('manifest.webmanifest','utf8'));
const sw=fs.readFileSync('service-worker.js','utf8');
const checks=[
 ['Manifest linked from app',html.includes('rel="manifest" href="manifest.webmanifest"')],
 ['PWA manifest has standalone display',manifest.display==='standalone'],
 ['App shell has a valid start URL',manifest.start_url==='./index.html'],
 ['Install action is available when browser prompts',html.includes("beforeinstallprompt")&&html.includes('installAppBtn')],
 ['Service worker registration is guarded by browser support',html.includes("'serviceWorker' in navigator")],
 ['Service worker excludes API and JSON from shell caching',sw.includes("url.pathname.includes('/api/') || url.pathname.endsWith('.json')")],
 ['Service worker caches required local app shell assets',sw.includes('APP_SHELL')&&sw.includes('revilac-app-shell-v3.38.10-brand-assets') && !sw.includes('revilac-app-shell-v3.30')&&sw.includes('fooddata-central-client.js')&&sw.includes('revilac-final-guidance.js')&&sw.includes('revilac-premium-icon.png')&&sw.includes('REVILAC-Nutrition-Intelligence-Logo.png')],
 ['Icon exists and is referenced',fs.existsSync('icons/revilac-icon.svg')&&manifest.icons.some(i=>i.src==='icons/revilac-icon.svg')],
 ['No cloud account sync is falsely declared',!manifest.description.toLowerCase().includes('cloud sync')]
];
for(const [name,ok] of checks) console.log(`${ok?'PASS':'FAIL'} · ${name}`);
console.log(`${checks.filter(x=>x[1]).length}/${checks.length} PWA package checks passed`);
if(checks.some(x=>!x[1]))process.exit(1);
