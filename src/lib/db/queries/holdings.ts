import { getDb } from "@/lib/db/connection";

export interface HoldingRow {
  id: string;
  user_id: string;
  listing_id: string;
  listing_slug: string;
  horse_name: string | null;
  tokens_owned: number;
  percent_owned: number;
  status: "reserved" | "paid" | "minted" | "transferred" | "burned";
  stripe_session_id: string | null;
  stripe_payment_intent_id: string | null;
  tx_hash: string | null;
  minted_at: string | null;
  created_at: string;
  updated_at: string;
}

export function getHoldingsByUser(userId: string): HoldingRow[] {
  const db = getDb();
  const stmt = db.prepare(`
    SELECT * FROM holdings
    WHERE user_id = ?
    ORDER BY updated_at DESC
  `);
  return stmt.all(userId) as HoldingRow[];
}

export function getHoldingById(id: string): HoldingRow | null {
  const db = getDb();
  const stmt = db.prepare("SELECT * FROM holdings WHERE id = ?");
  const row = stmt.get(id) as HoldingRow | undefined;
  return row ?? null;
}

export function createHolding(data: Omit<HoldingRow, "created_at" | "updated_at">): void {
  const db = getDb();
  const stmt = db.prepare(`
    INSERT INTO holdings (
      id, user_id, listing_id, listing_slug, horse_name,
      tokens_owned, percent_owned, status,
      stripe_session_id, stripe_payment_intent_id,
      tx_hash, minted_at, created_at, updated_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, datetime('now'), datetime('now'))
  `);
  stmt.run(
    data.id,
    data.user_id,
    data.listing_id,
    data.listing_slug,
    data.horse_name,
    data.tokens_owned,
    data.percent_owned,
    data.status,
    data.stripe_session_id,
    data.stripe_payment_intent_id,
    data.tx_hash,
    data.minted_at
  );
}

export function updateHoldingStatus(
  id: string,
  status: HoldingRow["status"],
  updates?: Partial<Pick<HoldingRow, "tx_hash" | "minted_at">>
): void {
  const db = getDb();
  const fields = ["status = ?"];
  const values: (string | null)[] = [status];

  if (updates?.tx_hash !== undefined) {
    fields.push("tx_hash = ?");
    values.push(updates.tx_hash);
  }
  if (updates?.minted_at !== undefined) {
    fields.push("minted_at = ?");
    values.push(updates.minted_at);
  }

  values.push(id);

  const stmt = db.prepare(`
    UPDATE holdings
    SET ${fields.join(", ")}, updated_at = datetime('now')
    WHERE id = ?
  `);
  stmt.run(...values);
}

export function deleteHolding(id: string): void {
  const db = getDb();
  const stmt = db.prepare("DELETE FROM holdings WHERE id = ?");
  stmt.run(id);
}