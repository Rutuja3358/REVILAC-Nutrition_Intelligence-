# REVILAC Nutrition Intelligence — consolidated patient wellness update

## Included in this package
- Retains the existing v3.24 application and its files; this is an additive update, not a rebuild.
- Adds a patient-facing Daily Wellness companion: food-choice alternatives, nutrient-category classification, simple daily habit checklist, optional read-aloud and browser speech input where supported, language selector, and local-device progress.
- Food choices can be rotated and selected by the patient; classification describes possible nutrient categories rather than inventing nutrient quantities.
- Browser notification permission flow is included with honest limits; dependable background scheduling is not claimed.

## Important status
This is a staging/prototype package, not a clinically validated or production-ready medical product. The new companion stores its checklist in browser localStorage, which is not encrypted by this module and is not synced across devices. Use synthetic/demo data only until security review and a secure backend are in place.
Nutrition quantities and personalized targets are not calculated by this added UI. A validated food-composition database, serving sizes, reviewed age/condition-specific targets, allergy/clinical restriction checks, and qualified nutrition/clinical review are required before patient-specific recommendations. Voice functions depend on browser/device/language support. Background notifications are not guaranteed.
Before deployment, run the included test suite and manual browser/mobile checks; this build does not claim all tests or clinical validation have passed.
