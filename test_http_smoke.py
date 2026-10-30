from pathlib import Path
import os, socket, subprocess, time, urllib.request, urllib.error, json, sys
ROOT = Path(__file__).resolve().parent
with socket.socket() as s:
    s.bind(('127.0.0.1', 0)); port = s.getsockname()[1]
env = os.environ.copy(); env['PORT'] = str(port)
p = subprocess.Popen(['node', str(ROOT/'local-server.js')], cwd=ROOT, env=env, stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True)
def request(path):
    req = urllib.request.Request(f'http://127.0.0.1:{port}{path}', headers={'Accept':'application/json'})
    try:
        with urllib.request.urlopen(req, timeout=3) as r: return r.status, r.headers, r.read()
    except urllib.error.HTTPError as e: return e.code, e.headers, e.read()
try:
    for _ in range(40):
        if p.poll() is not None: raise AssertionError('local-server.js exited before readiness')
        try:
            status, headers, body = request('/')
            break
        except Exception: time.sleep(.1)
    else: raise AssertionError('local server did not become ready')
    assert status == 200 and b'<!doctype html>' in body[:300].lower(), 'serves main HTML'
    assert headers.get('X-Content-Type-Options') == 'nosniff', 'main HTML has nosniff header'
    assert headers.get('X-Frame-Options') == 'DENY', 'main HTML cannot be framed'
    assert headers.get('Referrer-Policy') == 'no-referrer', 'main HTML referrer policy set'
    assert 'microphone=(self)' in headers.get('Permissions-Policy',''), 'microphone only permitted for same origin'
    print('PASS HTTP smoke: main app and security headers served')
    status, headers, body = request('/manifest.webmanifest')
    assert status == 200 and json.loads(body).get('name') == 'REVILAC', 'serves valid REVILAC PWA manifest'
    print('PASS HTTP smoke: PWA manifest served and parses')
    status, headers, body = request('/fooddata-central-client.js')
    assert status == 200 and b'REVILAC_FDC_CLIENT' in body, 'serves nutrition mapper JS'
    assert headers.get('X-Content-Type-Options') == 'nosniff', 'asset has nosniff header'
    print('PASS HTTP smoke: nutrition mapper asset served')
    status, headers, body = request('/api/unknown')
    assert status == 404 and json.loads(body).get('error'), 'unknown API path safely returns JSON 404'
    print('PASS HTTP smoke: unknown API route returns safe 404')
    status, headers, body = request('/api/food-search?q=x')
    assert status == 400 and json.loads(body).get('error'), 'invalid short query safely rejected before upstream call'
    print('PASS HTTP smoke: invalid food query rejected before external API call')
    status, headers, body = request('/does-not-exist')
    assert status == 404, 'missing static asset returns 404'
    print('PASS HTTP smoke: missing asset returns 404')
finally:
    p.terminate()
    try: p.wait(timeout=3)
    except subprocess.TimeoutExpired: p.kill(); p.wait(timeout=2)
