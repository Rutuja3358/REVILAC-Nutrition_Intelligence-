# v3.18 — Production transition readiness
- Added a read-only production preflight covering runtime/files, managed database, HTTPS, verification provider, shared rate limiting, session secret, reviews, device E2E, backup restore, and monitoring.
- Added tests for the preflight's key safety checks and non-zero blocker exit behavior.
- Added a production transition plan emphasizing a staged database migration, real evidence, privacy/security/clinical review, and real-device testing.
- No claim of cloud deployment or production approval is made. The prototype still uses a local JSON account store and synthetic data only.
