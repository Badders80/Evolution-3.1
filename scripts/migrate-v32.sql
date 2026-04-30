-- Migration: v3.2 schema updates for existing databases
-- Run: sqlite3 data/evolution.db < scripts/migrate-v32.sql

-- 1. Add openfort_user_id to users (if missing)
-- SQLite doesn't support ADD COLUMN IF NOT EXISTS, so we use a workaround:
-- Check if column exists by attempting a harmless query and catching the error via .import
-- Manual step: if the column already exists, this will fail harmlessly.
-- To be safe, run interactively:
--   sqlite3 data/evolution.db "ALTER TABLE users ADD COLUMN openfort_user_id TEXT;"

-- 2. Drop and recreate holdings table to add kyc_required status
-- WARNING: this will lose existing holdings data. For production, use a multi-step migration:
--   a. Create new table with updated CHECK constraint
--   b. Copy data
--   c. Drop old table
--   d. Rename new table

-- SAFE MIGRATION for holdings:
CREATE TABLE IF NOT EXISTS holdings_v32 (
  id            TEXT PRIMARY KEY,
  user_id       TEXT NOT NULL REFERENCES users(id),
  listing_id    TEXT NOT NULL REFERENCES listings(id),
  listing_slug  TEXT NOT NULL,
  horse_name    TEXT,
  tokens_owned  INTEGER DEFAULT 0,
  percent_owned REAL DEFAULT 0,
  status        TEXT DEFAULT 'reserved' CHECK (status IN ('reserved', 'paid', 'minted', 'transferred', 'burned', 'kyc_required')),
  stripe_session_id TEXT,
  stripe_payment_intent_id TEXT,
  tx_hash       TEXT,
  minted_at     TEXT,
  document_acknowledgements TEXT,
  created_at    TEXT DEFAULT (datetime('now')),
  updated_at    TEXT DEFAULT (datetime('now'))
);

-- Copy existing data (only if old table exists)
INSERT OR IGNORE INTO holdings_v32
  SELECT *, NULL AS document_acknowledgements
  FROM holdings
  WHERE 1=1;

-- Uncomment these lines when ready to cut over:
-- DROP TABLE holdings;
-- ALTER TABLE holdings_v32 RENAME TO holdings;

-- 3. Recreate indexes
CREATE INDEX IF NOT EXISTS idx_holdings_user ON holdings(user_id);
CREATE INDEX IF NOT EXISTS idx_holdings_status ON holdings(status);