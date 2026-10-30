#!/usr/bin/env python3
"""Static quality audit for the REVILAC Nutrition Intelligence prototype.
Does not claim browser, OCR accuracy, external API, security, or clinical validation.
Run: python deep_quality_audit.py
"""
from pathlib import Path
import re, json, sys
root=Path(__file__).resolve().parent
html=(root/'index.html').read_text(encoding='utf-8')
checks=[]
def check(name, ok, detail=''):
    checks.append((name,bool(ok),detail))
# Basic document and navigation
check('HTML document shell', '<!DOCTYPE html>' in html[:200].upper() or '<!doctype html>' in html[:200].lower())
check('Eight-pillar workbench navigation', 'data-page="eightpillars"' in html)
for label, needle in [
 ('Report normalization','Universal Report Intelligence'),('Terminology mapping','Medical Terminology & Coding'),
 ('Food reference catalogue','Specific Food & Nutrient Reference'),('Explainable reasoning','Explainable Nutrition Reasoning'),
 ('Safety engine','Patient Safety Engine'),('Multilingual explainer','Multilingual Patient Explainer'),
 ('Patient-controlled food-source alternatives','Food-source alternatives'),('Verification centre','Verification & Test Centre')]:
    check(label, needle in html, 'required module heading')
# DOM id uniqueness (duplicate IDs make controls unreliable)
ids=re.findall(r'\bid=["\']([^"\']+)["\']',html)
dup=sorted({x for x in ids if ids.count(x)>1})
check('No duplicate static HTML IDs', not dup, ', '.join(dup[:12]))
# Forms have labels, script blocks parse separately below
check('Visible prototype safety disclaimer', 'not a diagnostic device' in html.lower() and 'human verification' in html.lower())
check('No visible forbidden branding', not any(x in html for x in ['iMAX PLUS','Test Build v1.0']))
check('Local storage warning exists', 'localStorage' in html and ('identifiable patient data' in html.lower() or 'real patient data' in html.lower()))
check('OCR limitations are disclosed', 'OCR' in html and ('review' in html.lower() or 'confidence' in html.lower()))
check('Food-source alternatives pause on safety flags', "if(highRisk){const why" in html and 'SAFETY REVIEW REQUIRED' in html and 'allergyNotes.length>0' in html and 'needs.length>0' in html)
# Module controls and event hooks
for ident in ['p26RunTests','p26Export','p26Explain','p26PlanBuild']:
    check('Control exists: '+ident, f'id="{ident}"' in html)
# catalogue JSON integrity and non-empty concepts
try:
    cat=json.loads((root/'local-terminology-catalog.json').read_text(encoding='utf-8'))
    check('Terminology catalogue parses', True)
    check('Terminology catalogue non-empty', bool(cat))
except Exception as e:
    check('Terminology catalogue parses', False, str(e))
# Security regression assertions for local-only prototype servers.
account_server=(root/'account-server.js').read_text(encoding='utf-8')
local_server=(root/'local-server.js').read_text(encoding='utf-8')
check('Account prototype refuses public/LAN bind', 'Refusing non-loopback bind' in account_server)
check('Authentication rate limit ignores query-string variations', "+'|auth'" in account_server and 'while(rateBuckets.size>2000)' in account_server)
check('Local server emits anti-framing and referrer headers', "'X-Frame-Options':'DENY'" in local_server and "'Referrer-Policy':'no-referrer'" in local_server)
check('Local server limits microphone permission to same origin', "'Permissions-Policy':'camera=(), microphone=(self), geolocation=()'" in local_server)
# Scripts are extracted for separate node --check in RUN_TESTS.cmd where possible
scripts=re.findall(r'<script\b[^>]*>(.*?)</script\s*>',html,re.S|re.I)
check('Inline JavaScript present', any(s.strip() for s in scripts))
# Report clear pass/fail; this is static-only by design
for name,ok,detail in checks:
    print(('PASS' if ok else 'FAIL')+': '+name+((' — '+detail) if detail else ''))
failed=[c for c in checks if not c[1]]
print(f'\nSTATIC AUDIT: {len(checks)-len(failed)}/{len(checks)} checks passed.')
print('LIMITATION: static checks do not prove browser interaction, OCR quality, clinical validity, privacy/security, or live external API correctness.')
sys.exit(1 if failed else 0)
