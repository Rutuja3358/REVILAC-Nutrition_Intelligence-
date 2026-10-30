# REVILAC Nutrition Intelligence — v3.27 Patient-Controlled Source Explorer

## Added
- Nutrient Source Explorer covering protein, fibre, iron, calcium, vitamins B12/D/C, folate, potassium, magnesium, zinc, energy, carbohydrates, unsaturated fats and hydration.
- Educational role descriptions and common food-source groups; options are informational, not prescribed foods or recipes.
- Patient-selected food/source, optional amount/unit, and source groups considered can be saved locally.
- Saved entries use textContent-created DOM nodes; source choice history is capped at 300 entries.
- Clear-saved-choices action with confirmation.
- Explicit message that source-choice logs are not automatically nutrient totals; use verified food-composition values in the calculator.

## Verification
- Inline JavaScript syntax check: passed.
- Existing project test suite: see `FINAL_TEST_RUN_SUMMARY.json` after latest package build.
- ZIP archive integrity: checked after packaging.

## Limitations
- Source explorer is educational and does not bundle nutrient amounts or claim nutrient equivalence.
- Saved choice entries are local browser data and are not securely encrypted.
- Food-composition data, individualized requirements, clinical validation, security review and full device E2E testing remain incomplete.
