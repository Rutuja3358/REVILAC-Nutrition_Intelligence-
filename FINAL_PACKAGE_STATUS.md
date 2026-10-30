# REVILAC Nutrition Intelligence — Consolidated Package Status

This file records the honest state of this build. It is not a claim of clinical or production readiness.

## Included in this package
- Existing localized REVILAC Nutrition Intelligence web prototype.
- Nutrition calculation module and nutrient intake tracking prototype.
- Patient-controlled food selection/swap interactions already present in the project.
- Added Nutrient Source Explorer with source-group information, patient-entered choices, local history and clear controls.
- v3.27 Nutrient Source Explorer: nutrient roles, food-source groups, patient-selected food/amount notes, and local saved-choice history.
- Basic wellness tracking and reminder UI.
- Report entry and best-effort OCR/PDF text extraction support.
- Local export/backup and project test scripts.
- Final product scope lock: `REVILAC_FINAL_SCOPE_LOCK.md`.

## Important limitations / not yet validated
- The bundled food list is not a complete, authoritative food-composition database; a small starter subset has approximate values that must be verified against current source records before production use.
- Individualized daily nutrient requirements are not fully validated for every age and clinical group.
- Food-choice records calculate approximate totals only for a small starter subset. This is not a complete database and does not calculate all nutrient needs or clinical targets.
- OCR can misread data and must be checked against the original report.
- This does not provide validated diagnosis or treatment.
- Local browser storage is not encrypted at rest; do not enter real sensitive patient information.
- Account/sync components are prototypes, not managed production cloud infrastructure.
- Notifications are not guaranteed while the app/browser is closed.
- Full Android/iOS/Windows end-to-end testing, formal accessibility/translation audit, penetration testing, and clinical validation remain outstanding.
- Any third-party CDN/API features may require internet access and independent licensing/configuration.

## Release status
**Prototype / development build — automated checks passed; not production-ready.**

Before real patient use: complete authoritative nutrition-data integration, clinically reviewed requirement logic and safety rules, secure storage/authentication, backups, real-device end-to-end testing, and independent privacy/security and clinical review.

## Windows quick start
1. Extract the ZIP.
2. Run `RUN_TESTS.cmd`.
3. Run `START_LOCAL_SERVER.cmd`.
4. Open `http://127.0.0.1:8000`.
5. Use synthetic/demo data only.

## Latest additions
- Universal patient-controlled food picker: 10 broad food categories, selectable specific items, qualitative nutrient associations, optional portion and planned/eaten/rejected tracking; Other Options now selects category first, then food item.
- Ability-class wellness choices: bed-based, seated, walking, gentle adapted yoga, and restricted/clinician-review pathways with alternatives. This is general support, not a prescribed exercise plan.
- Daily rotating food-source example, category-first Other Options, optional read-aloud and voice selection where browser APIs support them, local persistence, and daily totals for eaten foods only where starter composition estimates exist.
- `REVILAC_30_SECTION_SCOPE.md` records the 30 pinned sections and clarifies that report coverage is expandable rather than a claim of worldwide completeness. Active food guidance has been normalized to food sources/categories only; no recipe/dish outputs are intended.
- Daily Choice & Wellness: nutrient-source groups with Marathi/Hindi/English labels, other options, patient choice save, and read-aloud where supported.
- Reminder preferences for nutrition, water, sleep/rest, safe movement/yoga and mood, plus a user-triggered reminder test.
- Limit: this is not a guaranteed background daily notification scheduler; browser permission and an open page may be required.


## v3.31 completion and verification pass (2026-10-22)
- Added `FINAL_COMPLETION_MATRIX_v3.31.md`, which assigns a state and production gap to each of the 30 pinned sections.
- Added `test_completion_matrix.js` so all 30 sections must remain in the scope document and completion matrix.
- Added `test_http_smoke.py` and wired it into `RUN_TESTS.cmd`; it checks the local HTTP server, PWA manifest, nutrition mapper asset, invalid food-query handling, unknown API routes and missing assets.
- Fresh local run: 35/35 JavaScript test scripts passed; 8/8 JavaScript syntax checks passed; 6/6 inline JavaScript blocks passed; 23/23 structural/quality checks passed; 6/6 HTTP smoke checks passed.
- `node production_preflight.js` remains BLOCKED as expected in this unconfigured development environment: 18 checks, 7 pass and 11 blockers (managed database, HTTPS, ownership verification, shared rate limiting, production session secret, independent security/privacy/clinical reviews, real-device E2E evidence, backup/restore drill and monitoring/incident response).
- Headless Chromium did not return DOM output before timeout; browser end-to-end remains unverified. Live USDA API response, real-world OCR benchmark, clinical validation and exhaustive global report coverage remain unverified.

**Release decision: development/staging build only. Not production-ready. Use synthetic/demo data only.** See `FINAL_COMPLETION_MATRIX_v3.31.md`, `FINAL_TEST_RUN_SUMMARY.json`, `FINAL_TEST_RUN_LOG.txt`, and `PRODUCTION_REMAINING_WORK_v3.21.md`.


## v3.32 local security and regression pass (2026-10-22)
- Hardened the prototype account server to refuse public/LAN interface binds; this JSON-backed server is intentionally local-only.
- Grouped authentication throttling by client address rather than full URL, preventing query-string variations from creating fresh buckets; bounded the in-memory bucket map.
- Restricted prototype account data directory permissions where supported and added response security headers to the local application server.
- Added regression tests for authentication rate-limit bypass and public-bind refusal.
- Fresh local run: 37/37 JavaScript test scripts passed; 8/8 JavaScript syntax checks passed; 6/6 inline JavaScript blocks passed; 27/27 structural checks passed; 6/6 HTTP smoke checks passed.
- Production preflight remains blocked: 18 checks, 7 pass, 11 blockers. Browser end-to-end, live upstream USDA response, real-world OCR accuracy, clinical validation and real-device testing remain unverified.

**Release decision remains development/staging only, not production-ready.** See `FINAL_COMPLETION_MATRIX_v3.32.md`, `FINAL_TEST_RUN_SUMMARY.json`, `FINAL_TEST_RUN_LOG.txt`, and `PRODUCTION_READINESS_STATUS_v3.32.md`.
