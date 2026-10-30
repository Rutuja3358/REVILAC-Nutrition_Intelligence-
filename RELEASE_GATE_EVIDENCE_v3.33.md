# REVILAC Nutrition Intelligence v3.33 — Production Release Gate

Decision: **BLOCKED — development/staging only**. Do not enter real identifiable health data.

## Locally verified in this run
- 37/37 JavaScript test scripts passed.
- 8/8 JavaScript syntax checks passed.
- Python structural/package audit, deep quality audit, and local HTTP smoke audit passed.
- 48 local automated command checks passed with no failures.
- Service-worker cache version updated to v3.33; the PWA test checks that the stale v3.30 cache key is absent.
- ZIP integrity verified after packaging.

## Blocking release gates — not safe to simulate or mark passed
1. **Managed database** — replace JSON-file storage with a managed persistent database, migrations, transactions, access isolation, deletion/retention and concurrency tests.
2. **HTTPS** — deploy behind trusted HTTPS with certificate renewal and correct proxy configuration; verify on the deployed host.
3. **Account ownership and recovery** — configure an actual verified email/SMS or other approved provider, recovery flows, abuse controls and user-visible errors.
4. **Shared rate limiting** — configure a distributed rate limiter and validate across instances.
5. **Secrets/session management** — configure a deployment secret manager, session/token lifecycle, key rotation and production cookie/CSRF decisions.
6. **Independent security review** — threat model, dependency scan, penetration testing and remediation evidence.
7. **Privacy/legal review** — consent wording, purpose limitation, retention/deletion, access/export, incident response and applicable jurisdiction review.
8. **Clinical/nutrition review** — qualified reviewer signs off nutrient mappings, units, thresholds, restrictions, age/life-stage pathways, escalation wording and uncertainty behavior.
9. **Real-device end-to-end testing** — Android/iOS/desktop journeys, uploads, OCR verification, food selection, sync conflicts, export/deletion, offline recovery and notifications while closed.
10. **Backup/restore drill** — independent encrypted backups, documented RPO/RTO, restore from backup and verify restored data.
11. **Monitoring/incident response** — service health, alert routing, audit logs, incident owner and recovery procedure.
12. **Authoritative food data/licensing** — establish coverage, license/terms, provenance/versioning, exact food form, edible portions and update/fallback behavior. Live USDA response was not verified in this run.
13. **OCR benchmark** — curated permissioned/de-identified representative report corpus; measure field-level accuracy, decimal/unit/date errors and abstention rate. OCR output must remain unverified until human confirmation.
14. **Report-family coverage** — expand and measure actual supported formats. Unknown/low-confidence reports must safely abstain. Universal 100% report recognition cannot be guaranteed.
15. **Accessibility/localization** — WCAG-oriented review, native-speaker/medical terminology review, screen-reader/keyboard/zoom testing and low-literacy user testing.

## Do not bypass the gate
`production_preflight.js` currently reports 18 checks, 7 passed and 11 blockers. Do not set `REVILAC_*_REVIEW=passed` or similar variables to force a green result. The flags are tracking values, not implementation or evidence.

## Acceptance rule
Each gate is complete only when the underlying service/configuration exists, its tests pass in the deployed environment, and the corresponding evidence is recorded. A green local test suite is not production certification.
