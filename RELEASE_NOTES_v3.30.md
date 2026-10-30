# REVILAC Nutrition Intelligence v3.30 — Integrated Completion Pass

## Changes
- Expanded the universal starter registry from 32 to 41 report-family profiles, including stool/faecal diagnostics, endoscopy, rheumatology/autoimmune assessment, dermatology, audiology/ENT, blood-bank/transfusion compatibility, pediatric growth/development, surgical/postoperative assessment and vascular diagnostics.
- Ensured every registry family has a matching conservative wellness profile. Unknown, low-confidence and high-risk matches still require confirmation or clinical review; text matching is not diagnosis.
- Added optional online USDA FoodData Central food search to the Nutrition Calculator via a loopback-only Node.js proxy. Search queries are bounded, requests are locally rate-limited, results are briefly cached, and the API key is read server-side from the environment or `.env`.
- Added unit-aware nutrient mapping for known nutrient names only. Unknown nutrients/units remain blank. Only Foundation, SR Legacy and Survey (FNDDS) search records are eligible for per-100 g auto-fill; branded/other records are name-only until a verified basis is entered.
- Updated the Windows launcher to prefer Node.js so the food-search proxy is available. Python static-server fallback can serve the app but cannot provide the online proxy route.
- Added a daily reminder check while the app page remains open; background delivery while the app is closed is not guaranteed.
- Removed displayed preparation/combination tips from the report-aware food suggestions. The active guidance is food-source oriented, not recipe/dish oriented.
- Fixed a stale integration-test version assertion, removed a duplicate profile key, added two test scripts, included all `test_*.js` scripts in `RUN_TESTS.cmd`, and bumped the PWA cache to v3.30.

## Verification
- 33 JavaScript test scripts passed.
- JavaScript source syntax checks passed.
- Inline JavaScript syntax and package structural/deep quality audits passed.
- Local Node server smoke checks passed for app-shell delivery, input validation and missing-path handling.

## Not established by these checks
- Live USDA FoodData Central upstream responses or API availability.
- Complete worldwide report recognition or validated nutrition mappings for every report.
- Complete authoritative food-composition coverage, individualized clinical nutrient targets or clinical validity.
- Full Android/iOS/desktop browser end-to-end, formal accessibility/translation audit, production security/privacy certification, or guaranteed background notifications.

This remains a development prototype. Use synthetic data only until appropriate clinical, privacy/security and device validation is completed.
