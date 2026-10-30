from pathlib import Path
import os, json
import re, shutil, subprocess, tempfile, sys
root=Path(__file__).resolve().parent
ROOT=str(root)
p=root/'index.html'
if not p.is_file():
    print('FAIL: index.html missing'); sys.exit(1)
s=p.read_text(encoding='utf-8')
checks={
 'HTML document start': s.lstrip().lower().startswith('<!doctype html>'),
 'HTML closing tags': '</body>' in s.lower() and '</html>' in s.lower(),
 'main navigation': 'data-page="dashboard"' in s and 'data-page="upload"' in s,
 'report form': 'id="reportForm"' in s,
 'local data persistence': "localStorage.setItem(KEY" in s,
 'JSON backup restore': 'restoreFile' in s and 'JSON.parse' in s,
 'CSV export': 'exportReportsCSV' in s,
 'follow-up reminders': 'addReminder' in s and 'renderReminders' in s,
 'nutrition guidance': 'renderPersonalPlan' in s,
 'OCR/PDF controls': 'runImageOCR' in s and 'runPdfText' in s,
}
failed=[]
for name, ok in checks.items():
    print(('PASS' if ok else 'FAIL') + ': ' + name)
    if not ok: failed.append(name)
blocks=re.findall(r'<script\b[^>]*>([\s\S]*?)</script\s*>',s,re.I)
# External scripts may be empty; validate every non-empty inline JS block.
inline=[b.strip() for b in blocks if b.strip()]
if not inline:
    print('FAIL: no inline JavaScript found'); failed.append('inline JavaScript')
else:
    node=shutil.which('node')
    if node:
        with tempfile.TemporaryDirectory() as td:
            for i,code in enumerate(inline,1):
                f=Path(td)/f'inline_{i}.js'; f.write_text(code,encoding='utf-8')
                r=subprocess.run([node,'--check',str(f)],capture_output=True,text=True)
                if r.returncode:
                    print(f'FAIL: JavaScript syntax block {i}\n{r.stderr}'); failed.append('JavaScript syntax')
                else: print(f'PASS: JavaScript syntax block {i}')
    else:
        print('SKIP: Node.js not installed; JavaScript syntax check skipped')
if failed:
    print('\nRESULT: FAIL — ' + ', '.join(failed)); sys.exit(1)
print('\nRESULT: PASS — structural checks passed. This is not a full browser or clinical test.')

# v2.1 medical coding hub assertions
html = (Path(__file__).parent / 'index.html').read_text(encoding='utf-8')
assert 'Medical coding coverage' in html
assert 'SNOMED CT' in html and 'LOINC' in html and 'ICD-11' in html

assert os.path.exists(os.path.join(ROOT, 'local-terminology-catalog.json')), 'Missing free local terminology catalogue'

# v2.4 feature checks
idx=(root / "index.html").read_text(encoding="utf-8")
assert 'id="clinical"' in idx and 'ciReviewBtn' in idx and 'ciExportBtn' in idx
cat=json.loads((root / "local-terminology-catalog.json").read_text(encoding="utf-8"))
assert len(cat["concepts"]) >= 60
assert all(not c.get("code") for c in cat["concepts"] if c.get("system")=="LOCAL STARTER"), "Starter concepts must not pretend to be official codes"
assert (root / 'test_auth_rate_limit.js').is_file(), 'Missing authentication rate-limit regression test'
assert (root / 'test_account_server_bind_guard.js').is_file(), 'Missing local-only bind guard regression test'
print("v3.32 package structural checks passed; concepts:",len(cat["concepts"]))
