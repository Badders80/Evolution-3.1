import crypto from 'node:crypto';
import Stripe from 'stripe';
import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { getStripeServer } from '@/lib/stripe-server';
import { getMarketplaceListingBySlug } from '@/lib/marketplace';
import { appendMystablePurchaseEntry } from '@/lib/mystable-purchases';
import { sendPurchaseConfirmation } from '@/lib/send-purchase-confirmation';

export async function POST(req: Request) {
  const body = await req.text();
  const headersList = await headers();
  const signature = headersList.get('stripe-signature');

  if (!signature) {
    return NextResponse.json(
      { error: 'Missing stripe-signature header.' },
      { status: 400 },
    );
  }

  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!webhookSecret) {
    console.error('[StripeWebhook] Missing STRIPE_WEBHOOK_SECRET');
    return NextResponse.json(
      { error: 'Webhook secret not configured.' },
      { status: 500 },
    );
  }

  const stripe = getStripeServer();

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err) {
    console.error('[StripeWebhook] Signature verification failed:', err);
    return NextResponse.json(
      { error: 'Invalid signature.' },
      { status: 400 },
    );
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;
    const metadata = session.metadata || {};

    const listingSlug = metadata.listingSlug;
    const listingId = metadata.listingId;
    const horseName = metadata.horseName;
    const customerEmail = metadata.customerEmail || '';
    const customerName = metadata.customerName || '';
    const phone = metadata.phone || '';
    const notes = metadata.notes || '';
    const requestedStakePercent = Number(metadata.requestedStakePercent) || 0;
    const requestedUnits = Number(metadata.requestedUnits) || 0;
    const reservationAmountNzd = Number(metadata.reservationAmountNzd) || 0;

    // Look up listing for additional details
    const listing = listingSlug ? getMarketplaceListingBySlug(listingSlug) : null;

    const purchaseId = `purchase-${crypto.randomUUID()}`;

    const purchaseEntry: import('@/lib/mystable-purchases').MystablePurchaseEntry = {
      purchaseId,
      stripeSessionId: session.id,
      createdAt: new Date().toISOString(),
      listingId: listingId || '',
      listingSlug: listingSlug || '',
      horseName: horseName || '',
      horseColour: listing?.horse.colour || '',
      horseSex: listing?.horse.sex || '',
      trainerName: listing?.trainer.name || '',
      heroImageSrc: listing?.heroImageSrc || '',
      customerEmail,
      customerName,
      phone: phone || undefined,
      notes: notes || undefined,
      requestedStakePercent,
      requestedUnits,
      reservationAmountNzd,
      status: 'active',
      leaseEndDate: listing?.offering.endDate || '',
      documentAcknowledgements: {
        hlt_term_sheet: true,
        pds: true,
        syndicate_agreement: true,
      },
    };

    // Save purchase — if this fails, return 500 so Stripe retries
    try {
      await appendMystablePurchaseEntry(purchaseEntry);
      console.log(`[StripeWebhook] Purchase saved: ${purchaseId} for ${customerEmail}`);
    } catch (error) {
      console.error('[StripeWebhook] Failed to save purchase:', error);
      return NextResponse.json(
        { error: 'Failed to save purchase. Stripe will retry.' },
        { status: 500 },
      );
    }

    // Send confirmation email — non-fatal, don't fail webhook on email error
    try {
      const emailResult = await sendPurchaseConfirmation(purchaseEntry);
      if (!emailResult.sent) {
        console.warn(`[StripeWebhook] Email failed for ${purchaseId}: ${emailResult.error}`);
      } else {
        console.log(`[StripeWebhook] Confirmation email sent: ${emailResult.messageId}`);
      }
    } catch (error) {
      console.error('[StripeWebhook] Email send threw:', error);
    }
  }

  return NextResponse.json({ received: true });
}