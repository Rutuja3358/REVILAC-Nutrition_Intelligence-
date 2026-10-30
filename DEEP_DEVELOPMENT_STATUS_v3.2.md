# REVILAC Nutrition Intelligence — v3.3 Consolidated Development Candidate

## What changed in this package
- Added `nutrition-core.js`, a shared conservative validation layer for report data quality, safety gating, and food-record provenance.
- Integrated report validation into the eight-pillar workbench. It flags missing required fields, ambiguous numeric values, unit-bearing numeric ranges, unrecognized reference-range formats, invalid/impossible/future dates, missing original report transcription, and missing specimen/method/fasting context where applicable. It does not interpret values as diagnoses or normal/abnormal.
- Expanded `test_nutrition_core.js` to 15 deterministic tests and included it in `RUN_TESTS.cmd`.
- Existing modules, terminology adapter, workbench and synthetic tests are retained.

## Eight areas: honest status
1. OCR/report extraction: existing best-effort OCR remains; accuracy across varied reports is NOT VALIDATED. Manual verification remains required.
2. Food/nutrient database: starter food catalogue remains descriptive, not a complete nutrient-composition database. Do not infer precise nutrient amounts where no sourced data exists.
3. Nutrition reasoning: educational prompts only; not a validated clinical reasoning engine.
4. Safety: checklist and conservative meal-plan hold are present. This is not a validated risk score and cannot guarantee detection of all risk.
5. Workflow integration: core pages and local terminology adapter are present; complete browser end-to-end workflow NOT TESTED here.
6. Terminology APIs: local adapter plus optional provider adapters; live connectivity depends on valid authorized credentials, endpoint and licensing. Not all standards are bundled.
7. Privacy/security: localStorage remains unencrypted. Use synthetic data only. Production security review and access control are NOT COMPLETE.
8. Multilingual/accessibility: glossary examples exist; full translation coverage and formal accessibility audit are NOT COMPLETE.

## Test status
- `node --check terminology-server.js`: PASS
- `node --check nutrition-core.js`: PASS
- `node test_nutrition_core.js`: 15/15 PASS
- Other existing tests must be run with `RUN_TESTS.cmd` on Windows (Node.js 18+).
- Browser interactions, OCR accuracy, live APIs, penetration/security tests, and clinical validation: NOT TESTED / NOT VALIDATED by this package build.

## Safety and data governance
- Use synthetic/demo records only.
- Verify every extracted field against the original report.
- A report-completeness PASS means only that basic data quality rules passed; it does not establish medical correctness.
- A safety flag should trigger clinician/dietitian review. No flags does not mean a person is clinically low-risk.
- Food records must include source and portion details before numeric nutrient values are considered eligible for a future evidence-backed database. Source URL syntax, source date, review-status vocabulary and nutrient-level source/unit are checked; this does not verify that a source is authoritative or that a value is correct.
