import { getDb } from "@/lib/db/connection";
import type { MarketplaceListing } from "@/types/marketplace";

export function getAllListings(status?: string): MarketplaceListing[] {
  const db = getDb();
  const stmt = status
    ? db.prepare(
        "SELECT * FROM listings WHERE publish_status = ? ORDER BY updated_at DESC",
      )
    : db.prepare("SELECT * FROM listings ORDER BY updated_at DESC");

  const rows = status ? stmt.all(status) : stmt.all();

  return (rows as Array<Record<string, string | null>>).map((row) =>
    rowToListing(row),
  );
}

export function getListingBySlug(slug: string): MarketplaceListing | null {
  const db = getDb();
  const stmt = db.prepare("SELECT * FROM listings WHERE slug = ?");
  const row = stmt.get(slug) as Record<string, string | null> | undefined;

  if (!row) return null;
  return rowToListing(row);
}

export function getListingById(id: string): MarketplaceListing | null {
  const db = getDb();
  const stmt = db.prepare("SELECT * FROM listings WHERE id = ?");
  const row = stmt.get(id) as Record<string, string | null> | undefined;

  if (!row) return null;
  return rowToListing(row);
}

export function upsertListing(listing: MarketplaceListing): void {
  const db = getDb();
  const stmt = db.prepare(`
    INSERT INTO listings (
      id, slug, title, publish_status, hero_image_src, images_json,
      summary, overview, horse_json, trainer_json, owner_json,
      offering_json, application_json, disclaimers_json, documents_json,
      ssot_source_path, ssot_updated_at, updated_at
    ) VALUES (
      ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, datetime('now')
    )
    ON CONFLICT(id) DO UPDATE SET
      slug = excluded.slug,
      title = excluded.title,
      publish_status = excluded.publish_status,
      hero_image_src = excluded.hero_image_src,
      images_json = excluded.images_json,
      summary = excluded.summary,
      overview = excluded.overview,
      horse_json = excluded.horse_json,
      trainer_json = excluded.trainer_json,
      owner_json = excluded.owner_json,
      offering_json = excluded.offering_json,
      application_json = excluded.application_json,
      disclaimers_json = excluded.disclaimers_json,
      documents_json = excluded.documents_json,
      ssot_source_path = excluded.ssot_source_path,
      ssot_updated_at = excluded.ssot_updated_at,
      updated_at = datetime('now')
  `);

  stmt.run(
    listing.id,
    listing.slug,
    listing.title,
    listing.publishStatus,
    listing.heroImageSrc,
    JSON.stringify(listing.images),
    listing.summary,
    listing.overview,
    JSON.stringify(listing.horse),
    JSON.stringify(listing.trainer),
    JSON.stringify(listing.owner),
    JSON.stringify(listing.offering),
    JSON.stringify(listing.application),
    JSON.stringify(listing.disclaimers),
    JSON.stringify(listing.officialDocuments),
    listing.slug,
    new Date().toISOString(),
  );
}

export function deleteListing(id: string): void {
  const db = getDb();
  const stmt = db.prepare("DELETE FROM listings WHERE id = ?");
  stmt.run(id);
}

function rowToListing(row: Record<string, string | null>): MarketplaceListing {
  return {
    id: row.id ?? "",
    slug: row.slug ?? "",
    title: row.title ?? "",
    publishStatus:
      (row.publish_status as MarketplaceListing["publishStatus"]) ?? "draft",
    heroImageSrc: row.hero_image_src ?? "",
    images: safeParse<string[]>(row.images_json, []),
    summary: row.summary ?? "",
    overview: row.overview ?? "",
    horse: safeParse<MarketplaceListing["horse"]>(row.horse_json, {
      id: "",
      name: "",
      countryCode: "",
      foalingDate: "",
      sex: "",
      colour: "",
      sire: "",
      dam: "",
      status: "",
      identityStatus: "",
      breedingUrl: "",
      performanceProfileUrl: "",
      nztrLifeNumber: "",
      microchipNumber: "",
    }),
    trainer: safeParse<MarketplaceListing["trainer"]>(row.trainer_json, {
      id: "",
      name: "",
      stableName: "",
      location: "",
      website: "",
    }),
    owner: safeParse<MarketplaceListing["owner"]>(row.owner_json, {
      id: "",
      name: "",
      entityType: "",
    }),
    offering: safeParse<MarketplaceListing["offering"]>(row.offering_json, {
      leaseId: "",
      leaseStatus: "",
      startDate: "",
      endDate: "",
      durationMonths: 0,
      percentLeased: 0,
      tokenCount: 0,
      stakeUnitPercent: 0,
      tokenPriceNzd: 0,
      totalRaiseNzd: 0,
      investorSharePercent: 0,
      ownerSharePercent: 0,
      pricePerOnePercentNzd: 0,
    }),
    application: safeParse<MarketplaceListing["application"]>(
      row.application_json,
      {
        campaignKey: "",
        sourcePath: "",
        minimumStakePercent: 0,
        maximumStakePercent: 0,
        defaultRequestedStakePercent: 0,
        defaultRequestedUnits: 0,
        defaultReservationAmountNzd: 0,
        defaultStatus: "submitted",
      },
    ),
    disclaimers: safeParse<string[]>(row.disclaimers_json, []),
    officialDocuments: safeParse(row.documents_json, []),
  };
}

function safeParse<T>(value: string | null, fallback: T): T {
  if (!value) return fallback;
  try {
    return JSON.parse(value) as T;
  } catch {
    return fallback;
  }
}
