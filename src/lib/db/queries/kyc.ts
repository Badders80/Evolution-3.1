import { getDb } from "@/lib/db/connection";

export interface KycSessionRow {
  id: string;
  user_id: string;
  provider: string;
  provider_session_id: string | null;
  status: "pending" | "in_progress" | "completed" | "failed" | "rejected";
  result_json: string | null;
  reviewed_by: string | null;
  reviewed_at: string | null;
  created_at: string;
  updated_at: string;
}

export function getKycSessionByProviderId(
  providerSessionId: string,
): KycSessionRow | null {
  const db = getDb();
  const row = db
    .prepare("SELECT * FROM kyc_sessions WHERE provider_session_id = ?")
    .get(providerSessionId) as KycSessionRow | undefined;
  return row ?? null;
}

export function getKycSessionsByUser(userId: string): KycSessionRow[] {
  const db = getDb();
  return db
    .prepare(
      "SELECT * FROM kyc_sessions WHERE user_id = ? ORDER BY created_at DESC",
    )
    .all(userId) as KycSessionRow[];
}

export function createKycSession(
  data: Omit<KycSessionRow, "created_at" | "updated_at">,
): KycSessionRow {
  const db = getDb();
  const stmt = db.prepare(`
    INSERT INTO kyc_sessions (id, user_id, provider, provider_session_id, status, result_json, reviewed_by, reviewed_at, created_at, updated_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, datetime('now'), datetime('now'))
  `);
  stmt.run(
    data.id,
    data.user_id,
    data.provider,
    data.provider_session_id,
    data.status,
    data.result_json,
    data.reviewed_by,
    data.reviewed_at,
  );
  return getKycSessionById(data.id)!;
}

export function getKycSessionById(id: string): KycSessionRow | null {
  const db = getDb();
  const row = db.prepare("SELECT * FROM kyc_sessions WHERE id = ?").get(id) as
    | KycSessionRow
    | undefined;
  return row ?? null;
}

export function updateKycSessionStatus(
  id: string,
  status: KycSessionRow["status"],
  resultJson?: string | null,
): void {
  const db = getDb();
  const fields = ["status = ?", "updated_at = datetime('now')"];
  const values: (string | null)[] = [status];

  if (resultJson !== undefined) {
    fields.push("result_json = ?");
    values.push(resultJson);
  }

  values.push(id);

  const stmt = db.prepare(`
    UPDATE kyc_sessions SET ${fields.join(", ")} WHERE id = ?
  `);
  stmt.run(...values);
}
