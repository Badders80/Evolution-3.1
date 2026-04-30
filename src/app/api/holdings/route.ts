import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getUserByEmail } from "@/lib/db/queries/users";
import { getHoldingsByUser } from "@/lib/db/queries/holdings";

export const dynamic = "force-dynamic";

/**
 * GET /api/holdings
 *
 * Returns the current user's holdings/portfolio.
 * Requires authentication.
 */
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = getUserByEmail(session.user.email);
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const holdings = getHoldingsByUser(user.id);

    return NextResponse.json({ holdings });
  } catch (error) {
    console.error("[Holdings] Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch holdings" },
      { status: 500 },
    );
  }
}
