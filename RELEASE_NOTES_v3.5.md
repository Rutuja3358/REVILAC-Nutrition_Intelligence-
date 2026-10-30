# REVILAC Nutrition Intelligence — v3.5 development build

## Changes
- Hardened Nutrition Intelligence food matching so personalized food matches pause when a medical/safety context is selected, the entered age is under 18, allergy/food-exclusion notes are present, or the selected topic is kidney/liver related.
- Included diabetes/glucose-lowering medicine context in the review gate.
- Invalid age entries (negative values or over 120 years) trigger review rather than silently bypassing the gate.
- Added `test_nutrition_ui_safety_gate.js` (7 regression checks) to `RUN_TESTS.cmd`.
- Preserved OCR date safeguards from v3.4.

## Local verification run in this build environment
- Nutrition core tests: 15/15 passed.
- OCR date-safety tests: 5/5 passed.
- Nutrition UI safety-gate regression checks: 7/7 passed.
- Terminology tests: passed (66 local starter concepts; official code coverage is not claimed).
- Deep Workbench QA: 19/19 static checks passed.
- Synthetic QA fixture audit: 8/8 passed.
- Package structural checks: passed.
- Deep static quality audit: 23/23 passed.
- JavaScript syntax checks for test/core scripts: passed.

## Important limits
- These are automated local logic and static/structural checks, not full browser end-to-end testing.
- OCR accuracy, real provider API access, clinical validity, security/privacy, and deployment readiness have not been validated.
- Allergy filtering cannot guarantee avoidance of all allergens or cross-contact.
- A cleared safety checklist is not clinical clearance. Use synthetic data only until privacy/security review is complete.
