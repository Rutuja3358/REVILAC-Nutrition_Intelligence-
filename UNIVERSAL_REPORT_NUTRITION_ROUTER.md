# REVILAC Universal Report → Nutrition Router (starter expansion)

## Included
- Shared report/test text classifier with aliases and keyword scoring across hematology/CBC, iron studies, glucose/HbA1c, lipids, kidney/electrolytes, liver, vitamins, minerals, thyroid, hormones, urine/body fluids, infection, immunology/inflammation, pathology/oncology, radiology, cardiology, pulmonary, bone, pregnancy, genetic, allergy, neurology, coagulation, gastrointestinal and nutrition assessment families.
- On-screen routing output in the Add Report page; reacts to report title/OCR text and can be run manually.
- General food-source education only for selected low-ambiguity nutrition topics; high-risk and indirect report families route to clinician review rather than guessing.
- Unknown reports go to a safe fallback; no automatic diagnosis, deficiency determination, supplement prescription or disease-specific diet.
- The recognized candidate and confidence description are attached to a saved report record for auditability.

## Important coverage boundary
This is a broad, expandable starter registry, not a claim to cover every report, analyte, lab alias, language, assay or imaging document worldwide. Text recognition is keyword-based, not a medical-grade OCR or clinical interpretation model. It needs validation against diverse de-identified reports and qualified clinical review before real-patient use. A keyword hit is only a candidate and must be checked against the original report.

## Test
Run `node test_universal_report_nutrition.js` from this folder. Also run the existing project test suite using `RUN_TESTS.cmd` on Windows.


The expanded registry is still not exhaustive worldwide. A recognized family is a candidate classification, not a clinical interpretation. Specific nutrition mapping is used only when defined; otherwise the safe review path is shown.


## Ranking and global coverage clarification (2026-10-22)
- Multiple matched report families are sorted in descending **keyword-routing relevance percentage**. This is a text-match score relative to the strongest match in that document, not a probability, result abnormality percentage, clinical severity score, or urgency ranking.
- Clinical importance cannot safely be ranked from report title/OCR keywords alone. A medically meaningful priority requires verified analyte values, units, report-specific reference ranges, age/life-stage context, symptoms and validated clinical rules. The engine must not claim that relevance percentages mean the patient is at a given level of risk.
- The 41 profiles and 29 routing examples are a starter validation set, not every report, analyte, assay, imaging report, specialty, country, language, or laboratory format in the world. “Unlimited/all worldwide reports” cannot honestly be guaranteed by a finite static keyword list.
- The code supports importing additional terminology concepts, but terminology hits are candidates only and intentionally do not create tailored food guidance. Add official terminology datasets only after checking license, version, provenance, language coverage, and local clinical mapping. Unknown reports remain on a safe manual-review path.
