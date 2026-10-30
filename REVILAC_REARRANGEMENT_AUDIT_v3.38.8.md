# REVILAC Nutrition Intelligence — rearrangement audit v3.38.8

## Decision summary
Preserve the existing project and its report/nutrition logic. Reorganize navigation and visual hierarchy first; do not rebuild the app or delete existing modules based on appearance alone.

## Keep — these support the defined product theme
- Report upload, best-effort text/OCR extraction, ambiguous-value review and explicit confirmation before saving.
- Universal report-family routing with unknown/mixed-report safe fallback.
- Nutrient-source mapping, patient-controlled food choices/swaps and intake records.
- Safety holds for higher-risk contexts, allergy/restriction notes and uncertain report data.
- Patient timeline, wellness check-ins, reminders, local export/restore and terminology/workbench tools.
- Demo/clinical-use warnings and the local-first PWA shell.

## Rearranged in this release
- Six primary navigation actions: Home, Add report, Nutrition guidance, Nutrition intelligence, My daily plan and Report timeline.
- Secondary tools are still available under More tools: Follow-ups, Profile & data, Clinical intelligence, Terminology services, Eight-pillar workbench, Account & sync, Vision & About.
- Applied emerald-green/mint styling and responsive menu treatment.
- Added the missing blank `.env.example` configuration template and updated app/package version to 3.38.8.

## Improve next — not claimed complete
1. Run full browser interaction tests on desktop and a real Android phone: navigation, report upload, OCR, verify/edit, save, reopen timeline, food choices, intake totals, export and backup/restore.
2. Build a labelled synthetic report corpus and measure OCR field precision/recall across layout, resolution, rotation, decimals, units and supported languages.
3. Validate food/nutrient records and requirement calculations against licensed/authoritative data; keep unknown values blank, never silently zero.
4. Complete qualified dietitian/clinician review of rules and patient-facing wording.
5. Complete privacy/security review and production backend evidence before any real identifiable patient data or public accounts.
6. Improve accessibility and Marathi/Hindi coverage with native-speaker and low-literacy usability tests.

## Do not add / do not claim
- Do not turn the product into a recipe or meal-planning app; the scope is patient-controlled food-source and nutrition guidance, not prescriptive dishes.
- Do not claim that every report, every food or every nutrient worldwide is covered. The routing and food catalogue are finite.
- Do not treat report keyword match percentages as disease severity, urgency, or a probability.
- Do not infer a nutrient deficiency from one abnormal lab value alone.
- Do not label prototype account sync as secure production cloud sync. Static hosting does not supply a backend.
- Do not call this clinically validated or production-ready.

## Candidate cleanup for a later release (not deleted now)
The app has a large single `index.html` with several inline scripts and overlapping user-facing workspaces (Nutrition guidance, Nutrition intelligence, Clinical intelligence and Eight-pillar workbench). These should be mapped to their actual functions and dependencies before any code consolidation. Avoid deleting them until regression and end-to-end tests prove the replacement. Historical release logs can remain in the developer package, but should not be presented as patient-facing app content.

## Verification for v3.38.8
- `npm test`: 47/47 test scripts passed.
- `npm run test:syntax`: 60/60 root JavaScript files passed.
- `npm run build:pages`: passed; 11 allowlisted static PWA files generated.
- `python3 test_http_smoke.py`: 6/6 checks passed.
- `npm run preflight`: still not production-ready; 7/22 checks pass and 15 blockers remain.
- Chromium headless attempt timed out; full browser click-through and real-device testing remain unverified.


## Patient-facing UI cleanup follow-up
- Removed the dashboard's always-visible online/offline implementation panel and tutorial-style “Start here” cards.
- Replaced workflow-stage labels with a patient-oriented nutrition overview and removed the dashboard-only demo-safety sidebar callout.
- Retained a concise health-and-safety notice; clinical cautions are not removed merely to make the app appear production-ready.
- Account/sync implementation and OCR behavior are not upgraded by these visual changes. The existing readiness blockers above remain in force.

- UI asset cache revision advanced to `v3.38.9-patient-ui` so updated dashboard markup is refreshed by the service worker.
