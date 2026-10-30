# REVILAC Nutrition Intelligence — v3.12 PWA Readiness Update

## Added
- PWA web manifest with standalone display configuration and app icon.
- Install-app button shown when the browser provides the install prompt.
- Service worker for the static app shell, with an explicit policy not to cache API routes or JSON files (including potential patient data).
- A small dependency-free Node.js local static server for users who do not have Python installed.
- Responsive viewport/mobile layout retained from the existing app.
- PWA package and local-server regression checks, wired into `RUN_TESTS.cmd`.

## Scope and limitations
- This improves installability on supported browsers and local app-shell caching. It does not create an online hosted service, secure account system, cloud sync, verified email/SMS OTP, or guaranteed background notifications.
- The service worker caches only the static app shell; localStorage data remains on that browser/device and is not synchronized across devices.
- Install prompts, offline behavior, and notifications vary by browser/OS and still require real-device tests.
- Do not use identifiable patient information in this prototype before privacy/security review.
