export type StripeCheckoutSession = {
  sessionId: string;
  url: string;
  listingId: string;
  listingSlug: string;
  horseName: string;
  requestedStakePercent: number;
  requestedUnits: number;
  reservationAmountNzd: number;
  customerEmail: string;
  customerName: string;
  status: 'pending' | 'completed' | 'expired' | 'cancelled';
  createdAt: string;
};

export type StripeCheckoutResult =
  | { ok: true; sessionId: string; url: string }
  | { ok: false; error: string };