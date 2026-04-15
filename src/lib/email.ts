import { Resend } from 'resend';

/**
 * Returns a configured Resend client instance.
 * Requires the RESEND_API_KEY environment variable.
 */
export function getResendClient(): Resend {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    throw new Error('Missing RESEND_API_KEY environment variable');
  }
  return new Resend(apiKey);
}

/**
 * The "from" address for all transactional emails.
 * Uses the Resend default domain for development; should be
 * configured to use a custom domain in production.
 */
export const EMAIL_FROM = 'Evolution Stables <noreply@evolutionstables.nz>';