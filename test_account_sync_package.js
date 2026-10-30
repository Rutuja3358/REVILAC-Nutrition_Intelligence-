'use strict';
const fs=require('fs'),path=require('path'),assert=require('assert');
const root=__dirname, html=fs.readFileSync(path.join(root,'index.html'),'utf8'), server=fs.readFileSync(path.join(root,'account-server.js'),'utf8'), cmd=fs.readFileSync(path.join(root,'START_ACCOUNT_SERVER.cmd'),'utf8'), readme=fs.readFileSync(path.join(root,'README.md'),'utf8');
const checks=[
['account page is present',html.includes('id="account"')],
['register form is present',html.includes('id="cloudRegisterForm"')],
['login form is present',html.includes('id="cloudLoginForm"')],
['explicit upload and download controls are present',html.includes('id="cloudUploadBtn"')&&html.includes('id="cloudDownloadBtn"')],
['sync requires confirmation before overwrite',html.includes('Upload and replace the account data')&&html.includes('Download and replace this browser data')],
['password hashing uses scrypt',server.includes('crypto.scrypt')],
['session token is stored hashed',server.includes("createHash('sha256').update(token).digest('hex')")],
['session expiry is enforced',server.includes('expiresAt>Date.now()')],
['request body limits exist',server.includes('5*1024*1024')],
['account API is not advertised as production-ready',server.includes('productionReady:false')],
['dedicated start script launches account server',cmd.includes('node account-server.js')],
['README warns demo data only',readme.includes('Do not enter real patient or health data.')]
];let failed=0;for(const [n,ok] of checks){console.log((ok?'PASS':'FAIL')+' '+n);if(!ok)failed++}console.log(`${checks.length-failed}/${checks.length} account/sync package checks passed`);process.exitCode=failed?1:0;
