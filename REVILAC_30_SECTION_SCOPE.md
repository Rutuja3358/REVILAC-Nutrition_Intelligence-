# REVILAC Nutrition Intelligence — 30 pinned sections

Project scope only: **REVILAC Nutrition Intelligence**, separate from the older healthcare project. The role is nutrition guidance and general wellness support—not diagnosis, cure, or replacement for medical care.

1. Patient Intelligence Profile
2. Comprehensive Nutrition Engine
3. Personalized Requirement Engine
4. Patient-Controlled Food Intelligence
5. Dynamic Intake Calculator
6. Nutrient Gap Analysis
7. Nutrition Trend Intelligence
8. Evidence & Uncertainty Engine
9. Nutrition Report Reader
10. OCR Verification
11. Patient History & Timeline
12. Context Correlation
13. Allergy & Restriction Safety
14. Daily Wellness Tracker
15. Personalized Reminders
16. Progress & Feedback
17. Adaptive Guidance
18. Multilingual Interface
19. Voice & Picture Assistance
20. Accessible Interface
21. Age-Appropriate Safety
22. Privacy & Consent
23. Backup & Data Recovery
24. Multi-Device Support
25. Verified Nutrition Database
26. Reliable Calculations
27. Safety Escalation
28. Automated Testing
29. End-to-End Testing
30. Final Consolidated Package

## Report coverage approach

The expanded starter registry currently contains 41 starter report-family profiles for: blood/hematology; iron status; glucose; lipids/cardiovascular; kidney/electrolytes; liver; vitamins; minerals; thyroid/endocrine; reproductive hormones; urine/body fluids; microbiology/infection; immunology/serology/inflammation; pathology/histopathology/oncology; radiology/imaging; cardiology; pulmonary; bone/metabolic; pregnancy/maternal; genetic/molecular; allergy; neurology; coagulation; gastrointestinal/malabsorption; nutrition/anthropometry; general/other laboratory reports; symptom/headache/general clinical notes; eye/vision; dental/oral; respiratory function/sleep studies; stool/faecal diagnostics; endoscopy; rheumatology/autoimmune assessment; dermatology; audiology/ENT; blood bank/transfusion compatibility; pediatric growth/development; surgical/postoperative assessment; vascular diagnostics; and other specialized diagnostic families. Coverage is expandable, not exhaustive. This is expandable, not a claim that every report worldwide is recognized. Unknown or low-confidence reports must go to a review path, not guessed advice.

## Patient-controlled food and activity logic

- Food sources and specific items, not recipes. The patient chooses, rejects, or requests alternatives by category.
- Nutrient associations are qualitative unless food-composition data and portions support a numeric calculation. A small approximate starter subset demonstrates scaling and is not production-verified; optional USDA FoodData Central lookup can retrieve individual food records when online; unknown values stay unknown.
- Record selected food, optional amount, and whether planned/eaten/rejected.
- Daily food-source suggestions are optional examples and never override report-specific safety, allergies, restrictions, or patient preference.
- Activity options are ability classes: bed-based, seated, walking, gentle adapted yoga, or restricted/clinician review. Never assume an activity is safe for everyone; provide alternatives and allow “cannot do this.”
- Daily wellness may include hydration, sleep, movement, meal routines and follow-ups. Hydration reminders must respect prescribed fluid limits. Medication reminders only use patient/clinician-entered instructions.

## Safety and release status

This is a prototype. Do not claim that every report type, every nutrition mapping, background notification, security control, or clinical recommendation is production-validated. Medical report OCR can be wrong; extracted information must be checked against the original. Food and lifestyle support does not diagnose or treat the underlying condition. Urgent symptoms or high-risk findings require appropriate medical care.


For report-family routing, food-source selection, activity ability classes, numeric starter-data policy and coverage limits, see `REPORT_COVERAGE_AND_NUTRITION_ROUTING.md`.
