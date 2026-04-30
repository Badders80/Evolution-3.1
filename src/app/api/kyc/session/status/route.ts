import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getUserByEmail } from "@/lib/db/queries/users";
import { getKycSessionsByUser } from "@/lib/db/queries/kyc";

export const dynamic = "force-dynamic";

/**
 * GET /api/kyc/session/status
 *
 * Returns the current user's KYC status and latest session details.
 * Used by the frontend to poll for verification completion.
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

    const sessions = getKycSessionsByUser(user.id);
    const latest = sessions[0] || null;

    return NextResponse.json({
      status: user.kyc_status,
      latestSession: latest
        ? {
            id: latest.id,
            providerSessionId: latest.provider_session_id,
            status: latest.status,
            createdAt: latest.created_at,
            updatedAt: latest.updated_at,
          }
        : null,
    });
  } catch (error) {
    console.error("[KYC Status] Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch KYC status" },
      { status: 500 },
    );
  }
}
