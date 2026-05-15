import { notFound } from "next/navigation";
import Image from "next/image";
import { getListingBySlug } from "@/lib/db/queries/listings";
import { MarketplaceStatusBadge } from "@/components/marketplace/MarketplaceStatusBadge";
import { FooterBar } from "@/components/site/Footer";

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function ListingDetailPage({ params }: Props) {
  const { slug } = await params;
  const listing = getListingBySlug(slug);

  if (!listing) {
    notFound();
  }

  const {
    horse,
    trainer,
    owner,
    offering,
    summary,
    overview,
    heroImageSrc,
    images,
    disclaimers,
  } = listing;

  const isOwnership = offering.offeringType === "ownership";
  const isLease = offering.offeringType === "lease" || !offering.offeringType;

  const availableShares = isLease
    ? Math.max(0, (offering.tokenCount ?? 0) - (offering.percentLeased || 0))
    : 0;
  const percentAvailable = isLease
    ? Math.round((availableShares / (offering.tokenCount ?? 1)) * 100)
    : (offering.percentAvailable ?? 0);

  return (
    <main className="min-h-screen bg-background text-mp-text-primary pt-32 md:pt-40">
      <div className="mx-auto max-w-7xl px-6 pb-24 md:px-10 lg:px-12">
        {/* Breadcrumb */}
        <div className="mb-6 flex items-center gap-2 text-sm text-mp-text-tertiary">
          <a
            href="/marketplace"
            className="hover:text-mp-text-secondary transition"
          >
            Marketplace
          </a>
          <span>/</span>
          <span className="text-mp-text-secondary">{horse.name}</span>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Left: Images */}
          <div className="space-y-4">
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-mp-border-prominent">
              {heroImageSrc ? (
                <Image
                  src={heroImageSrc}
                  alt={horse.name}
                  fill
                  className="object-cover"
                  priority
                />
              ) : (
                <div className="flex h-full items-center justify-center bg-mp-surface-elevated">
                  <span className="text-mp-text-tertiary">No image</span>
                </div>
              )}
            </div>
            {images.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {images.slice(1, 5).map((img, i) => (
                  <div
                    key={i}
                    className="relative aspect-square overflow-hidden rounded-lg border border-mp-border-prominent"
                  >
                    <Image
                      src={img}
                      alt={`${horse.name} ${i + 1}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right: Details */}
          <div className="space-y-6">
            <div className="flex items-start justify-between">
              <div>
                <h1 className="text-3xl font-semibold tracking-tight text-mp-text-primary">
                  {horse.name}
                </h1>
                <p className="mt-1 text-mp-text-secondary">
                  {horse.sex} · {horse.colour} · Born {horse.foalingDate}
                </p>
              </div>
              <MarketplaceStatusBadge status={listing.publishStatus} />
            </div>

            <div className="space-y-2 rounded-xl border border-mp-border-prominent bg-mp-surface-card p-5">
              <div className="flex items-center justify-between">
                <h3 className="text-xs uppercase tracking-mp-label text-mp-text-tertiary">
                  {isOwnership ? "Ownership Offering" : "Syndicate Offering"}
                </h3>
                <span className="rounded-full border border-mp-border-prominent px-2.5 py-0.5 text-[10px] uppercase tracking-widest text-mp-text-tertiary">
                  {isOwnership ? "Ownership" : "Lease"}
                </span>
              </div>

              {isOwnership ? (
                /* ── Ownership Offering Card ── */
                <div className="space-y-4 pt-2">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-white/40">Price per 1%</p>
                      <p className="text-lg font-medium text-mp-accent">
                        ${offering.pricePerOnePercentNzd.toLocaleString()} NZD
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-mp-text-tertiary">
                        % Available
                      </p>
                      <p className="text-lg font-medium text-mp-text-primary">
                        {offering.percentAvailable}%
                      </p>
                    </div>
                    {offering.purchasePriceNzd && (
                      <div>
                        <p className="text-xs text-mp-text-tertiary">
                          Purchase price
                        </p>
                        <p className="text-lg font-medium text-mp-text-primary">
                          ${offering.purchasePriceNzd.toLocaleString()} NZD
                        </p>
                      </div>
                    )}
                    {offering.monthlyCostPerOnePercentNzd != null && (
                      <div>
                        <p className="text-xs text-mp-text-tertiary">
                          Monthly per 1%
                        </p>
                        <p className="text-lg font-medium text-mp-text-primary">
                          $
                          {offering.monthlyCostPerOnePercentNzd.toLocaleString()}{" "}
                          NZD
                        </p>
                      </div>
                    )}
                  </div>

                  {offering.shareSizeOptions &&
                    offering.shareSizeOptions.length > 0 && (
                      <div className="space-y-2 pt-2 border-t border-mp-border-prominent">
                        <p className="text-xs text-mp-text-tertiary">
                          Share sizes
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {offering.shareSizeOptions.map((size) => (
                            <div
                              key={size}
                              className="rounded-lg border border-mp-border-prominent bg-mp-surface-card px-3 py-2 text-center"
                            >
                              <p className="text-sm font-medium text-mp-text-primary">
                                {size}%
                              </p>
                              <p className="text-xs text-mp-accent">
                                $
                                {(
                                  offering.pricePerOnePercentNzd * size
                                ).toLocaleString()}{" "}
                                NZD
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                  {offering.monthlyCostPerOnePercentNzd != null &&
                    offering.monthlyCostPerOnePercentNzd > 0 && (
                      <div className="rounded-lg border border-mp-border-subtle bg-mp-surface-elevated p-3">
                        <p className="text-xs text-mp-text-tertiary mb-1">
                          Ongoing costs
                        </p>
                        <p className="text-sm text-mp-text-secondary">
                          $
                          {offering.monthlyCostPerOnePercentNzd.toLocaleString()}{" "}
                          NZD per 1% per month
                          {offering.monthlyCostStartDate && (
                            <span className="text-mp-text-tertiary">
                              {" "}
                              from {offering.monthlyCostStartDate}
                            </span>
                          )}
                        </p>
                        {offering.managementFeeNzd != null &&
                          offering.managementFeeNzd > 0 && (
                            <p className="text-xs text-mp-text-tertiary mt-1">
                              Management fee: $
                              {offering.managementFeeNzd.toLocaleString()}/mo
                              {offering.managementFeeCapped ? " (capped)" : ""}
                            </p>
                          )}
                      </div>
                    )}

                  {offering.costsIncludedInBuyIn &&
                    offering.costsIncludedInBuyIn.length > 0 && (
                      <div className="rounded-lg border border-mp-border-subtle bg-mp-surface-elevated p-3">
                        <p className="text-xs text-mp-text-tertiary mb-1">
                          Buy-in includes
                        </p>
                        <ul className="flex flex-wrap gap-x-3 gap-y-1">
                          {offering.costsIncludedInBuyIn.map((item, i) => (
                            <li
                              key={i}
                              className="text-xs text-mp-text-secondary"
                            >
                              ✓ {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                </div>
              ) : (
                /* ── Lease Offering Card (original) ── */
                <div className="grid grid-cols-2 gap-4 pt-2">
                  <div>
                    <p className="text-xs text-mp-text-tertiary">
                      Price per share
                    </p>
                    <p className="text-lg font-medium text-mp-accent">
                      ${(offering.tokenPriceNzd ?? 0).toLocaleString()} NZD
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-mp-text-tertiary">
                      Total shares
                    </p>
                    <p className="text-lg font-medium text-mp-text-primary">
                      {offering.tokenCount ?? 0}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-mp-text-tertiary">Available</p>
                    <p className="text-lg font-medium text-mp-text-primary">
                      {availableShares} ({percentAvailable}%)
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-mp-text-tertiary">Total raise</p>
                    <p className="text-lg font-medium text-mp-text-primary">
                      ${(offering.totalRaiseNzd ?? 0).toLocaleString()} NZD
                    </p>
                  </div>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <h3 className="text-xs uppercase tracking-mp-label text-mp-text-tertiary">
                Trainer
              </h3>
              <p className="text-mp-text-primary">{trainer.name}</p>
              <p className="text-sm text-mp-text-secondary">
                {trainer.stableName} · {trainer.location}
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="text-xs uppercase tracking-mp-label text-mp-text-tertiary">
                Owner
              </h3>
              <p className="text-mp-text-primary">{owner.name}</p>
              <p className="text-sm text-mp-text-secondary">
                {owner.entityType}
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="text-xs uppercase tracking-mp-label text-mp-text-tertiary">
                About
              </h3>
              <p className="text-sm leading-relaxed text-mp-text-secondary">
                {summary}
              </p>
              <p className="text-sm leading-relaxed text-mp-text-secondary">
                {overview}
              </p>
            </div>

            {/* CTA */}
            {isOwnership ? (
              <div className="rounded-xl border border-mp-accent-subtle bg-mp-accent-muted p-5">
                <h3 className="text-sm font-medium text-mp-accent mb-2">
                  Interested in this horse?
                </h3>
                <p className="text-sm text-mp-text-secondary mb-4">
                  Register your interest and we&apos;ll connect you with the
                  syndicator. No commitment required — express your interest and
                  we&apos;ll take it from there.
                </p>
                <a
                  href="/mystable"
                  className="inline-flex items-center justify-center rounded-lg bg-mp-accent px-6 py-3 text-sm font-medium text-mp-text-inverse transition hover:bg-mp-accent-hover"
                >
                  Register Interest
                </a>
              </div>
            ) : (
              <div className="rounded-xl border border-mp-accent-subtle bg-mp-accent-muted p-5">
                <h3 className="text-sm font-medium text-mp-accent mb-2">
                  Interested in this horse?
                </h3>
                <p className="text-sm text-mp-text-secondary mb-4">
                  Complete KYC verification to purchase shares. Once approved,
                  you can buy instantly via Stripe.
                </p>
                <a
                  href="/mystable"
                  className="inline-flex items-center justify-center rounded-lg bg-mp-accent px-6 py-3 text-sm font-medium text-mp-text-inverse transition hover:bg-mp-accent-hover"
                >
                  Go to MyStable to Purchase
                </a>
              </div>
            )}

            {disclaimers.length > 0 && (
              <div className="space-y-2">
                <h3 className="text-xs uppercase tracking-mp-label text-mp-text-tertiary">
                  Disclaimers
                </h3>
                <ul className="list-disc pl-4 space-y-1">
                  {disclaimers.map((d, i) => (
                    <li key={i} className="text-xs text-mp-text-tertiary">
                      {d}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="mt-24">
        <FooterBar />
      </div>
    </main>
  );
}
