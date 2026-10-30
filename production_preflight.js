'use strict';
// Evidence-based production gate. Environment variables alone never prove reviews,
// real-device testing, backup restoration, or a production database implementation.
const fs = require('fs');
const path = require('path');
const root = __dirname;
const evidenceDir = path.join(root, 'release-evidence');
const checks = [];
function check(id, label, pass, detail, blocking = true) {
  checks.push({ id, label, status: pass ? 'PASS' : (blocking ? 'BLOCK' : 'WARN'), detail });
}
function evidence(id, label, filename, requiredScope) {
  const file = path.join(evidenceDir, filename);
  if (!fs.existsSync(file)) return check(id, label, false, `Missing release-evidence/${filename}; environment flags are not accepted as proof.`);
  try {
    const e = JSON.parse(fs.readFileSync(file, 'utf8'));
    const age = Date.now() - Date.parse(e.checkedAt || '');
    const valid = e.status === 'passed' && typeof e.reviewer === 'string' && e.reviewer.trim().length >= 3 &&
      typeof e.artifact === 'string' && e.artifact.trim().length >= 5 &&
      typeof e.scope === 'string' && e.scope.includes(requiredScope) &&
      Number.isFinite(age) && age >= 0 && age <= 90 * 24 * 60 * 60 * 1000;
    check(id, label, valid, valid ? `Evidence metadata present; artifact must still be independently inspected: ${e.artifact}` : 'Evidence file is incomplete, stale, future-dated, or does not cover the required scope.');
  } catch {
    check(id, label, false, `Evidence file ${filename} is not valid JSON.`);
  }
}
check('node', 'Supported Node.js runtime', Number(process.versions.node.split('.')[0]) >= 20, 'Node.js 20+ required; detected major ' + process.versions.node.split('.')[0]);
for (const f of ['index.html','account-server.js','local-server.js','service-worker.js','manifest.webmanifest','nutrition-core.js']) check('file_'+f, 'Required file: '+f, fs.existsSync(path.join(root,f)), fs.existsSync(path.join(root,f)) ? 'Present' : 'Missing');
// Production entry point uses PostgreSQL; the local JSON server remains prototype-only.
const pkg = JSON.parse(fs.readFileSync(path.join(root, 'package.json'), 'utf8'));
const prodSource = fs.existsSync(path.join(root, 'production-server.js')) ? fs.readFileSync(path.join(root, 'production-server.js'), 'utf8') : '';
const hasManagedDbAdapter = fs.existsSync(path.join(root, 'production-server.js')) && fs.existsSync(path.join(root, 'migrations', '001_initial.sql')) && Boolean(pkg.dependencies && pkg.dependencies.pg) && prodSource.includes('new Pool');
check('database', 'PostgreSQL production API and migrations configured', Boolean(process.env.DATABASE_URL) && hasManagedDbAdapter && fs.existsSync(path.join(evidenceDir,'database-integration.json')),
  hasManagedDbAdapter ? 'Production PostgreSQL adapter/migration exist; live connection and migration evidence are still required.' : 'BLOCKED: production database adapter or migration is missing; DATABASE_URL alone is not integration.');
check('https', 'Verified HTTPS termination', process.env.REVILAC_HTTPS_TERMINATED === 'true' && fs.existsSync(path.join(evidenceDir,'https-deployment.json')), 'Requires deployment evidence in release-evidence/https-deployment.json; environment flag alone is insufficient.');
check('otp', 'Email ownership verification provider configured', Boolean(process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS && process.env.SMTP_FROM) && fs.existsSync(path.join(evidenceDir,'account-verification.json')), 'Production API uses email OTP; requires a configured SMTP provider and reviewed delivery/recovery evidence.');
check('rate_limit', 'Database-backed shared rate limiting', Boolean(process.env.DATABASE_URL) && prodSource.includes('request_rate_limits') && fs.existsSync(path.join(evidenceDir,'shared-rate-limit.json')), 'Production API implements a PostgreSQL-backed rate-limit table; live multi-instance validation evidence is still required.');
check('session', 'Production session secret configured', Boolean(process.env.REVILAC_SESSION_SECRET && process.env.REVILAC_SESSION_SECRET.length >= 32), 'Requires a high-entropy secret from a managed secret store; do not reuse a password.');
for (const [id,label,file,scope] of [
  ['database_review','Live database connection and migration test','database-integration.json','migration'],
  ['security_review','Independent security review','security-review.json','security'],
  ['privacy_review','Privacy/legal review','privacy-review.json','privacy'],
  ['clinical_review','Qualified clinical/nutrition validation','clinical-review.json','clinical'],
  ['e2e','Real-device end-to-end tests','device-e2e.json','Android'],
  ['backup','Independent backup and successful restore drill','backup-restore.json','restore'],
  ['monitoring','Operational monitoring and incident response','monitoring.json','monitoring'],
  ['nutrition_data','Nutrition data provenance/licensing review','nutrition-data.json','licensing'],
  ['ocr_benchmark','Ground-truth OCR benchmark','ocr-benchmark.json','OCR'],
  ['accessibility','Accessibility and language usability review','accessibility-review.json','accessibility']
]) evidence(id,label,file,scope);
const blockers = checks.filter(c => c.status === 'BLOCK');
const warnings = checks.filter(c => c.status === 'WARN');
const report = { product: 'REVILAC Nutrition Intelligence', mode: 'read-only evidence-based preflight', productionReady: blockers.length === 0,
  summary: { total: checks.length, passed: checks.filter(c=>c.status==='PASS').length, blockers: blockers.length, warnings: warnings.length }, checks };
console.log(JSON.stringify(report,null,2));
if (blockers.length) process.exitCode = 2;
