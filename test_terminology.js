// REVILAC Nutrition Intelligence v2.5 — Node-only smoke tests
// No external credentials or internet are required. Uses only Node built-ins.
const fs = require('fs');
const path = require('path');
const cp = require('child_process');
const http = require('http');
const { once } = require('events');
const ROOT = __dirname;
const serverPath = path.join(ROOT, 'terminology-server.js');
const catalogPath = path.join(ROOT, 'local-terminology-catalog.json');
function assert(ok, msg) { if (!ok) throw new Error(msg); }
async function get(url) {
  return await new Promise((resolve, reject) => {
    http.get(url, res => {
      let body = '';
      res.setEncoding('utf8');
      res.on('data', c => body += c);
      res.on('end', () => resolve({status: res.statusCode, headers: res.headers, body}));
    }).on('error', reject);
  });
}
(async () => {
  const cat = JSON.parse(fs.readFileSync(catalogPath, 'utf8'));
  assert(Array.isArray(cat.concepts) && cat.concepts.length >= 25, 'starter catalogue missing or too small');
  assert(cat.concepts.every(c => c.display && c.system), 'catalogue has concept without display/system');
  assert(cat.concepts.every(c => !c.code || c.status === 'verified'), 'unverified codes must not be presented as verified');
  // Syntax check the server itself before starting it.
  cp.execFileSync(process.execPath, ['--check', serverPath], {stdio: 'inherit'});
  const port = 18787 + Math.floor(Math.random() * 1000);
  const env = {...process.env, PORT: String(port)};
  const child = cp.spawn(process.execPath, [serverPath], {cwd: ROOT, env, stdio: ['ignore', 'pipe', 'pipe']});
  let logs = '';
  child.stdout.on('data', d => logs += d.toString());
  child.stderr.on('data', d => logs += d.toString());
  try {
    let ready = false;
    for (let i=0; i<50; i++) {
      if (child.exitCode !== null) throw new Error('server exited early: '+logs);
      try { const r = await get(`http://127.0.0.1:${port}/api/terminology/status`); if (r.status === 200) { ready=true; break; } } catch {}
      await new Promise(r => setTimeout(r, 100));
    }
    assert(ready, 'server did not become ready: '+logs);
    const status = await get(`http://127.0.0.1:${port}/api/terminology/status`);
    const sj = JSON.parse(status.body);
    assert(sj.providers && sj.providers.local, 'status response lacks local provider');
    const search = await get(`http://127.0.0.1:${port}/api/terminology/search?system=local&q=ferritin`);
    assert(search.status === 200, 'local search HTTP status is not 200');
    const qj = JSON.parse(search.body);
    assert(qj.results && qj.results.some(x => /ferritin/i.test(x.display)), 'local ferritin search returned no expected result');
    assert(qj.meta && qj.meta.offline === true, 'local search should declare offline mode');
    const empty = await get(`http://127.0.0.1:${port}/api/terminology/search?system=local&q=`);
    assert(empty.status === 400, 'empty search should return HTTP 400');
    const bad = await get(`http://127.0.0.1:${port}/api/terminology/search?system=unknown&q=test`);
    assert(bad.status === 400, 'unknown system should return HTTP 400');
    const home = await get(`http://127.0.0.1:${port}/`);
    assert(home.status === 200 && /REVILAC/i.test(home.body), 'home page did not load');
    const traversal = await get(`http://127.0.0.1:${port}/..%2F..%2F.env`);
    assert(traversal.status === 403 || traversal.status === 404, 'path traversal unexpectedly served a file');
    console.log('PASS: catalogue JSON and structure');
    console.log('PASS: server JavaScript syntax');
    console.log('PASS: local terminology status API');
    console.log('PASS: offline Ferritin search');
    console.log('PASS: empty/unknown search validation');
    console.log('PASS: app homepage');
    console.log('PASS: path traversal basic check');
    console.log('NOTE: external provider credentials, real API calls, browser OCR and clinical rules were NOT tested.');
  } finally {
    child.kill();
  }
})().catch(e => { console.error('FAIL:', e.message); process.exitCode = 1; });
