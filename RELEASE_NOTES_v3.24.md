# REVILAC Nutrition Intelligence — v3.24 Language & Patient Usability

## Added
- Quick Food Alternatives now localizes food names and the practical explanation in Marathi and Hindi, not only the surrounding headings.
- English remains the fallback for any option without a reviewed translation.
- Retains conservative safety hold when allergy or prescribed restriction text is entered; the feature does not claim allergy clearance.
- No fabricated nutrient amounts, calories, portion prescriptions or clinical claims were added.

## Verification
- Re-ran the package's 24 existing JavaScript test scripts.
- Added dedicated localization checks for Marathi/Hindi option coverage and output escaping.
- Ran the static quality audit.

## Limitations
- Translations are practical starter wording and should be reviewed by native speakers. Food examples are not a complete food database or a personalized therapeutic diet.
- Browser-level, real-device, clinical, security and production validation remain separate gates.
