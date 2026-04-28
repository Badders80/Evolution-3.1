import type BetterSqlite3 from "better-sqlite3";
import Database from "better-sqlite3";
import { readFileSync } from "fs";
import { join } from "path";

const DB_PATH = process.env.DATABASE_URL?.replace("file:", "") || "./data/evolution.db";
const SCHEMA_PATH = join(process.cwd(), "src", "lib", "db", "schema.sql");

let db: BetterSqlite3 | null = null;

export function getDb(): BetterSqlite3 {
  if (db) return db;

  db = new Database(DB_PATH);
  db.pragma("journal_mode = WAL");
  db.pragma("foreign_keys = ON");

  // Run schema migrations
  const schema = readFileSync(SCHEMA_PATH, "utf-8");
  db.exec(schema);

  return db;
}

export function closeDb(): void {
  if (db) {
    db.close();
    db = null;
  }
}