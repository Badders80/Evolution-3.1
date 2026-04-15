'use client';

import { getMarketplaceListings } from '@/lib/marketplace';
import { FooterBar } from '@/components/site/Footer';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { isMarketplacePreviewEnabled } from '@/lib/marketplace-release-stage';

export default function MarketplacePage() {
  const [listings, setListings] = useState<Array<any>>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        setLoading(true);
        const marketplaceListings = getMarketplaceListings('live');
        setListings(marketplaceListings);
        setError(null);
      } catch (err) {
        console.error('Failed to fetch marketplace listings:', err);
        setError('Failed to load marketplace data');
      } finally {
        setLoading(false);
      }
    };

    fetchListings();
  }, []);

  // If marketplace is not enabled, show coming soon page
  if (!isMarketplacePreviewEnabled()) {
    return (
      <main className="min-h-screen bg-background pt-32 text-white md:pt-40">
        <div className="mx-auto max-w-7xl space-y-24 px-6 pb-24 md:px-10 lg:px-12">
          <div className="text-center py-20">
            <h2 className="text-4xl font-medium tracking-tight text-white mb-6">
              Marketplace
            </h2>
            <p className="text-base leading-relaxed text-white/60 max-w-2xl mx-auto">
              The Evolution Stables Marketplace is currently under development.
              Please check back soon for live ownership opportunities.
            </p>
          </div>
        </div>
        <div className="mt-24">
          <FooterBar />
        </div>
      </main>
    );
  }

  // If no listings found, show empty state
  if (listings.length === 0 && !error) {
    return (
      <main className="min-h-screen bg-background pt-32 text-white md:pt-40">
        <div className="mx-auto max-w-7xl space-y-24 px-6 pb-24 md:px-10 lg:px-12">
          <div className="text-center py-20">
            <h2 className="text-4xl font-medium tracking-tight text-white mb-6">
              Marketplace
            </h2>
            <p className="text-base leading-relaxed text-white/60 max-w-2xl mx-auto">
              No live marketplace opportunities are currently available.
              Please check back soon for new listings.
            </p>
          </div>
        </div>
        <div className="mt-24">
          <FooterBar />
        </div>
      </main>
    );
  }

  // If there's an error, show error state
  if (error) {
    return (
      <main className="min-h-screen bg-background pt-32 text-white md:pt-40">
        <div className="mx-auto max-w-7xl space-y-24 px-6 pb-24 md:px-10 lg:px-12">
          <div className="text-center py-20">
            <h2 className="text-4xl font-medium tracking-tight text-white mb-6">
              Marketplace
            </h2>
            <p className="text-base leading-relaxed text-white/60 max-w-2xl mx-auto">
              {error}
            </p>
            <p className="mt-4 text-sm text-white/50">
              Please try again later or contact support if the issue persists.
            </p>
          </div>
        </div>
        <div className="mt-24">
          <FooterBar />
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background pt-32 text-white md:pt-40">
      <div className="mx-auto max-w-7xl space-y-16 px-6 pb-24 md:px-10 lg:px-12">
        <section className="space-y-8">
          <div className="space-y-4">
            <p className="text-xs uppercase tracking-[0.28em] text-[#D4A964]">
              Evolution Stables
            </p>
            <h2 className="text-4xl font-medium tracking-tight text-white md:text-5xl">
              Marketplace
            </h2>
            <p className="max-w-2xl text-base leading-relaxed text-white/60">
              Discover and explore digital-syndication opportunities within the
              Evolution ecosystem. Browse live offerings, ownership positions,
              and verified racehorse data — all designed to make racehorse
              ownership more accessible and connected.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            {listings.map((listing) => (
              <a
                key={listing.id}
                href={`/marketplace/${listing.slug}`}
                className="group relative min-h-[360px] overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.03] via-transparent to-black/80 shadow-[0_30px_120px_rgba(0,0,0,0.45)] transition-transform duration-300 hover:-translate-y-1"
              >
                <div className="absolute inset-0 z-10">
                  <Image
                    src={listing.heroImageSrc}
                    alt={listing.title}
                    fill
                    className="object-cover object-center"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                </div>

                <div className="pointer-events-none absolute inset-0 z-10 rounded-3xl border border-white/5" />

                <div className="absolute bottom-0 left-0 right-0 z-20 p-6">
                  <p className="text-xs uppercase tracking-[0.24em] text-[#D4A964]">
                    {listing.trainer.stableName}
                  </p>
                  <h3 className="mt-2 text-3xl font-semibold tracking-tight text-white">
                    {listing.horse.name}
                  </h3>
                  <p className="mt-2 max-w-xl text-sm text-white/75">
                    {listing.summary}
                  </p>
                  <div className="mt-4 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.3em] text-[#D4A964] transition group-hover:text-[#e0b779]">
                    View Opportunity
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </section>
      </div>
      <div className="mt-24">
        <FooterBar />
      </div>
    </main>
  );
}
