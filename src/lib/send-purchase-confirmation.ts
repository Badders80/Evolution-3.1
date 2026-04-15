import { getResendClient, EMAIL_FROM } from '@/lib/email';
import { generatePurchaseConfirmationHtml } from '@/emails/purchase-confirmation';
import { getMarketplaceListingBySlug } from '@/lib/marketplace';
import { getOfficialDocumentsForListing } from '@/lib/marketplace-documents';
import type { MystablePurchaseEntry } from '@/lib/mystable-purchases';

type SendResult = {
  sent: true;
  messageId: string;
} | {
  sent: false;
  error: string;
};

/**
 * Sends a purchase confirmation email to the customer.
 * Includes all 3 official documents with download links.
 *
 * This function is designed to be called from the Stripe webhook handler.
 * It catches its own errors and returns a result object — it should NOT
 * cause the webhook to fail.
 */
export async function sendPurchaseConfirmation(
  purchase: MystablePurchaseEntry,
): Promise<SendResult> {
  try {
    const listing = purchase.listingSlug
      ? getMarketplaceListingBySlug(purchase.listingSlug)
      : null;

    const officialDocuments = listing
      ? getOfficialDocumentsForListing(listing)
      : [];

    const baseUrl =
      process.env.NEXTAUTH_URL ||
      process.env.NEXT_PUBLIC_API_URL ||
      'http://localhost:3000';

    const html = generatePurchaseConfirmationHtml({
      purchase,
      officialDocuments,
      baseUrl,
    });

    const resend = getResendClient();
    const { data, error } = await resend.emails.send({
      from: EMAIL_FROM,
      to: purchase.customerEmail,
      subject: `Stake Reservation Confirmed — ${purchase.horseName}`,
      html,
    });

    if (error) {
      console.error('[SendPurchaseConfirmation] Resend error:', error);
      return { sent: false, error: error.message };
    }

    console.log(
      `[SendPurchaseConfirmation] Email sent: ${data?.id} to ${purchase.customerEmail}`,
    );
    return { sent: true, messageId: data?.id ?? '' };
  } catch (err) {
    const message =
      err instanceof Error ? err.message : 'Unknown error sending email';
    console.error('[SendPurchaseConfirmation] Failed:', message);
    return { sent: false, error: message };
  }
}