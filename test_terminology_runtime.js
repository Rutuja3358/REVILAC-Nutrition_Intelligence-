'use strict';
const assert = require('node:assert/strict');
const {spawn} = require('node:child_process');
const path = require('node:path');
const PORT = 18787 + (process.pid % 1000);
const base = `http://127.0.0.1:${PORT}`;
const child = spawn(process.execPath, [path.join(__dirname, 'terminology-server.js')], {
  cwd: __dirname, env: {...process.env, PORT: String(PORT)}, stdio: ['ignore','pipe','pipe']
});
let logs = '';
child.stdout.on('data', d => logs += d.toString());
child.stderr.on('data', d => logs += d.toString());
const sleep = ms => new Promise(r => setTimeout(r, ms));
async function waitReady() {
  for (let i=0;i<50;i++) {
    if (child.exitCode !== null) throw new Error(`server exited early: ${logs}`);
    try { const r=await fetch(`${base}/api/terminology/status`); if(r.ok) return; } catch {}
    await sleep(100);
  }
  throw new Error(`server did not start: ${logs}`);
}
(async()=>{
  const checks=[];
  const check=async(name,fn)=>{try{await fn();checks.push(`PASS ${name}`)}catch(e){checks.push(`FAIL ${name}: ${e.message}`)}};
  try {
    await waitReady();
    await check('status endpoint returns JSON', async()=>{const r=await fetch(`${base}/api/terminology/status`);assert.equal(r.status,200);assert.equal((await r.json()).adapter,'REVILAC local terminology adapter')});
    await check('local search returns marked starter concepts', async()=>{const r=await fetch(`${base}/api/terminology/search?system=local&q=ferritin`);assert.equal(r.status,200);const j=await r.json();assert.ok(Array.isArray(j.results));assert.ok(j.meta.notice.includes('verify official codes'))});
    await check('oversized query rejected', async()=>{const r=await fetch(`${base}/api/terminology/search?system=local&q=${'a'.repeat(121)}`);assert.equal(r.status,400)});
    await check('unknown system rejected', async()=>{const r=await fetch(`${base}/api/terminology/search?system=madeup&q=test`);assert.equal(r.status,400)});
    await check('non-GET method rejected', async()=>{const r=await fetch(`${base}/api/terminology/status`,{method:'POST'});assert.equal(r.status,405)});
    await check('path traversal rejected', async()=>{const r=await fetch(`${base}/..%2F..%2Fetc%2Fpasswd`);assert.equal(r.status,403)});
    await check('malformed percent-encoding returns 400 without server crash', async()=>{const r=await fetch(`${base}/%E0%A4%A`);assert.equal(r.status,400);assert.equal(child.exitCode,null)});
    console.log(checks.join('\n'));
    const fails=checks.filter(x=>x.startsWith('FAIL'));
    if(fails.length) process.exitCode=1;
  } catch(e) { console.error(e.stack||e); process.exitCode=1; }
  finally { child.kill(); }
})();
