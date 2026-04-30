import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import Stripe from "stripe";
import { authOptions } from "@/lib/auth";
import { getUserByEmail } from "@/lib/db/queries/users";
import { getListingBySlug } from "@/lib/db/queries/listings";

export const dynamic = "force-dynamic";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  apiVersion: "2026-03-25.dahlia",
  typescript: true,
});

/**
 * POST /api/checkout
 *
 * Creates a Stripe Checkout session for purchasing horse shares.
 * Requires authenticated user with verified KYC.
 * Uses NZD currency, collects billing address for compliance.
 */
export async function POST(request: NextRequest) {
  try {
    // 1. Require authentication
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: "Unauthorized. Please sign in." },
        { status: 401 },
      );
    }

    // 2. Look up user in DB to check KYC
    const user = getUserByEmail(session.user.email);
    if (!user) {
      return NextResponse.json({ error: "User not found." }, { status: 404 });
    }

    // 3. KYC gate — must be verified to purchase
    if (user.kyc_status !== "verified") {
      return NextResponse.json(
        {
          error: "KYC verification required.",
          code: "KYC_REQUIRED",
          redirectUrl: "/mystable/verify",
        },
        { status: 403 },
      );
    }

    const { listingSlug, tokenCount, documentAcknowledgements } =
      await request.json();

    if (!listingSlug || !tokenCount) {
      return NextResponse.json(
        { error: "Missing required fields: listingSlug, tokenCount" },
        { status: 400 },
      );
    }

    const listing = getListingBySlug(listingSlug);
    if (!listing) {
      return NextResponse.json({ error: "Listing not found" }, { status: 404 });
    }

    const tokenPrice = listing.offering.tokenPriceNzd || 0;
    const amount = tokenCount * tokenPrice;

    if (tokenCount < 1 || amount <= 0) {
      return NextResponse.json(
        { error: "Invalid token count or price" },
        { status: 400 },
      );
    }

    const checkoutSession = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "nzd",
            product_data: {
              name: `${listing.title} — ${tokenCount} Share${tokenCount > 1 ? "s" : ""}`,
              description: `Horse: ${listing.horse.name}. Authorised NZ syndicator.`,
              images: listing.heroImageSrc ? [listing.heroImageSrc] : undefined,
            },
            unit_amount: Math.round(amount * 100), // Stripe uses cents
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_URL || ""}/mystable?success=true&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_URL || ""}/marketplace/${listingSlug}?canceled=true`,
      customer_email: user.email,
      metadata: {
        listingSlug,
        listingId: listing.id,
        tokenCount: String(tokenCount),
        tokenPrice: String(tokenPrice),
        horseName: listing.horse.name,
        userId: user.id,
        documentAcknowledgements: documentAcknowledgements
          ? JSON.stringify(documentAcknowledgements)
          : JSON.stringify([]),
      },
      // NZ-specific: collect billing address for compliance
      billing_address_collection: "required",
      // Collect tax ID if needed for NZ GST
      tax_id_collection: {
        enabled: true,
      },
    });

    return NextResponse.json({
      sessionId: checkoutSession.id,
      url: checkoutSession.url,
    });
  } catch (error) {
    console.error("Checkout error:", error);
    return NextResponse.json(
      { error: "Failed to create checkout session" },
      { status: 500 },
    );
  }
}
