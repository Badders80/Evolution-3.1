-- Evolution Platform v3.2 SQLite Schema

PRAGMA foreign_keys = ON;
PRAGMA journal_mode = WAL;

-- Users table with RBAC
CREATE TABLE IF NOT EXISTS users (
  id            TEXT PRIMARY KEY,
  email         TEXT UNIQUE NOT NULL,
  name          TEXT,
  image         TEXT,
  role          TEXT DEFAULT 'user' CHECK (role IN ('user', 'admin', 'kyc_reviewer')),
  kyc_status    TEXT DEFAULT 'none' CHECK (kyc_status IN ('none', 'pending', 'verified', 'rejected')),
  kyc_verified_at TEXT,
  wallet_address TEXT,
  openfort_user_id TEXT,
  created_at    TEXT DEFAULT (datetime('now')),
  updated_at    TEXT DEFAULT (datetime('now'))
);

-- Listings table (JSON blob for flexibility per Game Plan)
CREATE TABLE IF NOT EXISTS listings (
  id            TEXT PRIMARY KEY,
  slug          TEXT UNIQUE NOT NULL,
  title         TEXT NOT NULL,
  publish_status TEXT DEFAULT 'draft' CHECK (publish_status IN ('draft', 'ready_to_publish', 'live', 'closed')),
  hero_image_src TEXT,
  images_json   TEXT, -- JSON array of image paths
  summary       TEXT,
  overview      TEXT,
  horse_json    TEXT, -- JSON blob for horse details
  trainer_json  TEXT, -- JSON blob for trainer details
  owner_json    TEXT, -- JSON blob for owner details
  offering_json TEXT, -- JSON blob for offering details
  application_json TEXT, -- JSON blob for application config
  disclaimers_json TEXT, -- JSON array
  documents_json   TEXT, -- JSON array of OfficialDocument
  token_contract_address TEXT, -- Forward-compatible: Base ERC-20 address (v1)
  ssot_source_path TEXT,
  ssot_updated_at  TEXT,
  created_at    TEXT DEFAULT (datetime('now')),
  updated_at    TEXT DEFAULT (datetime('now'))
);

-- Holdings / portfolio tracking
CREATE TABLE IF NOT EXISTS holdings (
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
  document_acknowledgements TEXT, -- Forward-compatible: JSON array of acknowledged doc IDs (v0)
  created_at    TEXT DEFAULT (datetime('now')),
  updated_at    TEXT DEFAULT (datetime('now'))
);

-- KYC sessions
CREATE TABLE IF NOT EXISTS kyc_sessions (
  id            TEXT PRIMARY KEY,
  user_id       TEXT NOT NULL REFERENCES users(id),
  provider      TEXT DEFAULT 'didit',
  provider_session_id TEXT,
  status        TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'in_progress', 'completed', 'failed', 'rejected')),
  result_json   TEXT,
  reviewed_by   TEXT REFERENCES users(id),
  reviewed_at   TEXT,
  created_at    TEXT DEFAULT (datetime('now')),
  updated_at    TEXT DEFAULT (datetime('now'))
);

-- SSOT sync log
CREATE TABLE IF NOT EXISTS ssot_sync_log (
  id            INTEGER PRIMARY KEY AUTOINCREMENT,
  sync_type     TEXT, -- 'auto' | 'manual' | 'webhook'
  source_path   TEXT,
  listings_count INTEGER,
  status        TEXT,
  error_message TEXT,
  created_at    TEXT DEFAULT (datetime('now'))
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_listings_status ON listings(publish_status);
CREATE INDEX IF NOT EXISTS idx_listings_slug ON listings(slug);
CREATE INDEX IF NOT EXISTS idx_holdings_user ON holdings(user_id);
CREATE INDEX IF NOT EXISTS idx_holdings_status ON holdings(status);
CREATE INDEX IF NOT EXISTS idx_kyc_user ON kyc_sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_kyc_status ON kyc_sessions(status);