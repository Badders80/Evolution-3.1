import { formatNzd, formatPercent } from '@/lib/marketplace';
import { formatFileSize } from '@/lib/marketplace-documents';
import type { OfficialDocument } from '@/types/marketplace';
import type { MystablePurchaseEntry } from '@/lib/mystable-purchases';

/**
 * Escapes HTML-special characters to prevent injection in email templates.
 */
function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

type PurchaseConfirmationEmailProps = {
  purchase: MystablePurchaseEntry;
  officialDocuments: OfficialDocument[];
  baseUrl: string;
};

/**
 * Generates the HTML body for the purchase confirmation email.
 * Uses inline styles for email client compatibility.
 */
export function generatePurchaseConfirmationHtml({
  purchase,
  officialDocuments,
  baseUrl,
}: PurchaseConfirmationEmailProps): string {
  const documentLinks = officialDocuments
    .map(
      (doc) => `
      <tr>
        <td style="padding: 12px 0; border-bottom: 1px solid rgba(255,255,255,0.08);">
          <a href="${baseUrl}${doc.filePath}" target="_blank" style="color: #D4A964; text-decoration: underline; font-weight: 600;">
            ${doc.title}
          </a>
          <br />
          <span style="color: rgba(255,255,255,0.5); font-size: 13px;">
            PDF · ${formatFileSize(doc.fileSizeBytes)} · v${doc.version}
          </span>
        </td>
      </tr>`,
    )
    .join('');

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Stake Reservation Confirmed — ${escapeHtml(purchase.horseName)}</title>
</head>
<body style="margin: 0; padding: 0; background-color: #0a0a0a; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color: #ffffff;">

  <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; margin: 0 auto; padding: 40px 24px;">
    <!-- Header -->
    <tr>
      <td style="padding-bottom: 32px; border-bottom: 1px solid rgba(212,169,100,0.3);">
        <p style="margin: 0; font-size: 11px; font-weight: 600; letter-spacing: 0.28em; text-transform: uppercase; color: #D4A964;">
          Evolution Stables
        </p>
        <h1 style="margin: 12px 0 0; font-size: 28px; font-weight: 600; color: #ffffff; letter-spacing: -0.02em;">
          Stake Reservation Confirmed
        </h1>
      </td>
    </tr>

    <!-- Confirmation details -->
    <tr>
      <td style="padding: 24px 0;">
        <p style="margin: 0 0 16px; font-size: 15px; line-height: 1.6; color: rgba(255,255,255,0.7);">
          Hi ${escapeHtml(purchase.customerName)},
        </p>
        <p style="margin: 0 0 16px; font-size: 15px; line-height: 1.6; color: rgba(255,255,255,0.7);">
          Your reservation for an ownership stake in <strong style="color: #ffffff;">${escapeHtml(purchase.horseName)}</strong> has been confirmed. Here are your reservation details:
        </p>

        <table width="100%" cellpadding="0" cellspacing="0" style="margin: 20px 0; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.1); border-radius: 16px; overflow: hidden;">
          <tr>
            <td style="padding: 16px 20px; width: 50%; border-right: 1px solid rgba(255,255,255,0.08);">
              <p style="margin: 0; font-size: 11px; text-transform: uppercase; letter-spacing: 0.24em; color: rgba(255,255,255,0.4);">Horse</p>
              <p style="margin: 6px 0 0; font-size: 16px; font-weight: 600; color: #ffffff;">${escapeHtml(purchase.horseName)}</p>
            </td>
            <td style="padding: 16px 20px;">
              <p style="margin: 0; font-size: 11px; text-transform: uppercase; letter-spacing: 0.24em; color: rgba(255,255,255,0.4);">Stake</p>
              <p style="margin: 6px 0 0; font-size: 16px; font-weight: 600; color: #ffffff;">${formatPercent(purchase.requestedStakePercent)}</p>
            </td>
          </tr>
          <tr>
            <td style="padding: 16px 20px; border-top: 1px solid rgba(255,255,255,0.08); border-right: 1px solid rgba(255,255,255,0.08);">
              <p style="margin: 0; font-size: 11px; text-transform: uppercase; letter-spacing: 0.24em; color: rgba(255,255,255,0.4);">Units</p>
              <p style="margin: 6px 0 0; font-size: 16px; font-weight: 600; color: #ffffff;">${purchase.requestedUnits}</p>
            </td>
            <td style="padding: 16px 20px; border-top: 1px solid rgba(255,255,255,0.08);">
              <p style="margin: 0; font-size: 11px; text-transform: uppercase; letter-spacing: 0.24em; color: rgba(255,255,255,0.4);">Amount</p>
              <p style="margin: 6px 0 0; font-size: 16px; font-weight: 600; color: #ffffff;">${formatNzd(purchase.reservationAmountNzd)}</p>
            </td>
          </tr>
        </table>

        <p style="margin: 0; font-size: 13px; color: rgba(255,255,255,0.5);">
          Reference: <strong style="color: rgba(255,255,255,0.8);">${purchase.purchaseId}</strong>
        </p>
      </td>
    </tr>

    <!-- Official Documents -->
    ${officialDocuments.length > 0 ? `
    <tr>
      <td style="padding: 24px 0; border-top: 1px solid rgba(212,169,100,0.3);">
        <p style="margin: 0 0 4px; font-size: 11px; font-weight: 600; letter-spacing: 0.24em; text-transform: uppercase; color: #D4A964;">
          Official Documents
        </p>
        <h2 style="margin: 0 0 16px; font-size: 20px; font-weight: 600; color: #ffffff;">
          Your offering documents
        </h2>
        <p style="margin: 0 0 16px; font-size: 14px; line-height: 1.6; color: rgba(255,255,255,0.6);">
          Please download and retain copies of all three official documents for your records:
        </p>
        <table width="100%" cellpadding="0" cellspacing="0">
          ${documentLinks}
        </table>
      </td>
    </tr>
    ` : ''}

    <!-- CTA -->
    <tr>
      <td style="padding: 32px 0; text-align: center;">
        <a href="${baseUrl}/mystable" style="display: inline-block; background-color: #D4A964; color: #000000; font-size: 14px; font-weight: 600; padding: 14px 32px; border-radius: 9999px; text-decoration: none; transition: background-color 0.2s;">
          View in MyStable
        </a>
      </td>
    </tr>

    <!-- Footer -->
    <tr>
      <td style="padding: 24px 0; border-top: 1px solid rgba(255,255,255,0.08);">
        <p style="margin: 0; font-size: 12px; line-height: 1.6; color: rgba(255,255,255,0.4);">
          Evolution Stables · Auckland, New Zealand<br />
          This email was sent to ${escapeHtml(purchase.customerEmail)} because you reserved a stake in ${escapeHtml(purchase.horseName)}.
        </p>
      </td>
    </tr>
  </table>

</body>
</html>`;
}