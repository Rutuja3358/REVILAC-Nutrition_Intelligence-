# REVILAC Nutrition Intelligence v3.38.5 — Security and Clinical Safety Hardening

## Code-level changes in this build

- High-risk report families now suppress tailored food-item lists in the report-aware wellness panel until qualified clinical review.
- High-risk report families now override a generic “low activity” selection and show a clinical-review/activity-restriction message instead of presenting unrestricted movement suggestions.
- The report-aware wellness regression test asserts both safeguards.
- Production static responses add `Cross-Origin-Opener-Policy: same-origin`, `Cross-Origin-Resource-Policy: same-origin`, `X-Permitted-Cross-Domain-Policies: none`, plus CSP directives for same-origin form submission, no frames, same-origin manifest, worker source constraints and HTTPS upgrade requests.
- Package version metadata updated to 3.38.5.

## Verification run in the package workspace

- `npm test`: 44/44 test scripts passed.
- `npm run test:syntax`: 57/57 root JavaScript files passed.
- `python test_package.py`: structural checks passed.
- `npm run preflight`: intentionally exits nonzero; 7/22 checks passed and 15 production blockers remain.

## Important limits — not production approval

- CSP still contains `script-src 'unsafe-inline'` and `style-src 'unsafe-inline'` because the legacy monolithic UI and inline event handlers have not yet been refactored. This remains a security sign-off blocker.
- Browser-level encrypted-vault unlock/decrypt/reload testing and independent penetration testing have not been completed in this environment.
- Real PostgreSQL/SMTP integration, HTTPS deployment, device end-to-end tests and backup/restore drill have not been demonstrated.
- The clinical safeguards are conservative code rules, not a qualified clinical review. Nutrition data licensing/provenance, OCR accuracy against ground-truth reports, translations/accessibility and clinical recommendations still require expert validation.
- Do not use identifiable real-patient data in this build. Use synthetic/de-identified reports for local testing until all release gates are independently evidenced.
