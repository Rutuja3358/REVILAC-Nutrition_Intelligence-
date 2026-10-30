# REVILAC Nutrition Intelligence — Report Coverage & Nutrition Routing

## Goal

One upload and recognition workflow for laboratory, imaging, pathology, cardiology, respiratory, genetic, dental/oral, eye, pregnancy-related, nutrition/anthropometry, symptom and other health documents. The software provides nutrition and general wellness support only; it does not diagnose, cure or replace medical care.

## Routing policy

1. Extract text from a user-selected PDF/image when supported; preserve the original for human comparison.
2. Match report title and terms against the expandable local report-family registry and, when configured, imported terminology concepts.
3. Show candidate matches and confidence; do not treat a name/code match as a verified interpretation.
4. Use a report-family nutrition mapping only when one is explicitly defined and evidence supports it. Some reports (for example X-ray or headache notes) may not imply a nutrition need; in those cases provide general wellness support or a review message, not invented disease-specific food advice.
5. Check patient-entered allergies, age/life stage, restrictions, conditions, medication context, symptoms and clinician instructions before personalizing.
6. Unknown/low-confidence or high-risk results go to confirmation or clinician/dietitian review.

## Current report-family starter registry

The registry currently includes 41 starter report-family profiles: blood/hematology, iron, glucose, lipids, kidney/electrolytes, liver, vitamins, minerals, thyroid, hormones, urine/body fluids, infection/microbiology, immunology/inflammation, pathology/oncology, radiology/imaging, cardiac tests, pulmonary tests, bone/metabolic, pregnancy/maternal, genetic/molecular, allergy, neurology, coagulation, gastrointestinal/malabsorption, nutrition/anthropometry, symptom/headache/general clinical notes, eye/vision, dental/oral, respiratory function/sleep, stool/faecal diagnostics, endoscopy, rheumatology/autoimmune assessment, dermatology, audiology/ENT, blood-bank/transfusion compatibility, pediatric growth/development, surgical/postoperative assessment, vascular diagnostics, and general/unknown reports. The registry is expandable and is not a claim of universal coverage of every report format worldwide.

## Food and activity experience

- Food sources and individual food items only; no recipe or cooking instruction.
- “Other Options” first shows broad categories, then the specific food items within a category.
- The patient can mark a food as planned, eaten, or rejected and optionally enter portion grams.
- A small starter set shows approximate nutrient estimates for selected foods and portions. The Nutrition Calculator also supports optional online USDA FoodData Central search through a local Node.js proxy; only recognized nutrient names/units are mapped, and non-standard/branded serving bases are not auto-filled as per-100 g. These are not a complete food-composition database and require source-record verification before clinical use. Unknown values remain unknown rather than fabricated.
- Ability classes include bed-based, seated, walking, adapted gentle yoga, and restricted/no exercise. A user can choose an alternative or seek clinician/physiotherapist guidance.
- Daily wellness prompts can cover food-source options, water (unless fluid restricted), meal routines, sleep, movement and follow-ups. Browser notifications are not guaranteed while the app is closed.

## Food composition provenance

The starter numerical values are approximate generic-food estimates intended to demonstrate portion scaling. Online USDA FoodData Central lookup is an optional data retrieval feature, not a complete food-composition database or a clinical validation process. Each source label explicitly requires verification against a current authoritative food-composition record. Before production use, replace these starter values with records carrying provider, food ID, food state, edible portion, units, retrieval date, license and quality-review status. Do not use the starter subset for clinical decisions.

## Release limitations

Universal upload handling does not mean every document will be recognized or have a validated nutrition mapping. OCR errors, units, reference intervals, language, image quality and local naming differences can affect recognition. Clinical validity, a representative OCR benchmark, data licensing, security/privacy review and end-to-end device testing remain separate release gates.
