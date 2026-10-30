'use strict';
const assert=require('assert');
const {spawn}=require('child_process');
const net=require('net');
const path=require('path');
const root=__dirname;
function freePort(){return new Promise((resolve,reject)=>{const s=net.createServer();s.once('error',reject);s.listen(0,'127.0.0.1',()=>{const p=s.address().port;s.close(()=>resolve(p));});});}
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
(async()=>{
 const port=await freePort();
 const child=spawn(process.execPath,['local-server.js'],{cwd:root,env:{...process.env,PORT:String(port),FDC_API_KEY:''},stdio:'ignore'});
 try{
  let ready=false;
  for(let i=0;i<40;i++){try{const r=await fetch(`http://127.0.0.1:${port}/`);if(r.ok){ready=true;break}}catch(_){}await sleep(100)}
  assert(ready,'local server starts and serves the app shell');
  const bad=await fetch(`http://127.0.0.1:${port}/api/food-search?q=x`);assert.strictEqual(bad.status,400,'short food search is rejected before external API call');
  const badBody=await bad.json();assert(/2 to 80/.test(badBody.error),'validation error is readable');
  const method=await fetch(`http://127.0.0.1:${port}/api/food-search?q=apple`,{method:'POST'});assert.strictEqual(method.status,404,'unknown API method/path is not exposed');
  const missing=await fetch(`http://127.0.0.1:${port}/missing-file.js`);assert.strictEqual(missing.status,404,'missing static files return 404');
  console.log('PASS local server startup and app shell');
  console.log('PASS online food search query validation without external network');
  console.log('PASS unknown API and missing file handling');
 }finally{child.kill('SIGTERM');}
})().catch(e=>{console.error(e);process.exit(1)});
