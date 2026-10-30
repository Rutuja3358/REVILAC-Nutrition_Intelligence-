# REVILAC Nutrition Intelligence v3.35 — Release decision

**Decision: BLOCKED — development/staging only.** This package is not certified or safe to expose as a production multi-user health application.

## Code changes in v3.35
- Hardened the local USDA search cache with five-minute expiry pruning and a hard maximum of 200 entries to prevent unbounded memory growth.
- Reworked the production preflight to require inspectable release-evidence records for security, privacy, clinical review, device E2E, backup/restore, monitoring, nutrition-data licensing, OCR benchmarking and accessibility.
- Ensured a `DATABASE_URL` environment variable alone cannot pass the database gate while the account API still uses local JSON storage.
- Added runtime tests asserting missing production evidence keeps the release gate blocked.
- Added a release-evidence directory template; no fabricated PASS evidence is included.

## Tests run in this environment
- `npm test`: 37/37 test scripts passed.
- `npm run test:syntax`: 48/48 root JavaScript files passed.
- `npm run preflight`: exits with code 2 as expected because production blockers remain. Current report: 7 passed, 14 blocked out of 21 checks.
- These are local automated checks, not independent security, clinical, OCR-accuracy, real-device or live-provider validation.

## Blocking items
1. Replace local JSON account store with a real managed database adapter and tested migrations. The current account API is loopback-only by design.
2. Deploy behind a trusted HTTPS service and verify the deployed endpoint/certificate.
3. Configure and test account ownership verification and recovery.
4. Configure shared/distributed rate limiting and abuse monitoring.
5. Configure managed secrets/session keys, rotation and secure deployment policy.
6. Complete independent security review and remediate findings.
7. Complete privacy/legal review for consent, retention, export/deletion and incident response.
8. Obtain qualified clinical/nutrition review and documented approval of safety rules.
9. Complete real Android/iOS/desktop end-to-end testing, including background notifications.
10. Perform an independently stored encrypted backup and successful restore drill.
11. Configure production monitoring, alert routing and an incident owner.
12. Verify authoritative nutrition data source provenance, licensing, coverage, portions and units.
13. Benchmark OCR against ground-truth report samples, languages, layouts and numeric ambiguity.
14. Measure report-family coverage and ensure unknown/low-confidence reports safely abstain.
15. Complete accessibility, translation and representative user-usability review.

## Important
The evidence gate is intentionally not green. Do not fabricate evidence files, set flags to bypass checks, or use identifiable patient data with this build. Production readiness requires actual infrastructure and independent validation outside this code-editing environment.
