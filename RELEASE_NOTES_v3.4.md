# REVILAC Nutrition Intelligence — v3.4 development update

## Change implemented
- Safer report-date auto-fill: the default current date is treated as an untouched field so a date present in extracted text can be considered.
- Ambiguous numeric dates (for example `03/04/2026`) are no longer silently interpreted as day/month or month/day. They require manual review.
- Impossible calendar dates are rejected using an ISO date round-trip check.
- Windows `RUN_TESTS.cmd` now includes the OCR date-safety static regression checks.

## Verification in this package
- OCR date-safety static regression checks: 5/5 passed.
- Run the full `RUN_TESTS.cmd` on Windows with Node.js to repeat the complete local suite.

## Limits
This change does not establish OCR accuracy. Extracted fields still require comparison against the original report. It does not provide clinical validation, browser end-to-end verification, live API verification, or a security audit.


## Additional safety-gate hardening (in progress)
- The Nutrition Intelligence food-match panel now pauses tailored food matching when a safety context is selected, the age entered is under 18, allergy/exclusion notes are present, or the selected topic is kidney/liver related.
- Diabetes/glucose-lowering medicine context is included in the same review gate.
- Added `test_nutrition_ui_safety_gate.js` and registered it in `RUN_TESTS.cmd`.
- This is a conservative UI-level safeguard, not a clinical risk assessment; it cannot validate the completeness of user-entered history or guarantee allergy safety.
- Added an invalid-age hold for negative values or ages above 120, preventing these malformed entries from bypassing the review gate.
