# REVILAC Nutrition Intelligence v3.6 — Safety gate hardening

## Changes
- The eight-pillar workbench safety screen now treats non-empty allergy/restriction notes as requiring manual review.
- The practical meal planner now stops when any safety flag, allergy/restriction note, or free-text preference/exclusion is present. It does not attempt to parse free text and guess which foods are safe.
- Added regression checks for each gate condition.

## Important limitations
- This is a conservative prototype safeguard, not a clinical risk score or validated allergy-checking system.
- The app does not establish diagnoses or prescribe therapeutic diets/supplements.
- Local browser storage is not encrypted. Use synthetic/demo data only until privacy and security review is completed.
- Automated/static checks do not prove OCR accuracy, browser compatibility, external terminology service coverage, cybersecurity, or clinical validity.
