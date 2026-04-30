import { NextResponse } from "next/server";
import { getAllListings } from "@/lib/db/queries/listings";

export const dynamic = "force-dynamic";

/**
 * GET /api/marketplace/listings
 *
 * Public endpoint returning all live + ready_to_publish listings as JSON.
 * Used by SSOT_Build and external consumers for marketplace data.
 * Live listings appear on /marketplace; ready_to_publish appear in admin only.
 */
export async function GET(): Promise<NextResponse> {
  try {
    const allListings = getAllListings();

    // Filter to live + ready_to_publish (publicly visible or admin-reviewable)
    const visible = allListings.filter(
      (l) =>
        l.publishStatus === "live" || l.publishStatus === "ready_to_publish",
    );

    return NextResponse.json({
      generatedAt: new Date().toISOString(),
      totalCount: visible.length,
      listings: visible,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("[marketplace/listings] Failed to fetch listings:", message);
    return NextResponse.json(
      { error: "Failed to fetch listings", details: message },
      { status: 500 },
    );
  }
}
