import { watch } from "fs";
import { readFile } from "fs/promises";
import { join } from "path";
import type { SSOTPayload } from "./types";
import { transformSSOTToListing } from "./transformer";
import { upsertListing } from "@/lib/db/queries/listings";
import { getDb } from "@/lib/db/connection";

const SSOT_WATCH_PATH = process.env.SSOT_BUILD_PATH || "/home/evo/workspace/projects/SSOT_Build/dist/marketplace.json";

let watcher: ReturnType<typeof watch> | null = null;

export function startSSOTWatcher(): void {
  if (watcher) return;

  console.log(`[SSOT] Starting watcher on: ${SSOT_WATCH_PATH}`);

  watcher = watch(SSOT_WATCH_PATH, async (eventType) => {
    if (eventType === "change") {
      console.log("[SSOT] Detected change, triggering sync...");
      await runSync();
    }
  });

  // Initial sync
  void runSync();
}

export function stopSSOTWatcher(): void {
  if (watcher) {
    watcher.close();
    watcher = null;
  }
}

export async function runSync(): Promise<{ upserted: number; errors: number }> {
  const results = { upserted: 0, errors: 0 };

  try {
    const raw = await readFile(SSOT_WATCH_PATH, "utf-8");
    const payload: SSOTPayload = JSON.parse(raw);

    for (const ssotListing of payload.listings) {
      try {
        const listing = transformSSOTToListing(ssotListing);
        upsertListing(listing);
        results.upserted++;
      } catch (err) {
        console.error(`[SSOT] Failed to transform/upsert listing ${ssotListing.id}:`, err);
        results.errors++;
      }
    }

    // Log sync
    const db = getDb();
    db.prepare(`
      INSERT INTO ssot_sync_log (sync_type, source_path, listings_count, status)
      VALUES (?, ?, ?, ?)
    `).run("auto", SSOT_WATCH_PATH, results.upserted, results.errors > 0 ? "partial_error" : "success");

    console.log(`[SSOT] Sync complete: ${results.upserted} upserted, ${results.errors} errors`);
  } catch (err) {
    console.error("[SSOT] Sync failed:", err);
    results.errors++;

    const db = getDb();
    db.prepare(`
      INSERT INTO ssot_sync_log (sync_type, source_path, listings_count, status, error_message)
      VALUES (?, ?, ?, ?, ?)
    `).run("auto", SSOT_WATCH_PATH, 0, "failed", String(err));
  }

  return results;
}

export async function manualSync(sourcePath?: string): Promise<{ upserted: number; errors: number }> {
  const path = sourcePath || SSOT_WATCH_PATH;
  const results = { upserted: 0, errors: 0 };

  try {
    const raw = await readFile(path, "utf-8");
    const payload: SSOTPayload = JSON.parse(raw);

    for (const ssotListing of payload.listings) {
      try {
        const listing = transformSSOTToListing(ssotListing);
        upsertListing(listing);
        results.upserted++;
      } catch (err) {
        console.error(`[SSOT] Failed to transform/upsert listing ${ssotListing.id}:`, err);
        results.errors++;
      }
    }

    const db = getDb();
    db.prepare(`
      INSERT INTO ssot_sync_log (sync_type, source_path, listings_count, status)
      VALUES (?, ?, ?, ?)
    `).run("manual", path, results.upserted, results.errors > 0 ? "partial_error" : "success");

  } catch (err) {
    console.error("[SSOT] Manual sync failed:", err);
    results.errors++;

    const db = getDb();
    db.prepare(`
      INSERT INTO ssot_sync_log (sync_type, source_path, listings_count, status, error_message)
      VALUES (?, ?, ?, ?, ?)
    `).run("manual", path, 0, "failed", String(err));
  }

  return results;
}