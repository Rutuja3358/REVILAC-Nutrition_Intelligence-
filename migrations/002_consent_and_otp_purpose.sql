BEGIN;
ALTER TABLE app_users ADD COLUMN IF NOT EXISTS consent_at TIMESTAMPTZ NOT NULL DEFAULT now();
ALTER TABLE app_users ADD COLUMN IF NOT EXISTS consent_version TEXT NOT NULL DEFAULT 'v1';
ALTER TABLE email_verification_challenges ADD COLUMN IF NOT EXISTS purpose TEXT NOT NULL DEFAULT 'verify' CHECK (purpose IN ('verify','reset'));
CREATE INDEX IF NOT EXISTS email_verification_purpose_expiry_idx ON email_verification_challenges(purpose, expires_at);
INSERT INTO schema_migrations(version) VALUES ('002_consent_and_otp_purpose') ON CONFLICT DO NOTHING;
COMMIT;
