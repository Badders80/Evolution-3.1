import { getDb } from "@/lib/db/connection";

export interface UserRow {
  id: string;
  email: string;
  name: string | null;
  image: string | null;
  role: "user" | "admin" | "kyc_reviewer";
  kyc_status: "none" | "pending" | "verified" | "rejected";
  kyc_verified_at: string | null;
  wallet_address: string | null;
  openfort_user_id: string | null;
  created_at: string;
  updated_at: string;
}

export function getUsers(): UserRow[] {
  const db = getDb();
  return db.prepare("SELECT * FROM users").all() as UserRow[];
}

export function getUserById(id: string): UserRow | null {
  const db = getDb();
  const row = db.prepare("SELECT * FROM users WHERE id = ?").get(id) as
    | UserRow
    | undefined;
  return row ?? null;
}

export function getUserByEmail(email: string): UserRow | null {
  const db = getDb();
  const row = db.prepare("SELECT * FROM users WHERE email = ?").get(email) as
    | UserRow
    | undefined;
  return row ?? null;
}

export function createUser(
  data: Omit<UserRow, "created_at" | "updated_at">,
): UserRow {
  const db = getDb();
  const stmt = db.prepare(`
    INSERT INTO users (id, email, name, image, role, kyc_status, kyc_verified_at, wallet_address, openfort_user_id, created_at, updated_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, datetime('now'), datetime('now'))
  `);
  stmt.run(
    data.id,
    data.email,
    data.name,
    data.image,
    data.role,
    data.kyc_status,
    data.kyc_verified_at,
    data.wallet_address,
    data.openfort_user_id,
  );
  return getUserById(data.id)!;
}

export function updateUserKyc(
  userId: string,
  status: UserRow["kyc_status"],
): void {
  const db = getDb();
  db.prepare(
    `
    UPDATE users SET kyc_status = ?, kyc_verified_at = ?, updated_at = datetime('now')
    WHERE id = ?
  `,
  ).run(
    status,
    status === "verified" ? new Date().toISOString() : null,
    userId,
  );
}

export function updateUserWallet(
  userId: string,
  walletAddress: string | null,
  openfortUserId: string | null,
): void {
  const db = getDb();
  db.prepare(
    `
    UPDATE users SET wallet_address = ?, openfort_user_id = ?, updated_at = datetime('now')
    WHERE id = ?
  `,
  ).run(walletAddress, openfortUserId, userId);
}
