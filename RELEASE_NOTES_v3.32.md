# REVILAC Nutrition Intelligence v3.32 — Security hardening and regression pass

## Changes
- Authentication throttling uses a shared local IP bucket across register/login and ignores query strings. This is prototype throttling only; production needs a shared provider.
- The JSON-backed account prototype refuses non-loopback binds.
- Local account storage directory permissions are restricted where supported.
- Local app responses include `X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`, and a same-origin microphone permissions policy.
- Added tests for authentication rate-limit bypass attempts, public bind refusal, and response security headers.

## Local verification
- 37/37 JavaScript test scripts passed.
- 8/8 JavaScript syntax checks passed.
- 6/6 inline JavaScript blocks passed syntax checking.
- 27/27 structural/quality checks passed.
- 6/6 local HTTP smoke checks passed.
- Production preflight: 18 checks, 7 passed, 11 blockers.

## Release status
Development/staging only. This does not establish production readiness, clinical validity, full report coverage, real-world OCR accuracy, live API availability, or real-device end-to-end behavior. Do not use real patient data.
