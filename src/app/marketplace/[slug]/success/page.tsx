import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getStripeServer } from '@/lib/stripe-server';
import { getMarketplaceListingBySlug } from '@/lib/marketplace';
import { getOfficialDocumentsForListing } from '@/lib/marketplace-documents';
import { formatNzd, formatPercent } from '@/lib/marketplace';
import { FooterBar } from '@/components/site/Footer';
import type { Metadata } from 'next';

export function generateMetadata(): Metadata {
  return {
    title: 'Purchase Confirmed | Evolution Stables',
    robots: { index: false, follow: false },
  };
}

type SuccessPageProps = {
  searchParams: Promise<{ session_id?: string; slug?: string }>;
};

export default async function CheckoutSuccessPage({
  searchParams,
}: SuccessPageProps) {
  const { session_id, slug } = await searchParams;

  if (!session_id || !slug) {
    notFound();
  }

  const listing = getMarketplaceListingBySlug(slug);
  if (!listing) {
    notFound();
  }

  // Verify the Stripe session
  let sessionData: {
    horseName: string;
    requestedStakePercent: number;
    requestedUnits: number;
    reservationAmountNzd: number;
    customerEmail: string;
    customerName: string;
  } | null = null;

  try {
    const stripe = getStripeServer();
    const session = await stripe.checkout.sessions.retrieve(session_id);

    if (session.payment_status === 'paid') {
      const metadata = session.metadata || {};
      sessionData = {
        horseName: metadata.horseName || listing.horse.name,
        requestedStakePercent: Number(metadata.requestedStakePercent) || 0,
        requestedUnits: Number(metadata.requestedUnits) || 0,
        reservationAmountNzd: Number(metadata.reservationAmountNzd) || 0,
        customerEmail: metadata.customerEmail || '',
        customerName: metadata.customerName || '',
      };
    }
  } catch {
    // If Stripe verification fails, show a generic success message
  }

  const officialDocuments = getOfficialDocumentsForListing(listing);

  return (
    <main className="min-h-screen bg-background pt-28 text-white md:pt-36">
      <div className="mx-auto max-w-2xl space-y-8 px-6 pb-24 md:px-10">
        <div className="text-sm text-white/50">
          <Link href="/marketplace" className="transition hover:text-white">
            Marketplace
          </Link>
          <span className="px-2">/</span>
          <Link
            href={`/marketplace/${listing.slug}`}
            className="transition hover:text-white"
          >
            {listing.horse.name}
          </Link>
          <span className="px-2">/</span>
          <span>Confirmed</span>
        </div>

        <div className="rounded-3xl border border-emerald-500/20 bg-emerald-500/10 p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-emerald-300">
            Confirmed
          </p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-white">
            Stake reservation confirmed
          </h1>
          <p className="mt-3 leading-relaxed text-white/70">
            {sessionData
              ? `Your reservation for ${formatPercent(sessionData.requestedStakePercent)} in ${sessionData.horseName} has been confirmed. A confirmation email has been sent to ${sessionData.customerEmail}.`
              : `Your reservation in ${listing.horse.name} has been confirmed. Check your email for details.`}
          </p>

          {sessionData && (
            <div className="mt-6 grid gap-3 rounded-2xl border border-white/10 bg-black/20 p-4 sm:grid-cols-2">
              <p>
                <span className="block text-xs uppercase tracking-[0.24em] text-white/40">
                  Stake
                </span>
                <span className="mt-1 block font-semibold text-white">
                  {formatPercent(sessionData.requestedStakePercent)}
                </span>
              </p>
              <p>
                <span className="block text-xs uppercase tracking-[0.24em] text-white/40">
                  Units
                </span>
                <span className="mt-1 block font-semibold text-white">
                  {sessionData.requestedUnits}
                </span>
              </p>
              <p>
                <span className="block text-xs uppercase tracking-[0.24em] text-white/40">
                  Amount
                </span>
                <span className="mt-1 block font-semibold text-white">
                  {formatNzd(sessionData.reservationAmountNzd)}
                </span>
              </p>
              <p>
                <span className="block text-xs uppercase tracking-[0.24em] text-white/40">
                  Reference
                </span>
                <span className="mt-1 block font-mono text-sm font-semibold text-white">
                  {session_id.slice(0, 20)}…
                </span>
              </p>
            </div>
          )}
        </div>

        {officialDocuments.length > 0 && (
          <section className="space-y-4 rounded-2xl border border-white/10 bg-white/[0.03] p-6">
            <div>
              <p className="text-xs uppercase tracking-[0.24em] text-[#D4A964]">
                Official Documents
              </p>
              <h2 className="mt-2 text-xl font-semibold tracking-tight text-white">
                Download your offering documents
              </h2>
              <p className="mt-2 text-sm text-white/60">
                Please download and retain copies of all official documents for
                your records.
              </p>
            </div>
            <ul className="space-y-3">
              {officialDocuments.map((doc) => (
                <li key={doc.id}>
                  <a
                    href={doc.filePath}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-3 rounded-xl border border-white/10 bg-black/20 p-3 text-sm text-white transition hover:border-[#D4A964]/40 hover:text-[#D4A964]"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                      <polyline points="7 10 12 15 17 10" />
                      <line x1="12" y1="15" x2="12" y2="3" />
                    </svg>
                    {doc.title}
                  </a>
                </li>
              ))}
            </ul>
          </section>
        )}

        <div className="flex flex-col gap-3 sm:flex-row">
          <Link
            href="/mystable"
            className="inline-flex items-center justify-center rounded-full bg-[#D4A964] px-5 py-3 text-sm font-semibold text-black transition hover:bg-[#e0b779]"
          >
            View in MyStable
          </Link>
          <Link
            href="/marketplace"
            className="inline-flex items-center justify-center rounded-full border border-white/10 px-5 py-3 text-sm font-semibold text-white transition hover:border-white/20 hover:bg-white/5"
          >
            Return to Marketplace
          </Link>
        </div>
      </div>
      <FooterBar />
    </main>
  );
}