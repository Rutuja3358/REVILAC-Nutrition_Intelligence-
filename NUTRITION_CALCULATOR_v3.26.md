# REVILAC v3.26 — Integrated Nutrition Calculator

This additive module is integrated into index.html; the prior application modules were retained. Open the app and tap **Nutrition Calculator**.

## What it does
- Accepts food name, amount in grams, source/label metadata, source URL, and numeric nutrient values per 100 g.
- Computes each entered nutrient for the chosen amount and sums across foods entered today.
- Displays data coverage per nutrient so missing values are not silently treated as zero.
- Lets users remove a food to model a swap; totals recompute. Exports a CSV.
- Saves entries in this browser/device's localStorage for the current day.
- Includes validation for amounts, numeric values, and source URL protocol.

## Important limitations
- No nutrient composition numbers are bundled or fabricated. Users must enter values from a trusted food-composition source or food label. Source provenance and review status are user-declared, not independently authenticated.
- Values are normalized per 100 g edible portion; users must ensure the source's portion/preparation basis matches the food entered. Household measures are not automatically converted to grams.
- This does not set individualized daily targets, calculate a medically valid remaining requirement, establish food equivalence, diagnose disease, or prescribe diets.
- Local browser storage is not cloud sync or a secure clinical record. Clear/export data appropriately on shared devices.
- Browser/device and clinical validation are still required before production use.
