# Release notes v3.38.3

- Added passphrase-gated encrypted browser storage using Web Crypto AES-256-GCM and PBKDF2-SHA-256.
- App scripts are deferred until vault unlock.
- First unlock migrates existing localStorage keys into an encrypted envelope.
- Added a lock-and-reload control.
- Automated tests check key security design markers and script gating.

Not a production approval: real browser QA, independent security review, clinical validation, OCR benchmarking, legal/privacy review and backup recovery testing remain required.
