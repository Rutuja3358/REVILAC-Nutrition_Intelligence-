# REVILAC Nutrition Intelligence v3.38.4 — Readiness Status

## Decision: NOT APPROVED for identifiable real-patient data

### Code-level changes in this build
- Retains the encrypted local vault from v3.38.3 (AES-256-GCM, PBKDF2-HMAC-SHA-256, 600,000 iterations).
- Base64 encoding of ciphertext is chunked to avoid large-payload argument/stack limits.
- PBKDF2 iteration metadata is validated and bounded to 600,000–1,000,000 before key derivation.
- Adds a regression check for large-payload/KDF guards.

### Tests actually run on the extracted package
- `node scripts/run-tests.js`: 44/44 scripts passed.
- `node scripts/check-syntax.js`: 57/57 JavaScript files passed.
- `python test_package.py`: structural checks passed.
- `node production_preflight.js`: intentionally exits 2; 7/22 checks pass, 15 release blockers remain.
- ZIP is rebuilt from the tested package and rechecked after extraction.

### Not verified / blockers
1. Chromium browser navigation is blocked by the current execution environment, so vault create/unlock/wrong-passphrase/reload/migration and large real payload round-trip have not been browser-tested here.
2. Independent security review/penetration test; CSP still permits legacy inline scripts/styles.
3. Qualified clinical/nutrition review and OCR accuracy benchmark on consented/de-identified ground-truth reports.
4. Privacy/legal review, retention, export/delete, incident response and applicable jurisdictional requirements.
5. Encrypted backup/restore drill; lost vault passphrase is not recoverable.
6. Live cloud mode requires controlled deployment, PostgreSQL/email/domain/TLS/monitoring and integration evidence.
7. Cross-device/mobile end-to-end and accessibility/translation testing remain necessary.

Use synthetic or properly de-identified reports only until all relevant release gates are independently evidenced. This package is a local testing build, not certified or approved production software for identifiable patient data.
