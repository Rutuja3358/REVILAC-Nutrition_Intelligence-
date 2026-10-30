# REVILAC v3.36 production-candidate deployment guide

This guide prepares a deployment; it does not certify the service. Do not use identifiable patient data until clinical, security, privacy, and operational gates are approved.

## 1. Requirements
- A domain you control with DNS pointing to the deployment host.
- A Linux host with Docker Engine and Docker Compose plugin.
- SMTP provider account with authenticated sending and a verified sender.
- Long random secrets stored only on the host's `.env.production` file or a managed secret store.
- An approved privacy/security plan and a qualified clinical reviewer before handling health information.

## 2. Configure
1. Copy `.env.production.example` to `.env.production` and `.env.app.production.example` to `.env.app.production` on the server. Do not commit or share either real file.
2. In `.env.production`, set `DOMAIN`, `ACME_EMAIL`, and a long random URL-safe `POSTGRES_PASSWORD`. In `.env.app.production`, set `APP_ORIGIN=https://your-domain`, `REVILAC_SESSION_SECRET` (at least 64 random characters), and SMTP values.
3. Confirm inbound TCP ports 80 and 443 are reachable for Caddy certificate issuance. Do not expose the database port publicly.
4. Review `docker-compose.production.yml`, `Caddyfile`, database retention and backup policy with the deployment owner.

## 3. Start
Run on the host:
```sh
docker compose --env-file .env.production -f docker-compose.production.yml up --build -d
```
The app container applies `migrations/001_initial.sql` at startup and exits if PostgreSQL or SMTP verification fails. The database is private to the Docker network; Caddy terminates HTTPS.

## 4. Verify before use
- `https://your-domain/api/health` returns a healthy database status; it still explicitly reports `productionReady:false` because this app is not clinically certified.
- Test email verification request/confirmation with a test mailbox.
- Test register, login, upload/download sync, password change, logout and account deletion with synthetic data.
- Test invalid OTPs, expired OTPs, throttling, oversized payloads, cross-origin requests and session expiration.
- Run `npm test`, `npm run test:syntax`, and `npm run preflight` from the release package. Preflight must remain blocked until actual evidence is recorded.
- Use an external TLS scanner and independent security review; inspect CSP and browser console on the deployed origin.

## 5. Backup/restore
`ops/backup-postgres.sh` creates a PostgreSQL custom-format dump. Encrypt it and transfer it to independent off-host storage using an approved mechanism. A local dump alone is not a backup strategy. Perform `ops/restore-postgres.sh` only against a separately approved restore target, validate row counts and app workflows, and document the evidence. Never run restore against production without an approved change/rollback plan.

## 6. Required before real patient data
Refactor the current inline-heavy UI to remove the CSP `unsafe-inline` exception before final security sign-off. Complete and independently review the release-evidence records listed in `release-evidence/README.md`; complete privacy/legal and clinical reviews; test retention/deletion and incident response; validate nutrition-data licensing and OCR performance; and run cross-device end-to-end tests. Do not fabricate evidence files or flip flags to force a green gate.
