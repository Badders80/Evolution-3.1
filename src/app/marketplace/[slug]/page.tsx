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
    <main className="min-h-screen bg-background text-white pt-32 md:pt-40">
      <div className="mx-auto max-w-7xl px-6 pb-24 md:px-10 lg:px-12">
        {/* Breadcrumb */}
        <div className="mb-6 flex items-center gap-2 text-sm text-white/40">
          <a href="/marketplace" className="hover:text-white/60 transition">
            Marketplace
          </a>
          <span>/</span>
          <span className="text-white/60">{horse.name}</span>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Left: Images */}
          <div className="space-y-4">
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-white/10">
              {heroImageSrc ? (
                <Image
                  src={heroImageSrc}
                  alt={horse.name}
                  fill
                  className="object-cover"
                  priority
                />
              ) : (
                <div className="flex h-full items-center justify-center bg-white/5">
                  <span className="text-white/20">No image</span>
                </div>
              )}
            </div>
            {images.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {images.slice(1, 5).map((img, i) => (
                  <div
                    key={i}
                    className="relative aspect-square overflow-hidden rounded-lg border border-white/10"
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
                <h1 className="text-3xl font-semibold tracking-tight text-white">
                  {horse.name}
                </h1>
                <p className="mt-1 text-white/60">
                  {horse.sex} · {horse.colour} · Born {horse.foalingDate}
                </p>
              </div>
              <MarketplaceStatusBadge status={listing.publishStatus} />
            </div>

            <div className="space-y-2 rounded-xl border border-white/10 bg-white/[0.03] p-5">
              <div className="flex items-center justify-between">
                <h3 className="text-xs uppercase tracking-[0.28em] text-white/40">
                  {isOwnership ? "Ownership Offering" : "Syndicate Offering"}
                </h3>
                <span className="rounded-full border border-white/10 px-2.5 py-0.5 text-[10px] uppercase tracking-widest text-white/40">
                  {isOwnership ? "Ownership" : "Lease"}
                </span>
              </div>

              {isOwnership ? (
                /* ── Ownership Offering Card ── */
                <div className="space-y-4 pt-2">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-white/40">Price per 1%</p>
                      <p className="text-lg font-medium text-[#d4a964]">
                        ${offering.pricePerOnePercentNzd.toLocaleString()} NZD
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-white/40">% Available</p>
                      <p className="text-lg font-medium text-white">
                        {offering.percentAvailable}%
                      </p>
                    </div>
                    {offering.purchasePriceNzd && (
                      <div>
                        <p className="text-xs text-white/40">Purchase price</p>
                        <p className="text-lg font-medium text-white">
                          ${offering.purchasePriceNzd.toLocaleString()} NZD
                        </p>
                      </div>
                    )}
                    {offering.monthlyCostPerOnePercentNzd != null && (
                      <div>
                        <p className="text-xs text-white/40">Monthly per 1%</p>
                        <p className="text-lg font-medium text-white">
                          $
                          {offering.monthlyCostPerOnePercentNzd.toLocaleString()}{" "}
                          NZD
                        </p>
                      </div>
                    )}
                  </div>

                  {offering.shareSizeOptions &&
                    offering.shareSizeOptions.length > 0 && (
                      <div className="space-y-2 pt-2 border-t border-white/10">
                        <p className="text-xs text-white/40">Share sizes</p>
                        <div className="flex flex-wrap gap-2">
                          {offering.shareSizeOptions.map((size) => (
                            <div
                              key={size}
                              className="rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2 text-center"
                            >
                              <p className="text-sm font-medium text-white">
                                {size}%
                              </p>
                              <p className="text-xs text-[#d4a964]">
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
                      <div className="rounded-lg border border-white/5 bg-white/[0.02] p-3">
                        <p className="text-xs text-white/40 mb-1">
                          Ongoing costs
                        </p>
                        <p className="text-sm text-white/70">
                          $
                          {offering.monthlyCostPerOnePercentNzd.toLocaleString()}{" "}
                          NZD per 1% per month
                          {offering.monthlyCostStartDate && (
                            <span className="text-white/40">
                              {" "}
                              from {offering.monthlyCostStartDate}
                            </span>
                          )}
                        </p>
                        {offering.managementFeeNzd != null &&
                          offering.managementFeeNzd > 0 && (
                            <p className="text-xs text-white/40 mt-1">
                              Management fee: $
                              {offering.managementFeeNzd.toLocaleString()}/mo
                              {offering.managementFeeCapped ? " (capped)" : ""}
                            </p>
                          )}
                      </div>
                    )}

                  {offering.costsIncludedInBuyIn &&
                    offering.costsIncludedInBuyIn.length > 0 && (
                      <div className="rounded-lg border border-white/5 bg-white/[0.02] p-3">
                        <p className="text-xs text-white/40 mb-1">
                          Buy-in includes
                        </p>
                        <ul className="flex flex-wrap gap-x-3 gap-y-1">
                          {offering.costsIncludedInBuyIn.map((item, i) => (
                            <li key={i} className="text-xs text-white/60">
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
                    <p className="text-xs text-white/40">Price per share</p>
                    <p className="text-lg font-medium text-[#d4a964]">
                      ${(offering.tokenPriceNzd ?? 0).toLocaleString()} NZD
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-white/40">Total shares</p>
                    <p className="text-lg font-medium text-white">
                      {offering.tokenCount ?? 0}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-white/40">Available</p>
                    <p className="text-lg font-medium text-white">
                      {availableShares} ({percentAvailable}%)
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-white/40">Total raise</p>
                    <p className="text-lg font-medium text-white">
                      ${(offering.totalRaiseNzd ?? 0).toLocaleString()} NZD
                    </p>
                  </div>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <h3 className="text-xs uppercase tracking-[0.28em] text-white/40">
                Trainer
              </h3>
              <p className="text-white">{trainer.name}</p>
              <p className="text-sm text-white/60">
                {trainer.stableName} · {trainer.location}
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="text-xs uppercase tracking-[0.28em] text-white/40">
                Owner
              </h3>
              <p className="text-white">{owner.name}</p>
              <p className="text-sm text-white/60">{owner.entityType}</p>
            </div>

            <div className="space-y-2">
              <h3 className="text-xs uppercase tracking-[0.28em] text-white/40">
                About
              </h3>
              <p className="text-sm leading-relaxed text-white/70">{summary}</p>
              <p className="text-sm leading-relaxed text-white/70">
                {overview}
              </p>
            </div>

            {/* CTA */}
            {isOwnership ? (
              <div className="rounded-xl border border-[#d4a964]/30 bg-[#d4a964]/5 p-5">
                <h3 className="text-sm font-medium text-[#d4a964] mb-2">
                  Interested in this horse?
                </h3>
                <p className="text-sm text-white/60 mb-4">
                  Register your interest and we&apos;ll connect you with the
                  syndicator. No commitment required — express your interest and
                  we&apos;ll take it from there.
                </p>
                <a
                  href="/mystable"
                  className="inline-flex items-center justify-center rounded-lg bg-[#d4a964] px-6 py-3 text-sm font-medium text-black transition hover:bg-[#c49a54]"
                >
                  Register Interest
                </a>
              </div>
            ) : (
              <div className="rounded-xl border border-[#d4a964]/30 bg-[#d4a964]/5 p-5">
                <h3 className="text-sm font-medium text-[#d4a964] mb-2">
                  Interested in this horse?
                </h3>
                <p className="text-sm text-white/60 mb-4">
                  Complete KYC verification to purchase shares. Once approved,
                  you can buy instantly via Stripe.
                </p>
                <a
                  href="/mystable"
                  className="inline-flex items-center justify-center rounded-lg bg-[#d4a964] px-6 py-3 text-sm font-medium text-black transition hover:bg-[#c49a54]"
                >
                  Go to MyStable to Purchase
                </a>
              </div>
            )}

            {disclaimers.length > 0 && (
              <div className="space-y-2">
                <h3 className="text-xs uppercase tracking-[0.28em] text-white/40">
                  Disclaimers
                </h3>
                <ul className="list-disc pl-4 space-y-1">
                  {disclaimers.map((d, i) => (
                    <li key={i} className="text-xs text-white/40">
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
