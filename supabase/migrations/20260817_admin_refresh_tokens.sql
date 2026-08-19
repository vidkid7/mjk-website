-- Stateful, rotating admin refresh-token store.
-- Only the server service-role client may access this table.
CREATE TABLE IF NOT EXISTS admin_refresh_tokens (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  family_id UUID NOT NULL,
  email TEXT NOT NULL,
  token_hash TEXT NOT NULL UNIQUE,
  expires_at TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  last_used_at TIMESTAMPTZ,
  revoked_at TIMESTAMPTZ,
  replaced_by_hash TEXT,
  user_agent TEXT,
  ip_address TEXT
);

CREATE INDEX IF NOT EXISTS admin_refresh_tokens_family_idx
  ON admin_refresh_tokens (family_id);

CREATE INDEX IF NOT EXISTS admin_refresh_tokens_expiry_idx
  ON admin_refresh_tokens (expires_at)
  WHERE revoked_at IS NULL;

ALTER TABLE admin_refresh_tokens ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON TABLE admin_refresh_tokens FROM anon, authenticated;
