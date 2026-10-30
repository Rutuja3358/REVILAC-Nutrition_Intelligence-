'use strict';
const assert=require('assert');const {spawn}=require('child_process');const fs=require('fs'),path=require('path'),os=require('os');
const root=fs.mkdtempSync(path.join(os.tmpdir(),'revilac-bind-'));fs.copyFileSync(path.join(__dirname,'account-server.js'),path.join(root,'account-server.js'));
const child=spawn(process.execPath,['account-server.js'],{cwd:root,env:{...process.env,HOST:'0.0.0.0',PORT:'18422'},stdio:['ignore','pipe','pipe']});let stderr='';child.stderr.on('data',x=>stderr+=x);
child.on('close',code=>{try{assert.notEqual(code,0,'public bind must fail closed');assert(stderr.includes('Refusing non-loopback bind'),'explain local-only restriction');console.log('PASS prototype account server refuses public/LAN bind');}catch(e){console.error('FAIL',e.stack||e);process.exitCode=1}finally{fs.rmSync(root,{recursive:true,force:true})}});
setTimeout(()=>{if(child.exitCode===null)child.kill('SIGKILL')},3000).unref();
