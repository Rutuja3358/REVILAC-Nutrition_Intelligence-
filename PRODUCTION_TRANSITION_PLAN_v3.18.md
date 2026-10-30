# REVILAC — Production transition plan (v3.18)

## Honest status
This release is a development prototype. It is **not production-ready** and must use synthetic/demo data only. The current `account-server.js` uses a local JSON file for accounts and synced data. Passing local tests does not validate cloud security, medical/nutrition accuracy, or multi-device reliability.

## First staging milestone
1. Keep this ZIP as a local development artifact; do not publish the JSON-file account API to the internet.
2. Create an isolated staging environment with HTTPS, a managed PostgreSQL database, secret management, persistent storage where required, backups, and a rollback path.
3. Replace the prototype JSON account store with a reviewed database adapter and migrations. Define per-user ownership constraints, transactions, deletion/retention, audit events, and backup/restore tests before moving any data.
4. Implement verified email/mobile ownership, password recovery, MFA where appropriate, revocable sessions, CSRF protection for cookie sessions, shared rate limiting, security headers, dependency scanning, and abuse monitoring.
5. Run independent threat modelling and security/privacy review. Resolve findings before any real personal or health data is accepted.
6. Validate OCR against a curated, permissioned, de-identified report corpus; record field-level sensitivity/specificity and abstention rates. Every extracted result must remain visibly unverified until the person confirms it against the source.
7. Have qualified nutrition/clinical professionals validate food data, units, reference ranges, safety rules, and user-facing recommendations. Do not market the system as diagnosing or prescribing.
8. Test full journeys on actual Android, iOS, and desktop browsers, including sign-up, sign-in, report upload, export, account deletion, cross-device conflict handling, offline recovery, reminders, and push notifications while the app is closed.
9. Exercise restore from an independently stored backup; verify monitoring, alert routing, incident response, data export/deletion, and rollback.
10. Only after evidence is reviewed should a release owner change the production gate. Environment flags in the preflight are tracking indicators, not proof by themselves.

## Environment variables used by the read-only preflight
- `DATABASE_URL`: managed persistent database connection configured (never paste credentials into support chats).
- `REVILAC_HTTPS_TERMINATED=true`: trusted HTTPS termination has been verified.
- `REVILAC_VERIFICATION_PROVIDER`: configured email/SMS verification provider name.
- `REVILAC_RATE_LIMIT_PROVIDER`: configured shared rate-limit service name.
- `REVILAC_SESSION_SECRET`: >=32-character secret held in deployment secret manager.
- `REVILAC_SECURITY_REVIEW=passed`, `REVILAC_PRIVACY_REVIEW=passed`, `REVILAC_CLINICAL_REVIEW=passed`, `REVILAC_E2E_TESTS=passed`, `REVILAC_BACKUP_RESTORE=passed`, `REVILAC_MONITORING=configured`: tracking values only; each must be backed by actual documented evidence.

The current prototype server does not consume all these variables to become production-ready. Setting them does not harden the application or create missing services. The preflight intentionally reports blockers until evidence and architecture exist.

## Run the preflight locally
```bash
node production_preflight.js
```
Exit code `2` means production blockers remain. The report never prints secret values. It is read-only and does not migrate, upload, or modify user data.
