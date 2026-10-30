'use strict';
const assert=require('assert');
const {spawn}=require('child_process');
const fs=require('fs'),path=require('path'),os=require('os');
const root=fs.mkdtempSync(path.join(os.tmpdir(),'revilac-ratelimit-'));
const port=Number(process.env.REVILAC_RATE_TEST_PORT||18421),base=`http://127.0.0.1:${port}`;
fs.copyFileSync(path.join(__dirname,'account-server.js'),path.join(root,'account-server.js'));
const wait=ms=>new Promise(r=>setTimeout(r,ms));
(async()=>{let child;try{
 child=spawn(process.execPath,['account-server.js'],{cwd:root,env:{...process.env,HOST:'127.0.0.1',PORT:String(port)},stdio:'ignore'});
 let ready=false;for(let i=0;i<50;i++){try{const r=await fetch(base+'/api/health');if(r.ok){ready=true;break}}catch{}await wait(100)}assert(ready,'server starts on loopback');
 for(let i=0;i<8;i++){const r=await fetch(`${base}/api/login?attempt=${i}`,{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({identifier:'nobody@example.invalid',password:'synthetic-test-password'})});assert.equal(r.status,401,`attempt ${i+1} allowed before threshold`)}
 const blocked=await fetch(base+'/api/login?attempt=unique-query-bypass',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({identifier:'nobody@example.invalid',password:'synthetic-test-password'})});assert.equal(blocked.status,429,'query parameter changes do not bypass authentication throttling');
 console.log('PASS auth rate limiter groups route attempts and ignores query-string variations');
 }catch(e){console.error('FAIL',e.stack||e);process.exitCode=1}finally{if(child&&!child.killed)child.kill();await wait(100);try{fs.rmSync(root,{recursive:true,force:true})}catch{}}})();
