# REVILAC Nutrition Intelligence — Consolidated QA Release Candidate v3.0

## What is included
- Existing application and local terminology adapter preserved from the v2.9 baseline.
- Existing terminology smoke test retained.
- Added `test_deep_workbench.js`, a dependency-free Node static QA runner for the eight workbench pillars, key safety/verification language, HTML closure, inline JavaScript syntax, catalogue structure, and server timeout/environment handling.
- `RUN_TESTS.cmd` now runs both the terminology smoke tests and the deep workbench static checks.

## Local checks run for this package
- `node --check terminology-server.js`: PASS
- `node test_terminology.js`: PASS (7 checks; see its console output for scope)
- `node test_deep_workbench.js`: PASS (19/19 static checks)
- ZIP integrity: checked during packaging.

## Explicitly NOT verified
- Real browser end-to-end interactions and mobile layout.
- OCR accuracy across photos, scans, PDFs, languages, rotation, blur, units, and reference ranges.
- Live external terminology APIs, credentials, licensing, service uptime, or provider-specific correctness.
- Clinical validity of food/nutrient advice or meal plans.
- Security penetration testing, encryption at rest, authentication/authorization, or regulatory compliance.

## Safe-use constraints
- Prototype / research workbench only; use synthetic/demo data until privacy/security review is completed.
- Do not use the output to diagnose, prescribe supplements, or independently manage medical conditions.
- A terminology match is a candidate, not a confirmed code. Verify with the authoritative terminology service and the correct release/context.
- OCR output must be manually checked against the source report before any downstream reasoning.
- Patient-specific medical diets and high-risk cases require qualified clinician/registered dietitian review.

## Run on Windows
1. Extract the ZIP to a writable folder.
2. Install Node.js 18 or newer if it is not already installed.
3. Double-click `RUN_TESTS.cmd` and read all PASS/FAIL/NOT TESTED output.
4. Start the app with `START_LOCAL_SERVER.cmd`; start terminology service separately with `START_TERMINOLOGY_SERVER.cmd` if using API-backed terminology search.
5. Keep `.env` secrets private. Never paste API keys into chat or commit them to a public repository.

## Release decision
**QA candidate, not a clinically validated release.** Static and local smoke checks passed in the build environment. Browser E2E, OCR benchmark, clinical review, and security review remain open release gates.
