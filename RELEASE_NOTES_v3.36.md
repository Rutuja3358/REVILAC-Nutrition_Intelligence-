# REVILAC Nutrition Intelligence v3.36

- Added PostgreSQL-backed production-candidate API entry point with email OTP verification.
- Added database migration for user accounts, sessions, synced patient-controlled data, OTP challenges and shared rate limiting.
- Added Caddy HTTPS reverse proxy and Docker Compose deployment blueprint with private database network.
- Added backup/restore helper scripts and deployment runbook.
- Updated account registration UI to support production email verification while preserving the local prototype path.
- Added production API contract test and tightened release preflight to require database integration evidence.
- Automated checks: 38/38 test scripts and 50/50 JavaScript syntax checks passed in this environment.
- Release gate remains blocked because live database/SMTP/deployment tests, security/privacy/clinical reviews, OCR benchmarking, device tests, backup restore and accessibility evidence have not been completed.
