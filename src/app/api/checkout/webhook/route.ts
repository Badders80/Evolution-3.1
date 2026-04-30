import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { getUserByEmail, createUser } from "@/lib/db/queries/users";
import { createHolding, updateHoldingStatus } from "@/lib/db/queries/holdings";
import { getListingById } from "@/lib/db/queries/listings";

export const dynamic = "force-dynamic";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  typescript: true,
});

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || "";

/**
 * POST /api/checkout/webhook
 *
 * Stripe Webhook Handler
 *
 * Listens for checkout.session.completed events and:
 * 1. Verifies the Stripe signature
 * 2. Finds or creates the user in our DB
 * 3. Creates a holding record in the database
 * 4. Calls the mint API to mint tokens to the user's wallet (if KYC approved)
 */
export async function POST(request: NextRequest) {
  const payload = await request.text();
  const signature = request.headers.get("stripe-signature") || "";

  let event: Stripe.Event;

  try {
    if (webhookSecret && webhookSecret !== "whsec_your_stripe_webhook_secret") {
      event = stripe.webhooks.constructEvent(payload, signature, webhookSecret);
    } else {
      console.warn(
        "[Stripe Webhook] No webhook secret configured — parsing unsigned payload (dev only)",
      );
      event = JSON.parse(payload) as Stripe.Event;
    }
  } catch (err: any) {
    // Dev bypass: allow unsigned payloads with x-dev-bypass header
    const devBypass = request.headers.get("x-dev-bypass");
    if (process.env.NODE_ENV !== "production" && devBypass === "true") {
      console.warn(
        "[Stripe Webhook] Dev bypass active — parsing unsigned payload",
      );
      try {
        event = JSON.parse(payload) as Stripe.Event;
      } catch (parseErr: any) {
        console.error("[Stripe Webhook] JSON parse failed:", parseErr.message);
        return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
      }
    } else {
      console.error(
        "[Stripe Webhook] Signature verification failed:",
        err.message,
      );
      return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
    }
  }

  // Handle the event
  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const {
      listingSlug,
      listingId,
      tokenCount,
      tokenPrice,
      horseName,
      documentAcknowledgements: documentAcknowledgementsRaw,
    } = session.metadata || {};

    const userEmail = session.customer_email || session.customer_details?.email;

    if (!listingId || !tokenCount) {
      console.error(
        "[Stripe Webhook] Missing metadata in session:",
        session.id,
      );
      return NextResponse.json({ error: "Missing metadata" }, { status: 400 });
    }

    // Find or create user by email
    let user = getUserByEmail(userEmail || "");
    if (!user && userEmail) {
      console.warn(
        `[Stripe Webhook] No user found for ${userEmail} — creating placeholder`,
      );
      user = createUser({
        id: `usr_${Date.now()}`,
        email: userEmail,
        name: userEmail.split("@")[0] || "Investor",
        image: null,
        role: "user",
        kyc_status: "none",
        kyc_verified_at: null,
        wallet_address: null,
        openfort_user_id: null,
      });
    }

    if (!user) {
      console.error("[Stripe Webhook] Could not find or create user");
      return NextResponse.json({ error: "User not found" }, { status: 400 });
    }

    // Get listing for horse name if not in metadata
    const listing = getListingById(listingId);
    const horseNameFromListing = listing?.horse?.name || horseName || "Unknown";

    // Create holding record
    const holdingId = `hold_${Date.now()}`;
    const tokens = parseInt(tokenCount, 10);
    const pricePerToken = parseFloat(tokenPrice || "0");
    const totalPriceNzd = tokens * pricePerToken;

    // Parse document acknowledgements from metadata (JSON string → array)
    let documentAcks: string | null = null;
    if (documentAcknowledgementsRaw) {
      try {
        const parsed = JSON.parse(documentAcknowledgementsRaw);
        if (Array.isArray(parsed) && parsed.length > 0) {
          documentAcks = JSON.stringify(parsed);
        }
      } catch {
        console.warn(
          "[Stripe Webhook] Failed to parse documentAcknowledgements:",
          documentAcknowledgementsRaw,
        );
      }
    }

    createHolding({
      id: holdingId,
      user_id: user.id,
      listing_id: listingId,
      listing_slug: listingSlug || listing?.slug || "",
      horse_name: horseNameFromListing,
      tokens_owned: tokens,
      percent_owned: 0, // Calculated later based on total supply
      status: "paid",
      stripe_session_id: session.id,
      stripe_payment_intent_id: (session.payment_intent as string) || null,
      tx_hash: null,
      minted_at: null,
      document_acknowledgements: documentAcks,
    });

    console.log(
      `[Stripe Webhook] Payment confirmed for ${user.id}: ${tokens} tokens, holding ${holdingId}`,
    );

    // Trigger mint if user has a wallet and is KYC-verified
    if (user.kyc_status === "verified" && user.wallet_address) {
      try {
        const apiBaseUrl = `http://${request.headers.get("host") || "localhost:3000"}`;
        const mintRes = await fetch(`${apiBaseUrl}/api/tokens/mint`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userId: user.id,
            listingId,
            amount: tokens,
            holdingId,
          }),
        });

        if (!mintRes.ok) {
          console.error(
            "[Stripe Webhook] Mint API failed:",
            await mintRes.text(),
          );
        } else {
          const mintData = await mintRes.json();
          console.log(`[Stripe Webhook] Mint succeeded: ${mintData.txHash}`);
        }
      } catch (mintErr) {
        console.error("[Stripe Webhook] Mint call failed:", mintErr);
      }
    } else {
      console.log(
        `[Stripe Webhook] User ${user.id} not ready for auto-mint (KYC: ${user.kyc_status}, wallet: ${!!user.wallet_address})`,
      );
    }

    return NextResponse.json({ received: true, holdingId });
  }

  if (event.type === "checkout.session.expired") {
    console.log(
      "[Stripe Webhook] Checkout session expired:",
      event.data.object.id,
    );
  }

  return NextResponse.json({ received: true });
}
