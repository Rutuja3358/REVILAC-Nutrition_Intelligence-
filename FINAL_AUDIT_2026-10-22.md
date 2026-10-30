# REVILAC Nutrition Intelligence — Consolidated Audit

Audit date: 2026-10-22
Base version: 3.38.7; report-router update: 1.1.0

## Changes in this package
- Added descending keyword-routing relevance percentages to multiple matched report-family candidates.
- Added an explicit UI disclaimer: these percentages are text-match relevance only, not clinical severity, probability, abnormality percentage, or urgency.
- Added regression assertions for bounded scores, descending order, and the non-clinical meaning label.
- Rebuilt the allowlisted static PWA output.
- Updated report-router documentation with global coverage limitations and safe terminology-expansion guidance.

## Local automated checks run
- Report routing test: PASS — 29 examples, 41 family profiles, unknown-report fallback, mixed kidney+glucose hold, plus ranking assertions.
- Full automated suite: PASS — 46/46 scripts, 0 failures.
- JavaScript syntax: PASS — 59/59 root JavaScript files.
- Static PWA build: PASS — 11 allowlisted files generated.
- ZIP integrity: to be recorded in the accompanying release manifest after packaging.

## Coverage and ranking limitations
The registry is not exhaustive for every report, analyte, assay, specialty, country, language, or laboratory format worldwide. “All reports in the world” and unlimited report recognition cannot be certified from this finite registry. Imported terminology matches remain candidates and do not automatically produce tailored food advice. Unknown reports use the safe review path.

The ranking percentage is only a relative keyword-match relevance score. It must not be used to prioritize clinical urgency. Clinical priority requires verified values, units, reference ranges, patient age/life stage, symptoms and validated clinical rules. This package does not provide universal medical interpretation or guaranteed real-world OCR accuracy.

## Production release decision
**NOT production-ready for clinical use.** This is a development/demo build with passing local automated checks. Still required before production: independent clinician/dietitian validation, de-identified real-world OCR benchmark across diverse reports and languages, security/penetration testing, privacy/legal review, backup/restore validation, and complete browser/mobile/device end-to-end testing. Do not use identifiable patient data or rely on automated output for diagnosis/treatment before these gates are met.
