import Stripe from 'stripe';

/**
 * Returns a configured Stripe server instance.
 * Requires the STRIPE_SECRET_KEY environment variable.
 */
export function getStripeServer(): Stripe {
  const secretKey = process.env.STRIPE_SECRET_KEY;
  if (!secretKey) {
    throw new Error('Missing STRIPE_SECRET_KEY environment variable');
  }
  return new Stripe(secretKey, {
    apiVersion: '2026-03-25.dahlia',
  });
}