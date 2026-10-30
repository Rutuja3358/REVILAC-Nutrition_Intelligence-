# Release notes — v3.16 Free-First Account Lifecycle Hardening

## Added
- `POST /api/password/change`: requires current password and a new password of at least 12 characters; uses scrypt password hashing and invalidates other sessions for that account.
- `DELETE /api/account`: requires the current password and deletes the account record and its sessions from the local prototype store.
- Integration tests for incorrect current password, password change, old/new login behavior, deletion confirmation, and invalidation of a deleted account token.
- Updated release and deployment documentation.

## Verification scope
- Run `node test_account_api_hardening.js` and the full `RUN_TESTS.cmd` suite.
- This is not production authentication. No verified email/SMS, password reset, MFA, HTTPS hosting, managed database, encryption at rest, shared rate limiting, or independent penetration test is included.
- Use synthetic/demo data only. Do not expose the prototype API to the internet or use real patient data.

## v3.17 production-readiness hardening pass (2026-10-21)
- Reworked the account API integration test to run from an isolated temporary directory, preventing it from touching or deleting an existing `server-data` directory in the developer's project.
- Added `PRODUCTION_READINESS_GATE_v3.17.md` with an explicit NOT PRODUCTION READY decision, verified scope, mandatory launch blockers, and staged rollout guidance.
- Re-ran the JavaScript regression scripts, Node syntax checks, package structural audit, deep static audit, synthetic fixture audit, and ZIP integrity check before release.
- These changes improve test safety and release transparency; they do not implement hosted cloud infrastructure, verified OTP, managed database, push delivery, clinical validation, or independent security review.
