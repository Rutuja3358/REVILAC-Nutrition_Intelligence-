# REVILAC Nutrition Intelligence — v3.22 Vision & Product Depth

## Changes in this build
- Added a dedicated **Vision & About** page reachable from the main navigation.
- Clarified the product vision, intended users and use, and the four-stage capture → check → explain → review workflow.
- Added explicit capability boundaries so prototype functions are not confused with clinical diagnosis, prescribed diets, complete medical terminology coverage, guaranteed OCR, encrypted local storage, or production cloud sync.
- Documented design principles: evidence before confidence, human review for high-risk contexts, understandable UX, privacy/user control, honest interoperability, and free-first behavior.
- Added a visible readiness gate describing the remaining production prerequisites.
- Kept the existing page IDs, app data model, and working modules intact; no duplicate static IDs introduced.

## Verification performed for v3.22
- `python deep_quality_audit.py`: 23/23 static checks passed.
- `python test_package.py`: structural checks passed.
- `node --check` for nutrition-core.js, local-server.js, account-server.js and terminology-server.js: passed.
- 24 existing JavaScript test/audit scripts: all passed.
- `node test_production_preflight.js`: 13/13 preflight-test assertions passed.
- ZIP integrity and release file inventory checked after packaging.

## Honest limits
These checks do not prove full browser/device behavior, OCR accuracy on real-world reports, clinical validity, formal accessibility, penetration/security safety, privacy/legal compliance, or successful cloud deployment. `production_preflight.js` must still block a production release until real configuration and evidence exist. Use synthetic/demo data only.
