# REVILAC Nutrition Intelligence — Production Readiness v3.38.5

**Decision: BLOCKED — not approved for identifiable real-patient data.**

## Newly completed code-level hardening
- High-risk report families suppress tailored food-item lists pending qualified review.
- High-risk report families override unrestricted movement suggestions with review/restriction messaging.
- Production responses add COOP/CORP/X-Permitted-Cross-Domain-Policies headers and additional CSP directives.
- Regression tests cover the new high-risk guidance behavior and production security headers.

## Current local verification
- `npm test`: 44/44 scripts passed.
- `npm run test:syntax`: 57/57 root JavaScript files passed.
- `python test_package.py`: structural checks passed.
- `npm run preflight`: 7/22 checks passed, 15 blockers remain (expected nonzero exit).

## Remaining blockers
1. Refactor legacy inline scripts, inline event handlers and inline styles; remove CSP `unsafe-inline` and test the resulting policy.
2. Execute real browser tests for encrypted vault creation, wrong passphrase, unlock, persistence, reload, lock, migration and recovery/backup behavior.
3. Run independent security review/penetration tests and remediate findings.
4. Run real PostgreSQL migration/integration and multi-instance rate-limit tests.
5. Configure and test email OTP/recovery through a real SMTP provider.
6. Deploy under a user-controlled HTTPS domain and verify headers/TLS.
7. Perform backup and successful restore drill.
8. Have a qualified clinician/registered dietitian review nutrition rules, report-to-guidance mapping, risk flags, language and patient instructions.
9. Benchmark OCR against consented/de-identified ground-truth reports across supported report types, languages and layouts; document accuracy and abstention behavior.
10. Review nutrition database provenance, units, serving assumptions, licensing and update policy.
11. Test Android/mobile/desktop end-to-end, accessibility and translations.
12. Establish privacy/legal review, retention/deletion procedures, monitoring and incident response.

## Security note
The production CSP still includes `script-src 'unsafe-inline'` and `style-src 'unsafe-inline'` to preserve the legacy UI. This is not acceptable for final security sign-off and must be removed in a follow-up refactor. The encrypted local vault does not protect data from XSS/malware while unlocked.

## Clinical safety note
The code-level high-risk gates are conservative safeguards, not clinical certification. OCR and report-family matching can be wrong; saved values remain unverified and clinical clearance is never granted automatically. Until all blockers have independently inspected evidence, use only synthetic or properly de-identified reports.
