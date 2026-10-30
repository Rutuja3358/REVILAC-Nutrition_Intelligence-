# REVILAC Nutrition Intelligence v3.36 — Release status

**Decision: BLOCKED — production candidate code added; not approved for real patient data.**

## New code-level work in v3.36
- Added a separate PostgreSQL-backed `production-server.js` entry point; the existing `account-server.js` remains a loopback-only prototype and is not the production entry point.
- Added an idempotent initial schema migration for users, sessions, JSONB synced data, email verification challenges, shared rate limits and migration records.
- Added email OTP verification and password-recovery endpoints with expiration, attempt limits, per-IP/per-email throttles, HMAC-protected OTP/session hashes and SMTP delivery.
- Added PostgreSQL-backed shared rate limiting, sync request throttling, scrypt password hashing, authenticated data sync, password change, logout, account deletion and consent timestamp/version storage.
- Added same-origin enforcement, restrictive response headers, payload validation and request-size bounds to the production API.
- Updated registration UI to use the email verification flow when served by the production API; prototype registration stays separate.
- Added Dockerfile, Docker Compose, Caddy TLS reverse-proxy config, production environment template and backup/restore scripts.
- Added production API contract test, idempotent follow-up migration, container healthcheck, bounded log rotation and updated preflight to require live database/provider/review evidence.

## Tests run in this environment
- `npm test`: 38/38 test scripts passed.
- `npm run test:syntax`: 50/50 root JavaScript files passed.
- `python test_package.py`: structural checks passed.
- After creating the ZIP, tests were rerun from the staged package: 38/38 test scripts, 50/50 syntax checks and structural checks passed.
- `npm run preflight`: exits 2 as intended; 7/22 checks pass and 15 remain blocked because live deployment/provider/review evidence is absent.
- Production API contract test verifies code structure and flow only. It does **not** connect to PostgreSQL, send real email, or prove runtime behavior with external services.
- Dependency installation timed out in this environment; `pg` and `nodemailer` are declared but the production server was not booted against live dependencies/providers.
- Docker is not available in this environment, so Compose/Caddy deployment was not executed.

## Remaining blockers (must not be faked)
1. Deploy to a domain you control, set secrets and SMTP configuration, run `npm install`, and verify TLS/headers on the deployed endpoint.
2. Refactor inline scripts/styles to remove CSP `unsafe-inline` exceptions before final security sign-off.
3. Run PostgreSQL migrations and integration tests against a real test database; validate transaction/concurrency and multi-instance behavior.
4. Complete account verification and recovery end-to-end using the actual SMTP provider; test abuse cases and email deliverability.
5. Perform independent security review, penetration testing and remediation.
6. Complete privacy/legal review for consent, retention, export/deletion and incident response.
7. Obtain qualified clinical/nutrition review of safety rules and recommendation content.
8. Complete real Android/iOS/desktop end-to-end testing, including background notification behavior.
9. Perform an encrypted off-host backup and successful restore drill in a separate test environment.
10. Configure production monitoring, alert routing, an incident owner and a tested incident-response plan.
11. Verify authoritative nutrition data provenance, licensing, units, portions, coverage and live API behavior.
12. Benchmark OCR against consented/de-identified ground-truth reports across layouts/languages and numeric ambiguity.
13. Measure report-family coverage; ensure unknown or low-confidence reports abstain and route to human review.
14. Complete accessibility, translation and representative user-usability review.
15. Review domain/provider terms, data residency and applicable laws before storing health-related data.
16. Inspect every release-evidence artifact independently; metadata files alone are not proof.

## Deployment warning
The production server is a **production-oriented candidate**, not certified production software. The current UI uses prompt-based OTP entry for expediency, and CSP still allows `unsafe-inline` for legacy inline scripts/styles; accessibility/security review must address both. Do not upload real identifiable patient reports until all release gates are independently verified. Use synthetic/demo data for current testing.
