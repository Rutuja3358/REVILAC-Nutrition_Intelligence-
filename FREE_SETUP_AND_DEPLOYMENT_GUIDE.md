# REVILAC — Free setup and deployment guide (v3.16)

This guide prioritizes no-cost options and states their limits honestly.

## 1. Free local use (recommended first)

1. Install Node.js 18 or newer on Windows.
2. Extract this ZIP to a normal writable folder.
3. Run `START_LOCAL_SERVER.cmd` for the main app, or `START_ACCOUNT_SERVER.cmd` to test the prototype account API.
4. Open `http://127.0.0.1:8000` in the same computer's browser.
5. Use only synthetic/demo data. The account API writes account data to a local JSON file and does not provide production-grade protection.

Do not run both servers on port 8000 at the same time. Stop the first terminal with Ctrl+C before starting the other. The app server and account server are separate entry points.

## 2. Free installable PWA

The app includes a web manifest and service worker. For installation, browsers generally require HTTPS or localhost. On the same computer, use `127.0.0.1`. For a hosted site, use an HTTPS host and test installation separately in each browser/OS.

Offline caching is limited to the app shell. It does not guarantee that OCR libraries, external terminology APIs, account APIs, or remote sync work offline. The service worker intentionally does not cache API responses or JSON data.

## 3. Same Wi-Fi / multiple-device demo

The current account server binds to `127.0.0.1`, so other devices cannot reach it by default. The local prototype now includes password change and password-confirmed account deletion, but this does not make it production-ready. Do not expose the prototype server to a Wi-Fi network or the internet just to make sync work: it has no HTTPS, email/mobile verification, password reset, managed database, production rate limiting, or independent security review. A LAN-accessible demo would need deliberate host/firewall configuration and must still use synthetic data only. This package does not turn the local server into a secure cloud service.

## 4. Hosting for free

A free hosting tier may be available from third-party providers, but availability, sleep limits, storage persistence, database availability, and terms change. Before choosing one, verify that it supports Node.js, HTTPS, persistent database/storage, environment variables, backups, and the provider's current free-tier policy. Many free app hosts have ephemeral filesystems or sleeping services; those are not suitable for storing patient data in this prototype. Do not deploy the current JSON-file account store publicly.

## 5. Free integrations and paid/credentialed dependencies

- Included local terminology starter catalogue: free and offline, but incomplete and not an official code set.
- Wellness planner and browser-only reminders: no API fee, but notifications are only best-effort while the page is open; background delivery is not guaranteed.
- OCR helper libraries are loaded from CDNs in the current app and therefore need internet when not cached.
- Email/SMS OTP, reliable push delivery, managed cloud sync, official terminology APIs, and clinical-grade nutrient data may require provider accounts, credentials, usage limits, licensing, or paid tiers. Do not assume they are free or fully configured.

## 6. Data safety

- Use synthetic data only until a privacy/security review and suitable production architecture are completed.
- Export a local backup before any sync upload/download because each action can replace data.
- Do not put secrets/API keys in `index.html`, screenshots, or a public repository.
- Clinical decisions, diagnosis, treatment, prescribed diets, fluid targets, and exercise restrictions must not be delegated to this prototype.

## 7. What v3.15 specifically fixes

The real app data object includes `nutritionContext`. Earlier account sync validation rejected that field, which could cause a full browser-data upload to fail. The account API now accepts and validates that object, and the API integration test confirms it round-trips. This is a local prototype test, not proof of production multi-device sync.

## 7. v3.16 account lifecycle additions
The local prototype supports password change and password-confirmed account deletion. It still does not verify email/mobile ownership or provide account recovery/MFA. This is not a security approval for real patient data or public deployment.
