# REVILAC Nutrition Intelligence v3.38.8 — UI layout refresh

## What changed
- Reorganized the 13 existing navigation destinations into six primary workspace actions and a **More tools** group. No feature page was removed.
- Applied a consistent emerald-green and mint healthcare visual layer to the existing app, with responsive navigation and improved mobile menu behavior.
- Added a visible reminder to use synthetic reports and manually review extracted values.
- Added the missing, credential-free `.env.example` template required by the existing FoodData Central configuration test and setup guide. It contains blank placeholders only.
- Bumped the app-shell cache and package version to 3.38.8 so the UI refresh is not hidden behind the previous service-worker cache.
- Added a navigation-layout regression test.

## Verification performed in this environment
- `npm test`: 47/47 scripts pass after changes.
- `npm run test:syntax`: 60/60 root JavaScript files pass.
- `npm run build:pages`: allowlisted static PWA build succeeds.
- `python3 test_http_smoke.py`: 6/6 HTTP smoke checks pass.

## Not claimed / still required
- A real browser screenshot / full click-through E2E could not be completed in this environment.
- No real Android-device test, OCR accuracy benchmark, clinical/nutrition validation, independent security/privacy review, or production deployment evidence was added.
- Production preflight remains blocked. Use synthetic/demo reports only; this is not ready for clinical use.
