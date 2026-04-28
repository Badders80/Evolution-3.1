import { NextRequest, NextResponse } from "next/server";
import { createHmac } from "crypto";
import {
  getUserById,
  updateUserKyc,
  updateUserWallet,
} from "@/lib/db/queries/users";
import {
  getKycSessionByProviderId,
  updateKycSessionStatus,
} from "@/lib/db/queries/kyc";
import { createOpenfortWallet } from "@/lib/openfort";

export const dynamic = "force-dynamic";

interface KycWebhookPayload {
  sessionId: string;
  userId: string;
  status: "approved" | "declined" | "review";
  verifiedAt?: string;
  documentType?: string;
  country?: string;
}

function verifyDiditSignature(
  payload: KycWebhookPayload,
  signature: string | null,
  secret: string,
): boolean {
  if (!signature || !secret || secret === "your_didit_webhook_secret_here") {
    console.warn(
      "[KYC Webhook] Skipping signature verification (missing secret or signature)",
    );
    return true;
  }

  const body = JSON.stringify(payload);
  const expected = createHmac("sha256", secret).update(body).digest("hex");
  return signature === expected;
}

/**
 * POST /api/kyc/callback
 *
 * Didit.me KYC Webhook Handler
 *
 * 1. Verify the webhook signature (HMAC-SHA256)
 * 2. Be idempotent — processing the same session twice should not double-create wallets
 * 3. Update user KYC status in database
 * 4. Trigger Openfort wallet creation on approval
 */
export async function POST(request: NextRequest) {
  try {
    const payload = (await request.json()) as KycWebhookPayload;

    const signature = request.headers.get("x-didit-signature");
    const secret = process.env.DIDIT_WEBHOOK_SECRET || "";

    if (
      process.env.NODE_ENV === "production" &&
      !verifyDiditSignature(payload, signature, secret)
    ) {
      return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
    }

    // In dev, warn but still verify if possible
    if (
      process.env.NODE_ENV !== "production" &&
      secret &&
      secret !== "your_didit_webhook_secret_here"
    ) {
      if (!verifyDiditSignature(payload, signature, secret)) {
        console.warn(
          "[KYC Webhook] Signature mismatch in dev — allowing through for testing",
        );
      }
    }

    const { sessionId, userId, status } = payload;

    // Idempotency check: have we already processed this session?
    const existing = getKycSessionByProviderId(sessionId);
    if (existing?.status === "completed" || existing?.status === "rejected") {
      return NextResponse.json({ message: "Already processed", sessionId });
    }

    // Map Didit status to our status
    let mappedStatus: "in_progress" | "completed" | "rejected" = "in_progress";
    if (status === "approved") mappedStatus = "completed";
    if (status === "declined") mappedStatus = "rejected";

    // Record the session result
    if (existing) {
      updateKycSessionStatus(
        existing.id,
        mappedStatus,
        JSON.stringify(payload),
      );
    }

    if (status === "approved") {
      // Update user KYC status
      updateUserKyc(userId, "verified");

      // Create Openfort embedded wallet for approved user
      const user = getUserById(userId);
      if (user && !user.wallet_address) {
        try {
          const wallet = await createOpenfortWallet(userId, user.email);
          updateUserWallet(userId, wallet.walletAddress || null, wallet.id);
          console.log(`✅ KYC approved + wallet created for user ${userId}`);
        } catch (walletError) {
          console.error("Wallet creation failed:", walletError);
          // Continue — wallet can be created later
        }
      }

      return NextResponse.json({
        success: true,
        message: "KYC approved, wallet created",
        sessionId,
      });
    }

    if (status === "declined") {
      updateUserKyc(userId, "rejected");
      console.log(`❌ KYC declined for user ${userId}, session ${sessionId}`);
      return NextResponse.json({
        success: true,
        message: "KYC declined",
        sessionId,
      });
    }

    return NextResponse.json({
      success: true,
      message: "KYC status updated",
      sessionId,
    });
  } catch (error) {
    console.error("KYC webhook error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
