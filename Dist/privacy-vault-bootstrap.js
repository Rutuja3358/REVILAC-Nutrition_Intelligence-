/* REVILAC encrypted local vault bootstrap v3.38.3.
 * Uses Web Crypto AES-256-GCM + PBKDF2-SHA-256. Data is encrypted at rest in one localStorage envelope.
 * This does not protect data from XSS or malicious code while the vault is unlocked.
 */
(() => {
'use strict';
const VAULT_KEY = 'REVILAC_ENCRYPTED_LOCAL_VAULT_V1';
const ITERATIONS = 600000;
const encoder = new TextEncoder();
const decoder = new TextDecoder();
const native = {
  get: Storage.prototype.getItem,
  set: Storage.prototype.setItem,
  remove: Storage.prototype.removeItem,
  clear: Storage.prototype.clear,
  key: Storage.prototype.key,
  length: Object.getOwnPropertyDescriptor(Storage.prototype, 'length')
};
let vaultMap = new Map();
let vaultReady = false;
let cryptoKey = null;
let persistQueue = Promise.resolve();
let lockOverlay;
let message;
// Encode in bounded chunks: spreading a large medical-report ciphertext into one
// String.fromCharCode call can exceed the browser's argument/stack limit.
function toB64(bytes) {
  const view = bytes instanceof Uint8Array ? bytes : new Uint8Array(bytes);
  const chunkSize = 0x8000;
  let binary = '';
  for (let offset = 0; offset < view.length; offset += chunkSize) {
    binary += String.fromCharCode.apply(null, view.subarray(offset, Math.min(offset + chunkSize, view.length)));
  }
  return btoa(binary);
}
const fromB64 = str => Uint8Array.from(atob(str), c => c.charCodeAt(0));
function randomBytes(n) { const a = new Uint8Array(n); crypto.getRandomValues(a); return a; }
async function deriveKey(password, salt, iterations=ITERATIONS) {
  const material = await crypto.subtle.importKey('raw', encoder.encode(password), 'PBKDF2', false, ['deriveKey']);
  return crypto.subtle.deriveKey({name:'PBKDF2', salt, iterations, hash:'SHA-256'}, material, {name:'AES-GCM', length:256}, false, ['encrypt','decrypt']);
}
async function encryptedEnvelope(map, key, salt) {
  const iv = randomBytes(12);
  const plain = encoder.encode(JSON.stringify(Object.fromEntries(map)));
  const ciphertext = await crypto.subtle.encrypt({name:'AES-GCM', iv}, key, plain);
  return JSON.stringify({version:1, algorithm:'AES-256-GCM', kdf:'PBKDF2-SHA-256', iterations:ITERATIONS, salt:toB64(salt), iv:toB64(iv), ciphertext:toB64(ciphertext)});
}
async function decryptEnvelope(raw, password) {
  const env = JSON.parse(raw);
  if (env.version !== 1 || env.algorithm !== 'AES-256-GCM' || env.kdf !== 'PBKDF2-SHA-256' || !env.salt || !env.iv || !env.ciphertext) throw new Error('Vault format is not supported.');
  const iterations = Number(env.iterations);
  if (!Number.isSafeInteger(iterations) || iterations < ITERATIONS || iterations > 1000000) throw new Error('Vault key-derivation settings are invalid.');
  const salt=fromB64(env.salt), iv=fromB64(env.iv);
  const key=await deriveKey(password, salt, iterations);
  const plain=await crypto.subtle.decrypt({name:'AES-GCM',iv},key,fromB64(env.ciphertext));
  const parsed=JSON.parse(decoder.decode(plain));
  if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) throw new Error('Vault contents are invalid.');
  const map=new Map();
  for (const [k,v] of Object.entries(parsed)) if (typeof k==='string' && typeof v==='string' && k!==VAULT_KEY) map.set(k,v);
  return {map,key,salt};
}
function nativeKeys() {
  const out=[];
  for(let i=0;i<native.length.get.call(window.localStorage);i++){
    const k=native.key.call(window.localStorage,i); if(k!==null) out.push(k);
  }
  return out;
}
async function persistNow() {
  if (!vaultReady || !cryptoKey) throw new Error('Vault is locked.');
  const salt = window.__REVILAC_VAULT_SALT__;
  const env = await encryptedEnvelope(vaultMap, cryptoKey, salt);
  native.set.call(window.localStorage, VAULT_KEY, env);
  for(const k of nativeKeys()) if(k!==VAULT_KEY) native.remove.call(window.localStorage,k);
}
function persist() {
  const snapshot = new Map(vaultMap);
  persistQueue = persistQueue.then(async()=>{
    if (!vaultReady || !cryptoKey) return;
    const salt=window.__REVILAC_VAULT_SALT__;
    const env=await encryptedEnvelope(snapshot,cryptoKey,salt);
    native.set.call(window.localStorage,VAULT_KEY,env);
    for(const k of nativeKeys()) if(k!==VAULT_KEY) native.remove.call(window.localStorage,k);
  }).catch(err=>{ if(message) message.textContent='Encrypted save failed. Keep this tab open and retry; do not close until saved. '+(err&&err.message?err.message:''); });
  return persistQueue;
}
function installStorageShim() {
  Storage.prototype.getItem=function(k){ if(this!==window.localStorage) return native.get.call(this,k); if(!vaultReady) return null; const key=String(k); return vaultMap.has(key)?vaultMap.get(key):null; };
  Storage.prototype.setItem=function(k,v){ if(this!==window.localStorage) return native.set.call(this,k,v); if(!vaultReady) throw new Error('REVILAC vault is locked; unlock before using the app.'); vaultMap.set(String(k),String(v)); void persist(); };
  Storage.prototype.removeItem=function(k){ if(this!==window.localStorage) return native.remove.call(this,k); if(!vaultReady) return; vaultMap.delete(String(k)); void persist(); };
  Storage.prototype.clear=function(){ if(this!==window.localStorage) return native.clear.call(this); if(!vaultReady) return; vaultMap.clear(); void persist(); };
  Storage.prototype.key=function(i){ if(this!==window.localStorage) return native.key.call(this,i); if(!vaultReady) return null; return Array.from(vaultMap.keys())[Number(i)]??null; };
  try { Object.defineProperty(Storage.prototype,'length',{configurable:true,get:function(){ if(this===window.localStorage) return vaultReady?vaultMap.size:0; return native.length.get.call(this); }}); } catch (_) {}
}
function showLock() {
  document.documentElement.style.overflow='hidden';
  lockOverlay=document.createElement('div');
  lockOverlay.id='revilacVaultLock';
  lockOverlay.style.cssText='position:fixed;inset:0;z-index:2147483647;background:#f1f7f4;color:#16352f;display:grid;place-items:center;padding:18px;font:16px/1.5 system-ui,sans-serif;overflow:auto';
  lockOverlay.innerHTML='<section style="width:min(100%,520px);background:white;border:1px solid #d7e7df;border-radius:18px;padding:24px;box-shadow:0 8px 30px #123c3620"><h1 style="margin:0 0 8px;font-size:24px">Welcome to REVILAC</h1><p id="rvVaultIntro">Secure your personal nutrition workspace on this device.</p><label for="rvVaultPassword" style="display:block;font-weight:700;margin:14px 0 5px">Workspace passphrase</label><input id="rvVaultPassword" type="password" autocomplete="current-password" minlength="12" style="width:100%;padding:12px;border:1px solid #9bb9ad;border-radius:10px;font:inherit"/><p id="rvVaultConfirmWrap" style="display:none"><label for="rvVaultConfirm" style="display:block;font-weight:700;margin:12px 0 5px">Confirm passphrase</label><input id="rvVaultConfirm" type="password" autocomplete="new-password" style="width:100%;padding:12px;border:1px solid #9bb9ad;border-radius:10px;font:inherit"/></p><p style="font-size:13px;color:#627570">Use at least 12 characters. Your saved workspace is encrypted while locked. Keep your device and passphrase secure.</p><button id="rvVaultUnlock" style="background:#126b59;color:white;border:0;border-radius:10px;padding:12px 16px;font:inherit;font-weight:700">Continue securely</button><p id="rvVaultMessage" role="status" style="min-height:24px;color:#a83a32;overflow-wrap:anywhere"></p><p style="font-size:12px;color:#627570;margin-top:18px">Your workspace stays on this device.</p><button id="rvVaultReset" type="button" hidden>Reset local workspace</button></section>';
  document.body.appendChild(lockOverlay);
  message=lockOverlay.querySelector('#rvVaultMessage');
}
async function runDeferredScripts() {
  const placeholders=Array.from(document.querySelectorAll('script[data-vault-script]'));
  for(const old of placeholders){
    const s=document.createElement('script');
    for(const a of Array.from(old.attributes)){
      if(['type','data-vault-script','data-vault-src'].includes(a.name)) continue;
      s.setAttribute(a.name,a.value);
    }
    const src=old.getAttribute('data-vault-src');
    if(src){
      s.async=false; s.src=src;
      const done=new Promise((resolve,reject)=>{s.onload=resolve;s.onerror=()=>reject(new Error('Could not load app module: '+src));});
      old.replaceWith(s); await done;
    } else { s.textContent=old.textContent; old.replaceWith(s); }
  }
  const lockBtn=document.createElement('button');
  lockBtn.type='button'; lockBtn.textContent='Lock vault';
  lockBtn.style.cssText='position:fixed;right:10px;bottom:10px;z-index:10000;background:#123c36;color:white;border:0;border-radius:10px;padding:10px 13px;font:600 13px system-ui,sans-serif';
  lockBtn.addEventListener('click',async()=>{lockBtn.disabled=true;lockBtn.textContent='Saving…';await persistQueue;location.reload();});
  document.body.appendChild(lockBtn);
}
async function unlock() {
  const pass=lockOverlay.querySelector('#rvVaultPassword').value;
  const existing=native.get.call(window.localStorage,VAULT_KEY);
  if(existing){
    const opened=await decryptEnvelope(existing,pass);
    vaultMap=opened.map;cryptoKey=opened.key;window.__REVILAC_VAULT_SALT__=opened.salt;
    vaultReady=true;
    for(const k of nativeKeys()) if(k!==VAULT_KEY) native.remove.call(window.localStorage,k);
  } else {
    if(pass.length<12) throw new Error('Choose a passphrase with at least 12 characters.');
    const confirm=lockOverlay.querySelector('#rvVaultConfirm').value;
    if(pass!==confirm) throw new Error('Passphrases do not match.');
    const salt=randomBytes(16);cryptoKey=await deriveKey(pass,salt);window.__REVILAC_VAULT_SALT__=salt;
    vaultMap=new Map();
    for(const k of nativeKeys()) if(k!==VAULT_KEY){const v=native.get.call(window.localStorage,k);if(v!==null)vaultMap.set(k,v);}
    vaultReady=true;
    await persistNow();
  }
  lockOverlay.remove();document.documentElement.style.overflow='';
  await runDeferredScripts();
}
function showAccountGate() {
  const overlay=document.createElement('div');
  overlay.id='revilacAccountGate';
  overlay.style.cssText='position:fixed;inset:0;z-index:2147483646;background:#f1f7f4;color:#16352f;display:grid;place-items:center;padding:18px;font:16px/1.5 system-ui,sans-serif;overflow:auto';
  overlay.innerHTML=`<section style="width:min(100%,560px);background:white;border:1px solid #d7e7df;border-radius:18px;padding:24px;box-shadow:0 8px 30px #123c3620"><h1 style="margin:0 0 6px;font-size:26px">REVILAC Nutrition Intelligence</h1><p style="margin-top:0;color:#627570">Sign in to continue your nutrition journey. Your encrypted vault will be unlocked next.</p><div style="display:flex;gap:8px;flex-wrap:wrap;margin:14px 0"><button type="button" id="rvAuthShowLogin" style="background:#126b59;color:white;border:0;border-radius:9px;padding:10px 14px;font:inherit">Login</button><button type="button" id="rvAuthShowSignup" style="background:#e8f2ed;color:#16352f;border:0;border-radius:9px;padding:10px 14px;font:inherit">Sign Up</button></div><form id="rvAuthLogin"><label style="display:block;font-weight:700;margin:10px 0 4px">Email or mobile</label><input id="rvAuthLoginId" autocomplete="username" required style="box-sizing:border-box;width:100%;padding:12px;border:1px solid #9bb9ad;border-radius:9px;font:inherit"><label style="display:block;font-weight:700;margin:10px 0 4px">Password</label><input id="rvAuthLoginPass" type="password" autocomplete="current-password" required style="box-sizing:border-box;width:100%;padding:12px;border:1px solid #9bb9ad;border-radius:9px;font:inherit"><button style="margin-top:14px;background:#126b59;color:white;border:0;border-radius:9px;padding:11px 16px;font:inherit;font-weight:700">Login</button></form><form id="rvAuthSignup" hidden><label style="display:block;font-weight:700;margin:10px 0 4px">Email (recommended)</label><input id="rvAuthSignupEmail" type="email" autocomplete="email" style="box-sizing:border-box;width:100%;padding:12px;border:1px solid #9bb9ad;border-radius:9px;font:inherit"><label style="display:block;font-weight:700;margin:10px 0 4px">Mobile (optional)</label><input id="rvAuthSignupMobile" type="tel" autocomplete="tel" style="box-sizing:border-box;width:100%;padding:12px;border:1px solid #9bb9ad;border-radius:9px;font:inherit"><label style="display:block;font-weight:700;margin:10px 0 4px">Password (at least 12 characters)</label><input id="rvAuthSignupPass" type="password" autocomplete="new-password" minlength="12" required style="box-sizing:border-box;width:100%;padding:12px;border:1px solid #9bb9ad;border-radius:9px;font:inherit"><label style="display:block;margin-top:12px"><input id="rvAuthConsent" type="checkbox" required> I understand this is a local prototype and will use demo/synthetic data only.</label><button style="margin-top:14px;background:#126b59;color:white;border:0;border-radius:9px;padding:11px 16px;font:inherit;font-weight:700">Create account</button></form><p id="rvAuthMessage" role="status" style="min-height:24px;color:#a83a32;overflow-wrap:anywhere"></p></section>`;
  document.body.appendChild(overlay);
  const login=overlay.querySelector('#rvAuthLogin'), signup=overlay.querySelector('#rvAuthSignup'), status=overlay.querySelector('#rvAuthMessage');
  overlay.querySelector('#rvAuthShowLogin').addEventListener('click',()=>{login.hidden=false;signup.hidden=true;status.textContent='';});
  overlay.querySelector('#rvAuthShowSignup').addEventListener('click',()=>{login.hidden=true;signup.hidden=false;status.textContent='';});
  async function request(path,payload){const r=await fetch(path,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload)});let d={};try{d=await r.json()}catch(_){}if(!r.ok)throw new Error(d.error||'Account request failed.');return d;}
  login.addEventListener('submit',async e=>{e.preventDefault();const btn=login.querySelector('button');btn.disabled=true;status.textContent='Checking account…';try{await request('/api/login',{identifier:overlay.querySelector('#rvAuthLoginId').value.trim(),password:overlay.querySelector('#rvAuthLoginPass').value});overlay.remove();initializeVault();}catch(err){status.textContent=err.message||'Login failed.';}finally{btn.disabled=false;}});
  signup.addEventListener('submit',async e=>{e.preventDefault();const btn=signup.querySelector('button');btn.disabled=true;status.textContent='Creating account…';try{const email=overlay.querySelector('#rvAuthSignupEmail').value.trim(),mobile=overlay.querySelector('#rvAuthSignupMobile').value.trim();await request('/api/register',{email,mobile,password:overlay.querySelector('#rvAuthSignupPass').value,consent:overlay.querySelector('#rvAuthConsent').checked});overlay.remove();initializeVault();}catch(err){status.textContent=err.message||'Account creation failed.';}finally{btn.disabled=false;}});
}
function initializeVault() {
  if(!window.crypto||!crypto.subtle){document.body.innerHTML='<main style="font:16px system-ui;padding:24px"><h1>Secure vault unavailable</h1><p>Open REVILAC through its local server (localhost) or a trusted HTTPS origin in a modern browser. The app is blocked because encrypted storage is required in this build.</p></main>';return;}
  installStorageShim();showLock();
  const existing=native.get.call(window.localStorage,VAULT_KEY);
  const intro=lockOverlay.querySelector('#rvVaultIntro'),confirmWrap=lockOverlay.querySelector('#rvVaultConfirmWrap'),btn=lockOverlay.querySelector('#rvVaultUnlock');
  if(existing){intro.textContent='Enter your passphrase to continue to your nutrition dashboard. Keep it safe so you can access your saved data.';confirmWrap.style.display='none';btn.textContent='Continue to REVILAC';lockOverlay.querySelector('#rvVaultReset').style.display='none';}
  else {intro.textContent='Create a passphrase to secure your saved nutrition workspace. You will use it to unlock this workspace on this device.';confirmWrap.style.display='block';btn.textContent='Continue securely';}
  btn.addEventListener('click',async()=>{btn.disabled=true;message.textContent='Unlocking and preparing encrypted storage…';try{await unlock();}catch(e){message.textContent=(e&&e.name==='OperationError')?'Incorrect passphrase or damaged encrypted vault.':(e&&e.message)||'Could not unlock the vault.';}finally{if(document.body.contains(btn))btn.disabled=false;}});
  lockOverlay.querySelector('#rvVaultPassword').addEventListener('keydown',e=>{if(e.key==='Enter')btn.click();});
  lockOverlay.querySelector('#rvVaultReset').addEventListener('click',()=>{if(!confirm('Permanently delete ALL REVILAC local browser data and the encrypted vault? This cannot be undone.'))return;for(const k of nativeKeys())native.remove.call(window.localStorage,k);vaultMap.clear();message.textContent='All local browser data was deleted. Reload to create a new vault.';btn.disabled=true;});
}
function initialize() {
  if(!window.crypto||!crypto.subtle){document.body.innerHTML='<main style="font:16px system-ui;padding:24px"><h1>Secure vault unavailable</h1><p>Open REVILAC through its local server (localhost) or a trusted HTTPS origin in a modern browser. The app is blocked because encrypted storage is required in this build.</p></main>';return;}
  showAccountGate();
}
if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',initialize,{once:true}); else initialize();
})();
