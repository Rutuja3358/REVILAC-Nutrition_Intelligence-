BEGIN;
CREATE TABLE IF NOT EXISTS app_users (
  id UUID PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  salt TEXT NOT NULL,
  password_hash TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  consent_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  consent_version TEXT NOT NULL DEFAULT 'v1'
);
CREATE TABLE IF NOT EXISTS app_sessions (
  token_hash TEXT PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES app_users(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  expires_at TIMESTAMPTZ NOT NULL
);
CREATE INDEX IF NOT EXISTS app_sessions_user_id_idx ON app_sessions(user_id);
CREATE INDEX IF NOT EXISTS app_sessions_expires_at_idx ON app_sessions(expires_at);
CREATE TABLE IF NOT EXISTS app_user_data (
  user_id UUID PRIMARY KEY REFERENCES app_users(id) ON DELETE CASCADE,
  payload JSONB NOT NULL DEFAULT '{"reports":[],"reminders":[],"profile":{},"prefs":{},"wellness":{},"wellnessCheckins":{},"nutritionContext":{}}'::jsonb,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE TABLE IF NOT EXISTS email_verification_challenges (
  id UUID PRIMARY KEY,
  email TEXT NOT NULL,
  purpose TEXT NOT NULL DEFAULT 'verify' CHECK (purpose IN ('verify','reset')),
  otp_hash TEXT NOT NULL,
  attempts INTEGER NOT NULL DEFAULT 0,
  verified_at TIMESTAMPTZ,
  expires_at TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS email_verification_email_created_idx ON email_verification_challenges(email, created_at DESC);
CREATE TABLE IF NOT EXISTS request_rate_limits (
  bucket_key TEXT PRIMARY KEY,
  window_started_at TIMESTAMPTZ NOT NULL,
  request_count INTEGER NOT NULL,
  expires_at TIMESTAMPTZ NOT NULL
);
CREATE INDEX IF NOT EXISTS request_rate_limits_expiry_idx ON request_rate_limits(expires_at);
CREATE TABLE IF NOT EXISTS schema_migrations (
  version TEXT PRIMARY KEY,
  applied_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
INSERT INTO schema_migrations(version) VALUES ('001_initial') ON CONFLICT DO NOTHING;
COMMIT;
