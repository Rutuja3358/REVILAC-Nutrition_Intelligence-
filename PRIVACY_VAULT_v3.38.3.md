# REVILAC v3.38.3 — Encrypted Local Vault

## Change
The app's script execution is gated behind a local vault unlock screen. Existing browser storage keys are migrated into a single encrypted envelope on first setup. The envelope uses Web Crypto AES-256-GCM with a random 96-bit IV per write and PBKDF2-HMAC-SHA-256 with a 600,000-iteration derivation and 128-bit random salt. A lock button saves pending writes and reloads the page.

## Important limitations
- This is a code-level local-at-rest protection improvement, not production certification.
- While unlocked, app scripts can access decrypted data in memory. This does not protect against XSS, browser extensions, malware, or a compromised device. CSP still permits legacy inline scripts/styles and needs a separate refactor.
- Passphrase loss means data recovery is not possible. The encrypted local vault is not a backup. Do not delete browser data without a separate recovery plan.
- Exported files may be plaintext; store them securely.
- App must run on localhost or HTTPS with Web Crypto available.
- Run a real browser test and independent security review before using identifiable patient data.

## Status
Not approved for identifiable real-patient production use. Synthetic/de-identified data only until all release gates are independently verified.
