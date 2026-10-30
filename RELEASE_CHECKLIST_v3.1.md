# REVILAC Nutrition Intelligence — Consolidated QA Release Checklist v3.1

## Release status
This is a **prototype / QA release candidate**, not a clinically validated product. The package consolidates the existing app, local terminology adapter, eight-pillar workbench, automated tests, browser smoke harness, and synthetic test cases. No claim of 100% completion, regulatory approval, security certification, OCR accuracy, or clinical effectiveness is made.

## Run once on Windows
1. Extract this ZIP to a normal writable folder (not inside the ZIP viewer).
2. Install Node.js 18 or later.
3. Double-click `RUN_TESTS.cmd` and save the terminal output.
4. Double-click `START_TERMINOLOGY_SERVER.cmd` to start the app and terminology adapter. Keep the window open. Open the URL printed by the server (normally `http://127.0.0.1:8787/`).
5. Use only synthetic/demo data until privacy/security review is complete.
6. Follow `BROWSER_SMOKE_TEST_STATUS.md` and test each interaction manually. Record PASS/FAIL/NOT TESTED; do not treat static tests as browser tests.

## Definition of done (must all be evidenced before production use)
- [ ] Representative image/PDF OCR benchmark with ground-truth labels; field-level precision/recall and decimal/unit error analysis documented.
- [ ] Human confirmation before any OCR-derived value affects reasoning.
- [ ] End-to-end report → verification → terminology → nutrition reasoning → safety → plan → export workflow passed in supported browsers and Android-sized viewport.
- [ ] Food nutrient values have traceable source, edition/date, portion, preparation state, and units; unknown values are not invented.
- [ ] Safety scenarios in `SYNTHETIC_REPORT_TEST_CASES.json` executed with results captured.
- [ ] Terminology API authentication/licensing and real-provider responses validated; offline/local results visibly distinguished.
- [ ] Privacy, consent, access controls, deletion/export, secrets, dependency and security review completed.
- [ ] Qualified clinical/nutrition review and applicable legal/regulatory assessment completed.
- [ ] Regression suite passes on the actual target machine; release artifact hash recorded.

## Test status vocabulary
- **PASS**: executed and evidence recorded for the stated scope.
- **FAIL**: executed and failed.
- **NOT TESTED**: no valid execution evidence; never infer pass from source-code presence.
- **NOT APPLICABLE**: documented reason required.

## Known limits
- Bundled terminology catalogue is a starter catalogue, not complete official code sets.
- External terminology services require valid credentials/authorized endpoints; configured does not mean clinically validated.
- OCR depends on actual implementation/provider and must be benchmarked on representative reports; no accuracy percentage is claimed.
- Sample food catalogue is not a complete, source-verified nutrient database.
- Meal planning is educational/general and must not be treated as individualized medical nutrition therapy.
- Browser interactions, live providers, clinical validity, privacy/security, and real-world OCR accuracy are not proven by static or smoke tests alone.
- Browser localStorage is not encrypted storage for sensitive health data. Do not store real identifiable patient data until security architecture is reviewed.
