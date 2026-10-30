# Browser smoke test status — v2.9 QA bundle

A browser smoke-test harness (`browser_smoke_test.html`) is included. It attempts to load the app in an iframe, run the built-in workbench tests, verify that a selected safety flag blocks meal-plan generation, verify the no-risk sample plan path, and check that JSON export control exists.

## Status
- Harness file and test assertions: ADDED.
- Headless Chromium execution in the build environment: NOT CONFIRMED. The browser process exceeded the execution time limit, so this is not recorded as a pass or fail for app behaviour.
- Static audit, package structural checks, Node syntax, and local terminology smoke tests: see `DEEP_QUALITY_AUDIT_REPORT.md`.

## Run manually on Windows
1. Start the local app with `START_LOCAL_SERVER.cmd`.
2. Open `browser_smoke_test.html` through the same local server (not directly from a downloaded file if browser restrictions interfere).
3. Review the JSON results shown at the top of the page.
4. If the iframe does not load, run the app and test harness from the same localhost origin and port.

A browser harness is not clinical validation, a security audit, OCR accuracy evidence, or a substitute for testing on Android Chrome.

## Follow-up targeted interaction test — 2026-10-21
- The Chromium executable was available, but browser navigation to `file://` and `127.0.0.1` was blocked by the environment.
- As a limited workaround, the app HTML was loaded into an in-memory Chromium page and `nutrition-core.js` was injected. The built-in workbench checks ran 6/6 PASS after fixing a stale expected message. Safety-flag hold, free-text exclusion hold, and no-risk sample rendering all behaved as expected; zero page errors were observed.
- This does not replace the full iframe harness or test upload/OCR/terminology server flows in a normal browser session.
