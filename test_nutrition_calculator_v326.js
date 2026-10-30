// Basic engine integration smoke test for the appended calculator UI.
const fs=require('fs');const s=fs.readFileSync(__dirname+'/index.html','utf8');
const checks=['rvn26-launch','rvn26-modal','rvn26-fields','rvn26-add','rvn26-totals','rvn26-export','REVILAC_NUTRITION_CALC_V1','Data coverage','sourceUrl','state.items.push'];
let fail=[];for(const x of checks)if(!s.includes(x))fail.push('missing '+x);
const script=s.match(/<script id="rvn26-engine"[^>]*>([\s\S]*?)<\/script>/);if(!script)fail.push('engine script missing');else{try{new Function(script[1])}catch(e){fail.push('engine syntax: '+e.message)}}
if(fail.length){console.error(fail.join('\n'));process.exit(1)}console.log('PASS: '+checks.length+' integration checks; calculator engine syntax valid.');
