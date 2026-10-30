'use strict';
const assert=require('assert');
const {spawn}=require('child_process');
const fs=require('fs'),path=require('path');
const os=require('os');
const root=fs.mkdtempSync(path.join(os.tmpdir(),'revilac-api-test-'));
const sourceRoot=__dirname, port=Number(process.env.REVILAC_TEST_PORT||18314), base=`http://127.0.0.1:${port}`;
fs.copyFileSync(path.join(sourceRoot,'account-server.js'),path.join(root,'account-server.js'));
if(fs.existsSync(path.join(sourceRoot,'index.html')))fs.copyFileSync(path.join(sourceRoot,'index.html'),path.join(root,'index.html'));
const storeDir=path.join(root,'server-data');
function sleep(ms){return new Promise(r=>setTimeout(r,ms))}
(async()=>{
  let child;
  child=spawn(process.execPath,['account-server.js'],{cwd:root,env:{...process.env,HOST:'127.0.0.1',PORT:String(port)},stdio:'ignore'});
  try{
    let ready=false;for(let i=0;i<50;i++){try{const r=await fetch(base+'/api/health');if(r.ok){ready=true;break}}catch{}await sleep(100)}assert(ready,'server should start');
    const email='api-hardening-test@example.invalid';
    let r=await fetch(base+'/api/register',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({email,password:'Example-Long-Password-2026!',consent:true})});assert.equal(r.status,201,'register succeeds for synthetic test account');let d=await r.json();const token=d.token;assert(token,'token returned');
    r=await fetch(base+'/api/data',{method:'PUT',headers:{'content-type':'application/json',authorization:'Bearer '+token},body:JSON.stringify({data:{reports:[],reminders:[],profile:{language:'English'},prefs:{},wellness:{tasks:[]},wellnessCheckins:{},nutritionContext:{age:'adult',diet:'vegetarian',goal:'general wellness',savedAt:'2026-10-21T00:00:00.000Z'}}})});if(r.status!==200)console.error('VALID DATA ERROR',r.status,await r.text());assert.equal(r.status,200,'valid app data sync succeeds');
    r=await fetch(base+'/api/data',{method:'PUT',headers:{'content-type':'application/json',authorization:'Bearer '+token},body:JSON.stringify({data:{reports:[],reminders:[],profile:{},prefs:{},admin:true}})});assert.equal(r.status,400,'unsupported top-level fields rejected');
    r=await fetch(base+'/api/data',{method:'PUT',headers:{'content-type':'application/json',authorization:'Bearer '+token},body:JSON.stringify({data:{reports:[],reminders:[],profile:{note:'x'.repeat(20001)},prefs:{}}})});assert.equal(r.status,400,'oversized text field rejected');
    r=await fetch(base+'/api/data',{headers:{authorization:'Bearer '+token}});assert.equal(r.status,200,'authenticated download works');d=await r.json();assert.equal(d.data.profile.language,'English','stored data round-trips');assert.equal(d.data.nutritionContext.goal,'general wellness','nutrition context round-trips');
    r=await fetch(base+'/api/password/change',{method:'POST',headers:{'content-type':'application/json',authorization:'Bearer '+token},body:JSON.stringify({currentPassword:'wrong-password',newPassword:'New-Example-Password-2026!'})});assert.equal(r.status,401,'wrong current password cannot change password');
    r=await fetch(base+'/api/password/change',{method:'POST',headers:{'content-type':'application/json',authorization:'Bearer '+token},body:JSON.stringify({currentPassword:'Example-Long-Password-2026!',newPassword:'New-Example-Password-2026!'})});assert.equal(r.status,200,'valid password change succeeds');
    r=await fetch(base+'/api/login',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({identifier:email,password:'Example-Long-Password-2026!'})});assert.equal(r.status,401,'old password rejected after change');
    r=await fetch(base+'/api/login',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({identifier:email,password:'New-Example-Password-2026!'})});assert.equal(r.status,200,'new password can sign in');const newToken=(await r.json()).token;
    r=await fetch(base+'/api/account',{method:'DELETE',headers:{'content-type':'application/json',authorization:'Bearer '+newToken},body:JSON.stringify({password:'incorrect'})});assert.equal(r.status,401,'wrong password cannot delete account');
    r=await fetch(base+'/api/account',{method:'DELETE',headers:{'content-type':'application/json',authorization:'Bearer '+newToken},body:JSON.stringify({password:'New-Example-Password-2026!'})});assert.equal(r.status,200,'account deletion removes account and sessions');
    r=await fetch(base+'/api/data',{headers:{authorization:'Bearer '+newToken}});assert.equal(r.status,401,'deleted account token rejected');
    console.log('PASS local account API register/token flow');console.log('PASS validated sync payload accepted');console.log('PASS unsupported fields and oversized field rejected');console.log('PASS sync data round-trip including nutritionContext');console.log('PASS password change rejects wrong current password and rotates credential');console.log('PASS old password rejected and new password accepted');console.log('PASS account deletion requires password and invalidates sessions');
    console.log('16/16 account API integration assertions passed');
  }catch(e){console.error('FAIL',e.stack||e);process.exitCode=1}
  finally{if(child && !child.killed)child.kill();await sleep(150);try{fs.rmSync(root,{recursive:true,force:true})}catch{}}
})();
