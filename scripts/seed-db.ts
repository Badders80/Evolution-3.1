import { getDb } from "@/lib/db/connection";
import { upsertListing } from "@/lib/db/queries/listings";
import listingsData from "@/data/marketplace-listings.generated.json";

function seed() {
  const db = getDb();

  // Ensure tables exist
  const schema = require("fs").readFileSync(
    require("path").join(process.cwd(), "src", "lib", "db", "schema.sql"),
    "utf-8"
  );
  db.exec(schema);

  // Seed listings
  for (const listing of listingsData.listings) {
    // Transform from JSON format to MarketplaceListing format
    upsertListing(listing as unknown as import("@/types/marketplace").MarketplaceListing);
  }

  console.log(`Seeded ${listingsData.listings.length} listings`);
}

seed();