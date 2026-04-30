import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { authOptions } from "@/lib/auth";
import { getUsers } from "@/lib/db/queries/users";
import { getHoldingsByUser } from "@/lib/db/queries/holdings";
import { getAllListings, updateListingStatus } from "@/lib/db/queries/listings";
import type { MarketplacePublishStatus } from "@/types/marketplace";

export interface InvestorRecord {
  id: string;
  email: string;
  name: string;
  walletAddress: string | null;
  kycStatus: string;
  createdAt: string;
}

export interface HoldingRecord {
  id: string;
  investorId: string;
  horseName: string;
  stakePercent: number;
  units: number;
  totalValue: number;
  txHash: string | null;
  purchaseDate: string;
}

export interface AdminStats {
  totalInvestors: number;
  totalValue: number;
  pendingKycCount: number;
  verifiedInvestors: number;
}

export interface ListingRecord {
  id: string;
  slug: string;
  title: string;
  publishStatus: string;
  horseName: string;
  tokenPriceNzd: number;
  tokenCount: number;
}

async function requireAdmin() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email || session.user.role !== "admin") {
    return null;
  }
  return session;
}

export async function GET(request: NextRequest) {
  try {
    const session = await requireAdmin();
    if (!session) {
      return NextResponse.json(
        { error: "Unauthorized - Admin access required" },
        { status: 401 },
      );
    }

    // Fetch real data from DB
    const users = getUsers();
    const allHoldings: HoldingRecord[] = [];
    let totalValue = 0;

    for (const user of users) {
      const userHoldings = getHoldingsByUser(user.id);
      for (const h of userHoldings) {
        const value = h.tokens_owned * 1000; // placeholder price
        totalValue += value;
        allHoldings.push({
          id: h.id,
          investorId: user.id,
          horseName: h.horse_name || "Unknown",
          stakePercent: h.percent_owned,
          units: h.tokens_owned,
          totalValue: value,
          txHash: h.tx_hash,
          purchaseDate: h.created_at,
        });
      }
    }

    const investors: InvestorRecord[] = users.map((u) => ({
      id: u.id,
      email: u.email,
      name: u.name || u.email.split("@")[0],
      walletAddress: u.wallet_address,
      kycStatus: u.kyc_status,
      createdAt: u.created_at,
    }));

    const stats: AdminStats = {
      totalInvestors: users.length,
      totalValue,
      pendingKycCount: users.filter((u) => u.kyc_status === "pending").length,
      verifiedInvestors: users.filter((u) => u.kyc_status === "verified")
        .length,
    };

    const kycQueue = investors.filter((inv) => inv.kycStatus === "pending");

    // Fetch all listings from DB
    const allListings = getAllListings();
    const listings: ListingRecord[] = allListings.map((l) => ({
      id: l.id,
      slug: l.slug,
      title: l.title,
      publishStatus: l.publishStatus,
      horseName: l.horse.name,
      tokenPriceNzd: l.offering.tokenPriceNzd,
      tokenCount: l.offering.tokenCount,
    }));

    return NextResponse.json({
      stats,
      investors,
      holdings: allHoldings,
      kycQueue,
      listings,
    });
  } catch (error) {
    console.error("Admin API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

/**
 * PATCH /api/admin — Update listing publish status
 */
export async function PATCH(request: NextRequest) {
  try {
    const session = await requireAdmin();
    if (!session) {
      return NextResponse.json(
        { error: "Unauthorized - Admin access required" },
        { status: 401 },
      );
    }

    const body = await request.json();
    const { listingId, status } = body;

    if (!listingId || !status) {
      return NextResponse.json(
        { error: "Missing required fields: listingId, status" },
        { status: 400 },
      );
    }

    const validStatuses: MarketplacePublishStatus[] = [
      "draft",
      "ready_to_publish",
      "live",
      "closed",
    ];
    if (!validStatuses.includes(status as MarketplacePublishStatus)) {
      return NextResponse.json(
        {
          error: `Invalid status. Must be one of: ${validStatuses.join(", ")}`,
        },
        { status: 400 },
      );
    }

    const updated = updateListingStatus(
      listingId,
      status as MarketplacePublishStatus,
    );
    if (!updated) {
      return NextResponse.json({ error: "Listing not found" }, { status: 404 });
    }

    // Revalidate marketplace pages so changes take effect immediately
    try {
      revalidatePath("/marketplace");
      const allListings = getAllListings();
      for (const l of allListings) {
        revalidatePath(`/marketplace/${l.slug}`);
      }
    } catch {
      console.warn("[Admin API] revalidatePath failed — cache may be stale");
    }

    return NextResponse.json({ success: true, listingId, status });
  } catch (error) {
    console.error("Admin PATCH error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
