# Universal Report → Nutrition Routing — Release Notes

- Added a shared report recognition and nutrition-routing card to the Add Report page.
- Added 26 report-family knowledge profiles with aliases, nutrition relevance notes, food-source examples where appropriate, and family-specific safety cautions.
- Added unknown-report safe fallback; the system does not guess a nutrition relationship when it cannot confidently identify a report.
- Recognition now runs when report title/OCR text changes, after the existing OCR auto-fill flow, and before report save. Candidate route metadata is stored with the report record.
- Added an optional importer for an officially obtained LOINC CSV so large terminology vocabulary can be indexed without manually entering each concept. Imported terminology hits are only candidates; they do not automatically produce nutrition advice.
- Added automated routing tests covering 20 example report families, unknown-report fallback, and terminology-only matching.

## Verification performed for this update
- `node --check universal-report-nutrition.js` passed.
- `node test_universal_report_nutrition.js` passed.
- All existing `test_*.js` files in this package passed in the Node test loop at build time.
- Static check confirmed UI hooks, script inclusion and saved report routing field.

## Limitations
This is not medical-grade OCR or clinical decision support. Coverage is a broad starter set, not every report or language worldwide. A recognized label does not establish diagnosis, nutrient deficiency, or a treatment plan. Validate the source report and seek clinician/dietitian review for patient-specific guidance. LOINC import requires a separately obtained release and compliance with current license terms.


## Follow-up integration fix
- The router now loads `loinc_report_registry.json` when an officially sourced registry is present, and otherwise falls back to the bundled `local-terminology-catalog.json` starter concepts. Starter terminology matches remain candidates only and do not create nutrition advice by themselves.
- This improves out-of-box terminology lookup without requiring manual concept entry; it does not make the bundled starter catalogue globally complete.
