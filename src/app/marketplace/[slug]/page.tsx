import Link from 'next/link';
import { notFound, redirect } from 'next/navigation';
import { FooterBar } from '@/components/site/Footer';
import { MarketplaceStatusBadge } from '@/components/marketplace/MarketplaceStatusBadge';
import { ImageGallery } from '@/components/marketplace/ImageGallery';
import { OfficialDocumentsSection } from '@/components/marketplace/OfficialDocumentsSection';
import { PurchaseForm } from '@/components/marketplace/PurchaseForm';
import { StakeApplicationForm } from '@/components/marketplace/StakeApplicationForm';
import { formatDate, formatNzd, formatPercent, getMarketplaceListingBySlug } from '@/lib/marketplace';
import { getOperatorSession } from '@/lib/auth';
import {
  getMarketplaceReleaseStage,
  isMarketplacePreviewEnabled,
} from '@/lib/marketplace-release-stage';

export default async function MarketplaceListingPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ checkout?: string; session_id?: string }>;
}) {
  const { checkout, session_id } = await searchParams;

  // Redirect to success page if checkout=success
  if (checkout === 'success' && session_id) {
    const { slug } = await params;
    redirect(`/marketplace/${slug}/success?session_id=${session_id}&slug=${slug}`);
  }
  const stage = getMarketplaceReleaseStage();

  if (!isMarketplacePreviewEnabled()) {
    notFound();
  }

  if (stage === 'pending') {
    const session = await getOperatorSession();
    if (!session) {
      redirect('/auth?redirectedFrom=%2Fmarketplace');
    }
  }

  const { slug } = await params;
  const listing = getMarketplaceListingBySlug(slug);

  if (!listing || listing.publishStatus !== 'live') {
    notFound();
  }

  return (
    <main className="min-h-screen bg-background pt-28 text-white md:pt-36">
      <div className="mx-auto max-w-7xl space-y-10 px-6 pb-24 md:px-10 lg:px-12">
        {checkout === 'cancelled' && (
          <div className="rounded-2xl border border-amber-500/30 bg-amber-500/10 p-4 text-sm text-amber-200">
            <p className="font-semibold">Payment cancelled</p>
            <p className="mt-1 text-amber-200/70">
              Your payment was not completed. You can try again whenever you are ready.
            </p>
          </div>
        )}
        <div className="text-sm text-white/50">
          <Link href="/marketplace" className="transition hover:text-white">
            Marketplace
          </Link>
          <span className="px-2">/</span>
          <span>{listing.horse.name}</span>
        </div>

        {/* Two-column layout: content + sticky sidebar */}
        <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
          {/* Left column — scrollable content */}
          <div className="space-y-6">
            {/* Image gallery */}
            <div className="overflow-hidden rounded-[32px] border border-white/10 bg-white/[0.03] p-4 shadow-[0_30px_120px_rgba(0,0,0,0.45)]">
              <div className="relative">
                <ImageGallery
                  images={listing.images || [listing.heroImageSrc]}
                  alt={listing.horse.name}
                />
                <div className="absolute left-4 top-4 z-30">
                  <MarketplaceStatusBadge status={listing.publishStatus} />
                </div>
              </div>
              <div className="mt-4 px-1">
                <p className="text-xs uppercase tracking-[0.24em] text-[#D4A964]">{listing.trainer.stableName}</p>
                <h1 className="mt-2 text-3xl font-semibold tracking-tight text-white">{listing.horse.name}</h1>
                <p className="mt-2 text-sm text-white/70">{listing.summary}</p>
              </div>
            </div>

            {/* Key metrics */}
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                <p className="text-xs uppercase tracking-[0.24em] text-white/40">Stake Unit</p>
                <p className="mt-2 text-xl font-semibold text-white">{formatPercent(listing.offering.stakeUnitPercent)}</p>
                <p className="mt-1 text-sm text-white/55">{formatNzd(listing.offering.tokenPriceNzd)} per unit</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                <p className="text-xs uppercase tracking-[0.24em] text-white/40">Offer Size</p>
                <p className="mt-2 text-xl font-semibold text-white">{formatPercent(listing.offering.percentLeased)}</p>
                <p className="mt-1 text-sm text-white/55">{listing.offering.tokenCount} stake units</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                <p className="text-xs uppercase tracking-[0.24em] text-white/40">Total Raise</p>
                <p className="mt-2 text-xl font-semibold text-white">{formatNzd(listing.offering.totalRaiseNzd)}</p>
                <p className="mt-1 text-sm text-white/55">Manual allocation workflow</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                <p className="text-xs uppercase tracking-[0.24em] text-white/40">Investor Split</p>
                <p className="mt-2 text-xl font-semibold text-white">{formatPercent(listing.offering.investorSharePercent)}</p>
                <p className="mt-1 text-sm text-white/55">{formatPercent(listing.offering.ownerSharePercent)} owner split</p>
              </div>
            </div>

            {/* Offer details + Source links */}
            <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
              <section className="space-y-4 rounded-[28px] border border-white/10 bg-black/20 p-6">
                <div>
                  <p className="text-xs uppercase tracking-[0.24em] text-white/40">Overview</p>
                  <h2 className="mt-2 text-2xl font-semibold tracking-tight text-white">Offer details</h2>
                </div>
                <p className="text-sm leading-relaxed text-white/70">{listing.overview}</p>
                <dl className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <dt className="text-xs uppercase tracking-[0.24em] text-white/40">Horse</dt>
                    <dd className="mt-1 text-sm text-white/80">
                      {listing.horse.colour} {listing.horse.sex} by {listing.horse.sire}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs uppercase tracking-[0.24em] text-white/40">Trainer</dt>
                    <dd className="mt-1 text-sm text-white/80">{listing.trainer.name}</dd>
                  </div>
                  <div>
                    <dt className="text-xs uppercase tracking-[0.24em] text-white/40">Lease Window</dt>
                    <dd className="mt-1 text-sm text-white/80">
                      {formatDate(listing.offering.startDate)} to {formatDate(listing.offering.endDate)}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs uppercase tracking-[0.24em] text-white/40">Owner</dt>
                    <dd className="mt-1 text-sm text-white/80">{listing.owner.name}</dd>
                  </div>
                </dl>
              </section>

              <section className="space-y-4 rounded-[28px] border border-white/10 bg-black/20 p-6">
                <div>
                  <p className="text-xs uppercase tracking-[0.24em] text-white/40">Verification</p>
                  <h2 className="mt-2 text-2xl font-semibold tracking-tight text-white">Source links</h2>
                </div>
                <ul className="space-y-3 text-sm text-white/70">
                  <li>
                    <a href={listing.horse.breedingUrl} target="_blank" rel="noreferrer" className="transition hover:text-white">
                      View breeding record
                    </a>
                  </li>
                  <li>
                    <a href={listing.horse.performanceProfileUrl} target="_blank" rel="noreferrer" className="transition hover:text-white">
                      View performance profile
                    </a>
                  </li>
                  <li>
                    <a href={listing.trainer.website} target="_blank" rel="noreferrer" className="transition hover:text-white">
                      Visit trainer website
                    </a>
                  </li>
                </ul>
                <div className="rounded-2xl border border-white/10 bg-black/20 p-4 text-sm text-white/60">
                  <p className="font-semibold text-white">
                    {stage === 'pending' ? 'Review notice' : 'Marketplace notice'}
                  </p>
                  <p className="mt-2 leading-relaxed">
                    This page supports application and reservation capture only. Evolution Stables confirms next steps manually before any further investor workflow begins.
                  </p>
                </div>
              </section>
            </div>

            {/* Official documents — below the fold on mobile */}
            {listing.officialDocuments && listing.officialDocuments.length > 0 && (
              <div className="lg:hidden">
                <OfficialDocumentsSection documents={listing.officialDocuments} />
              </div>
            )}

            {/* Disclaimers */}
            <section className="rounded-[28px] border border-white/10 bg-black/20 p-6">
              <p className="text-xs uppercase tracking-[0.24em] text-white/40">Important</p>
              <ul className="mt-4 space-y-3 text-sm leading-relaxed text-white/65">
                {listing.disclaimers.map((item) => (
                  <li key={item}>• {item}</li>
                ))}
              </ul>
            </section>
          </div>

          {/* Right column — sticky sidebar */}
          <div className="lg:sticky lg:top-28 lg:self-start lg:space-y-6">
            {listing.officialDocuments && listing.officialDocuments.length > 0 ? (
              <>
                <PurchaseForm listing={listing} />
                <OfficialDocumentsSection documents={listing.officialDocuments} />
              </>
            ) : (
              <StakeApplicationForm listing={listing} />
            )}
          </div>
        </div>
      </div>
      <FooterBar />
    </main>
  );
}
