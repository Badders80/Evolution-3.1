import { NextResponse } from 'next/server';
import { getMarketplaceListingBySlug } from '@/lib/marketplace';
import { getStripeServer } from '@/lib/stripe-server';
import { REQUIRED_DOCUMENT_TYPES } from '@/lib/marketplace-documents';
import {
  getMarketplaceReleaseStage,
  isMarketplacePreviewEnabled,
} from '@/lib/marketplace-release-stage';
import { getOperatorSession } from '@/lib/auth';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const STEP_EPSILON = 0.000001;

function isMultipleOfStep(value: number, step: number) {
  if (step <= 0) return false;
  const ratio = value / step;
  return Math.abs(ratio - Math.round(ratio)) < STEP_EPSILON;
}

export async function POST(req: Request) {
  const releaseStage = getMarketplaceReleaseStage();

  if (!isMarketplacePreviewEnabled()) {
    return NextResponse.json(
      { error: 'Marketplace is not available in the current release stage.' },
      { status: 404 },
    );
  }

  if (releaseStage === 'pending') {
    const session = await getOperatorSession();
    if (!session) {
      return NextResponse.json(
        { error: 'Marketplace access is restricted.' },
        { status: 403 },
      );
    }
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  const {
    listingSlug,
    requestedStakePercent,
    requestedUnits,
    reservationAmountNzd,
    customerEmail,
    customerName,
    phone,
    notes,
    documentAcknowledgements,
  } = body && typeof body === 'object' ? (body as Record<string, unknown>) : {};

  // Validate required fields
  if (typeof listingSlug !== 'string' || !listingSlug.trim()) {
    return NextResponse.json(
      { error: 'Missing listingSlug.' },
      { status: 400 },
    );
  }

  if (typeof customerEmail !== 'string' || !EMAIL_PATTERN.test(customerEmail.trim().toLowerCase())) {
    return NextResponse.json(
      { error: 'Valid customerEmail is required.' },
      { status: 400 },
    );
  }

  if (typeof customerName !== 'string' || !customerName.trim()) {
    return NextResponse.json(
      { error: 'customerName is required.' },
      { status: 400 },
    );
  }

  if (typeof requestedStakePercent !== 'number' || typeof requestedUnits !== 'number' || typeof reservationAmountNzd !== 'number') {
    return NextResponse.json(
      { error: 'requestedStakePercent, requestedUnits, and reservationAmountNzd are required numbers.' },
      { status: 400 },
    );
  }

  // Validate document acknowledgements
  if (
    !documentAcknowledgements ||
    typeof documentAcknowledgements !== 'object'
  ) {
    return NextResponse.json(
      { error: 'Document acknowledgements are required.' },
      { status: 400 },
    );
  }

  const acks = documentAcknowledgements as Record<string, unknown>;
  for (const docType of REQUIRED_DOCUMENT_TYPES) {
    if (acks[docType] !== true) {
      return NextResponse.json(
        { error: `You must acknowledge the ${docType.replace(/_/g, ' ')} before proceeding.` },
        { status: 400 },
      );
    }
  }

  // Validate listing
  const listing = getMarketplaceListingBySlug(listingSlug.trim());
  if (!listing || listing.publishStatus !== 'live') {
    return NextResponse.json(
      { error: 'This listing is not available for purchase.' },
      { status: 400 },
    );
  }

  // Validate listing has official documents
  if (!listing.officialDocuments || listing.officialDocuments.length === 0) {
    return NextResponse.json(
      { error: 'This listing does not support direct purchase.' },
      { status: 400 },
    );
  }

  // Validate stake bounds
  if (
    requestedStakePercent < listing.application.minimumStakePercent ||
    requestedStakePercent > listing.application.maximumStakePercent
  ) {
    return NextResponse.json(
      { error: 'Requested stake falls outside the listing limits.' },
      { status: 400 },
    );
  }

  if (!isMultipleOfStep(requestedStakePercent, listing.offering.stakeUnitPercent)) {
    return NextResponse.json(
      { error: 'Requested stake must align to the listing stake unit.' },
      { status: 400 },
    );
  }

  const expectedUnits = Math.round(
    requestedStakePercent / listing.offering.stakeUnitPercent,
  );
  if (!Number.isInteger(requestedUnits) || requestedUnits !== expectedUnits) {
    return NextResponse.json(
      { error: 'Requested units do not match the requested stake.' },
      { status: 400 },
    );
  }

  const expectedReservationAmountNzd = Number(
    (expectedUnits * listing.offering.tokenPriceNzd).toFixed(2),
  );
  if (Math.abs(reservationAmountNzd - expectedReservationAmountNzd) > 0.01) {
    return NextResponse.json(
      { error: 'Reservation value does not match the listing pricing.' },
      { status: 400 },
    );
  }

  // Create Stripe Checkout Session
  const stripe = getStripeServer();
  const baseUrl = process.env.NEXTAUTH_URL || process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

  try {
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'nzd',
            product_data: {
              name: `${listing.horse.name} — ${requestedStakePercent}% Ownership Stake`,
              description: `${expectedUnits} stake unit${expectedUnits > 1 ? 's' : ''} in ${listing.horse.name} (${listing.trainer.stableName})`,
            },
            unit_amount: Math.round(expectedReservationAmountNzd * 100), // Stripe expects cents
          },
          quantity: 1,
        },
      ],
      success_url: `${baseUrl}/marketplace/${listing.slug}?checkout=success&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/marketplace/${listing.slug}?checkout=cancelled`,
      customer_email: customerEmail.trim().toLowerCase(),
      metadata: {
        listingId: listing.id,
        listingSlug: listing.slug,
        horseName: listing.horse.name,
        requestedStakePercent: String(requestedStakePercent),
        requestedUnits: String(expectedUnits),
        reservationAmountNzd: String(expectedReservationAmountNzd),
        customerEmail: customerEmail.trim().toLowerCase(),
        customerName: customerName.trim(),
        phone: (typeof phone === 'string' ? phone.trim() : '') || '',
        notes: (typeof notes === 'string' ? notes.trim() : '') || '',
      },
    });

    return NextResponse.json({
      ok: true,
      sessionId: session.id,
      url: session.url,
    });
  } catch (error) {
    console.error('[Checkout] Stripe session creation failed:', error);
    return NextResponse.json(
      { error: 'Unable to create checkout session. Please try again.' },
      { status: 500 },
    );
  }
}