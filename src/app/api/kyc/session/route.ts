import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getUserByEmail, createUser } from "@/lib/db/queries/users";
import { createKycSession } from "@/lib/db/queries/kyc";

export const dynamic = "force-dynamic";

/**
 * POST /api/kyc/session
 *
 * Creates a Didit.me KYC verification session for the authenticated user.
 * Requires NextAuth session.
 */
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const email = session.user.email;
    let user = getUserByEmail(email);

    if (!user) {
      // Auto-provision user in our DB on first sign-in
      user = createUser({
        id: `usr_${Date.now()}`,
        email,
        name: session.user.name || email.split("@")[0],
        image: session.user.image || null,
        role: "user",
        kyc_status: "none",
        kyc_verified_at: null,
        wallet_address: null,
        openfort_user_id: null,
      });
    }

    const apiKey = process.env.DIDIT_API_KEY || "";
    const workflowId = process.env.DIDIT_WORKFLOW_ID || "";

    if (!apiKey || apiKey === "your_didit_api_key") {
      console.error("[KYC Session] DIDIT_API_KEY is not configured");
      return NextResponse.json(
        { error: "KYC provider not configured. Please contact support." },
        { status: 500 },
      );
    }

    if (!workflowId) {
      console.error("[KYC Session] DIDIT_WORKFLOW_ID is not configured");
      return NextResponse.json(
        { error: "KYC workflow not configured. Please contact support." },
        { status: 500 },
      );
    }

    const callbackUrl = `${process.env.NEXT_PUBLIC_URL || ""}/api/kyc/callback`;

    const response = await fetch("https://verification.didit.me/v3/session/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
      },
      body: JSON.stringify({
        workflow_id: workflowId,
        vendor_data: user.id,
        callback: callbackUrl,
        callback_method: "both",
        language: "en",
        contact_details: user.email
          ? {
              email: user.email,
              send_notification_emails: false,
              email_lang: "en",
            }
          : undefined,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("[KYC Session] Didit API error:", errorText);
      return NextResponse.json(
        { error: "Failed to create verification session" },
        { status: 500 },
      );
    }

    const data = await response.json();

    // Persist session in DB so we can track it
    createKycSession({
      id: `kyc_${Date.now()}`,
      user_id: user.id,
      provider: "didit",
      provider_session_id: data.session_id,
      status: "pending",
      result_json: null,
      reviewed_by: null,
      reviewed_at: null,
    });

    return NextResponse.json({
      url: data.url,
      sessionId: data.session_id,
      status: data.status,
    });
  } catch (error) {
    console.error("[KYC Session] Error:", error);
    return NextResponse.json(
      { error: "Failed to create verification session" },
      { status: 500 },
    );
  }
}
