# REVILAC Nutrition Intelligence v3.28 — patient-controlled guidance integration

## Added
- Patient-controlled food source picker with 10 broad categories and specific food items.
- Qualitative nutrient-source associations, optional portion, planned/eaten/rejected status, and local save.
- Other Options for alternative foods in the chosen category.
- Daily rotating optional food-source example.
- Browser read-aloud where supported.
- Ability-based movement classes: bed-based, seated, walking, gentle adapted yoga, restricted/clinician review.
- 30-section scope and coverage boundaries documented.
- Service-worker shell cache updated to include the new local guidance script and report routing scripts.

## Verification performed
- All 29 `test_*.js` files in the staging directory passed in Node during this build, including the new final-guidance test.
- `test_package.py` structural checks passed.
- ZIP integrity is to be checked after packaging.

## Not verified / limitations
- No full real-device browser end-to-end test in this run.
- Report recognition is keyword-based across 26 starter families; it cannot guarantee recognition of all global reports.
- Nutrient values are not calculated from a complete verified food database in the new picker. Existing calculator requires sourced values.
- Clinical validation, formal accessibility/language audit, security/penetration testing, production cloud hosting, and reliable background push notifications remain outstanding.
- This is nutrition and general wellness support, not diagnosis or treatment. Use synthetic/demo data only.
