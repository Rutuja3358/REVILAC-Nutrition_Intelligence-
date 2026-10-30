'use strict';
const fs=require('fs');
const s=fs.readFileSync('local-server.js','utf8');
const cmd=fs.readFileSync('START_LOCAL_SERVER.cmd','utf8');
const checks=[
 ['Local server binds to loopback only',s.includes("const host = '127.0.0.1'" )],
 ['Local server serves manifest MIME type',s.includes("'.webmanifest':'application/manifest+json")],
 ['Local server guards path traversal',s.includes("pathname.split('/').includes('..')")],
 ['Launcher prefers Node so the online food-search API is available',cmd.indexOf('where node')<cmd.indexOf('where py')&&cmd.includes('node local-server.js')],
 ['Online food-search API is served by a same-origin proxy',s.includes("pathname === '/api/food-search'")&&s.includes('process.env.FDC_API_KEY')],
 ['Local server warns it is not internet hosting',s.includes('not internet hosting or a secure multi-user account backend')],
 ['Food-search cache has expiry and a fixed maximum size',s.includes('SEARCH_CACHE_MAX = 200')&&s.includes('pruneSearchCache')&&s.includes('while (searchCache.size > SEARCH_CACHE_MAX)')]
];
for(const [n,ok] of checks) console.log(`${ok?'PASS':'FAIL'} · ${n}`);
console.log(`${checks.filter(x=>x[1]).length}/${checks.length} local server checks passed`);
if(checks.some(x=>!x[1]))process.exit(1);
