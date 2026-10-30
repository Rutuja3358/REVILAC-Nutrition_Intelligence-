# REVILAC Nutrition Intelligence v3.38.4 — Zero-cost local build

## Code-level hardening
- Base64 encoding for encrypted vault ciphertext is now chunked to avoid large-argument/stack limits on large saved payloads.
- Vault envelope PBKDF2 iteration metadata is validated and bounded (600,000–1,000,000) before deriving a key, preventing malformed metadata from triggering unexpectedly expensive derivation.
- Added a regression test for these guards.

## Verification limits
- Automated Node test scripts and JavaScript syntax checks are run on the extracted package.
- Browser interaction testing could not be completed in this environment because Chromium navigation is blocked by the execution policy.
- This does not establish production readiness. Identifiable patient data remains blocked pending real-browser security tests, independent security review, OCR benchmarking on consented/de-identified reports, qualified clinical/nutrition review, privacy/legal review, and backup/restore validation.
