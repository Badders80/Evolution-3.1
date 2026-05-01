import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { getListingBySlug } from "@/lib/db/queries/listings";

export const dynamic = "force-dynamic";

function getStripe() {
  return new Stripe(process.env.STRIPE_SECRET_KEY || "", {
    typescript: true,
  });
}

/**
 * POST /api/checkout
 *
 * Creates a Stripe Checkout session for purchasing horse shares.
 * Uses NZD currency, collects billing address for compliance.
 */
export async function POST(request: NextRequest) {
  try {
    const { listingSlug, tokenCount, userEmail } = await request.json();

    if (!listingSlug || !tokenCount || !userEmail) {
      return NextResponse.json(
        {
          error: "Missing required fields: listingSlug, tokenCount, userEmail",
        },
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

    const session = await getStripe().checkout.sessions.create({
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
      customer_email: userEmail,
      metadata: {
        listingSlug,
        listingId: listing.id,
        tokenCount: String(tokenCount),
        tokenPrice: String(tokenPrice),
        horseName: listing.horse.name,
      },
      // NZ-specific: collect billing address for compliance
      billing_address_collection: "required",
      // Collect tax ID if needed for NZ GST
      tax_id_collection: {
        enabled: true,
      },
    });

    return NextResponse.json({ sessionId: session.id, url: session.url });
  } catch (error) {
    console.error("Checkout error:", error);
    return NextResponse.json(
      { error: "Failed to create checkout session" },
      { status: 500 },
    );
  }
}
