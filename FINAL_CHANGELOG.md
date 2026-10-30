# REVILAC Final Consolidation — Change Log

## Added in this pass
- Nutrient Source Explorer with role explanations and source groups for protein, fibre, iron, calcium, B12, vitamin D, folate, vitamin C, potassium, magnesium, zinc, energy, unsaturated fats, carbohydrates, and hydration.
- Patient controls which source groups to consider; the UI does not prescribe a specific recipe or food.
- Optional patient-entered food choice and quantity with local-device save, history, and clear function.
- Explicit notice that saved choices are not automatically converted to nutrient totals; use the Nutrition Calculator with verified food composition data.
- Final product scope and prototype limitations documents.

## Validation
- ZIP archive integrity checked after packaging.
- Automated tests and syntax checks: see `FINAL_TEST_RUN_SUMMARY.json`.
- These checks are not clinical validation, a full Android/iOS end-to-end test, or a security review.

## Still required before real patient use
- Integrate and verify a complete authoritative food-composition dataset with citations/versioning.
- Implement reviewed individualized nutrient targets and compare intake against targets safely.
- Connect food choice entries to the verified nutrient calculator so totals update automatically.
- Test portions, edible weights, cooking/preparation factors, units, mixed dishes, missing values, and data coverage.
- Complete clinical review, accessibility/translation review, real-device testing, secure cloud infrastructure, and privacy/security testing.

- Connected saved patient food choices to the Nutrition Calculator: selecting the action opens the calculator and transfers the food name and gram quantity when available. Nutrient values still must be copied from a trusted source; no values are fabricated.

- Added Daily Choice & Wellness module with multilingual nutrient-source options, a patient-selected option, an explicit “other options” toggle, and read-aloud where supported.
- Added configurable daily wellness reminder preferences for nutrition, water, sleep/rest, safe movement/yoga and mood. Reminder test is user-triggered; this browser prototype cannot guarantee scheduled notifications when closed.


## Integrated scope additions — v3.29 staging (baseline)
- Expanded report-family recognition to include symptom/headache notes, eye/vision, dental/oral, respiratory function/sleep studies, cardiac tests and genetic/molecular reports. Unknown/high-risk reports continue to the safe review path.
- Expanded “Other Options” to select a broad food category first and a specific food item second.
- Added portion-scaled approximate nutrient estimates for a small starter food subset, with explicit source-verification disclaimers and no fabricated values for unsupported foods.
- Added allergy/restriction context warning, optional voice food selection when browser speech recognition is available, and retained read-aloud fallback.
- Migrated the main local storage key to REVILAC Nutrition Intelligence while copying legacy data forward when present.
- Added a final integration test to the test suite; it was included in the final test pass and passed.

- Removed meal/dish-based outputs from the active food guides and alternatives; the current guidance UI returns individual food sources/categories only.
- Added category icons, larger-text and simpler-wording accessibility settings, Marathi/Hindi voice-name matching where browser speech recognition is available, and read-aloud fallback.
- Daily food reminder can open the category-first Other Options selector and, when a report candidate has an explicit starter profile, includes a cautious report-aware summary.
- Daily recorded intake now summarizes approximate nutrients only for eaten foods with a starter composition entry and portion; it clearly labels the total as incomplete.

- v3.29 baseline verification: 29 command groups passed at that release. The current v3.30 verification is recorded separately in `FINAL_TEST_RUN_SUMMARY.json` and `FINAL_TEST_RUN_LOG.txt` (33 JavaScript test scripts plus syntax and structural audits). Neither result is a full browser/device, clinical, security or production-readiness certification.


## Completion pass — v3.30
- Added online USDA FoodData Central search to the nutrition calculator using a loopback-only Node.js proxy, bounded search input, simple local rate limiting, short-lived result caching, and private server-side API-key configuration.
- Added conservative nutrient-name/unit mapping tests; only recognized nutrient names and compatible units are imported, unknown values stay blank, and non-standard/branded serving bases are not auto-filled as per-100 g.
- Added nine additional report families: stool/faecal diagnostics, endoscopy, rheumatology/autoimmune assessment, dermatology, audiology/ENT, blood bank/transfusion, pediatric growth/development, surgical/postoperative assessment, and vascular diagnostics. Actual coverage remains expandable.
- Fixed the stale report-wellness integration version assertion, removed duplicate profile keys, added missing test coverage, and changed `RUN_TESTS.cmd` to run all `test_*.js` scripts plus syntax and Python audits.
- Added an in-page daily reminder check while the app is open; background notifications while closed are not guaranteed.
- Removed displayed preparation/combination tips from the report-aware food guidance so active guidance focuses on food-source items, nutrient relevance, portions, and safety notes rather than recipes or cooking instructions.
- Final automated verification: 33 JavaScript test scripts, JavaScript syntax checks, inline-script syntax checks, package structural audit and deep static audit all passed. Live external FoodData Central responses, full browser/device end-to-end behavior, clinical validation, comprehensive global report coverage and production privacy/security remain unverified.

## Final food-source consistency pass (2026-10-22)
- Replaced legacy quick-swap localization entries that described dishes or combinations with Marathi/Hindi labels for individual food sources.
- Updated general guidance and README language to consistently present patient-selected food sources and alternatives rather than meal ideas.
- Added `test_food_source_only_policy.js` and updated the localization regression test to guard the no-recipe/no-dish requirement.
- Full automated suite rerun: all 34 `test_*.js` scripts passed; JavaScript syntax checks and both Python structural/quality audits passed. Live external APIs, clinical validity, global report coverage, real-world OCR accuracy, background notification delivery and cross-device end-to-end behavior remain unproven.


## Security hardening and verification — v3.32 (2026-10-22)
- Authentication rate limiting now groups register/login requests by client address rather than the complete URL; query-string variations no longer bypass the same local throttle bucket.
- The JSON-backed prototype account server refuses non-loopback binds, limiting accidental public/LAN exposure. This is a local prototype safeguard, not a replacement for managed production infrastructure.
- Restricted local account data-directory permissions where supported; added anti-framing, no-referrer, nosniff and same-origin microphone permission headers to local app responses.
- Added regression tests for rate-limit query variation and public-bind refusal; added HTTP header assertions.
- Verification: 37/37 JS tests, 8/8 syntax checks, 27/27 structural checks, and 6/6 HTTP smoke checks passed locally. Production preflight remains blocked by 11 external/deployment/clinical/privacy/e2e requirements.


## PWA cache consistency — v3.33 (2026-10-22)
- Updated the service-worker cache key to v3.33 so an updated package invalidates the older v3.30 app-shell cache.
- Updated the PWA regression test to reject the stale cache key.
- Full local automated suite rerun; production status remains blocked by external deployment, clinical, privacy/security, and real-device validation requirements.
