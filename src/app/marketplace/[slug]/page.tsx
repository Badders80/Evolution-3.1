import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Image from "next/image";
import { getListingBySlug } from "@/lib/db/queries/listings";
import { MarketplaceStatusBadge } from "@/components/marketplace/MarketplaceStatusBadge";
import { PurchaseCta } from "@/components/marketplace/PurchaseCta";
import { FooterBar } from "@/components/site/Footer";
import { ListingStructuredData } from "@/components/seo/ListingStructuredData";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const listing = getListingBySlug(slug);

  if (!listing) {
    return {
      title: "Listing Not Found | Evolution Stables",
    };
  }

  const { horse, offering, summary, title } = listing;
  const pageTitle = title || `${horse.name} — Racehorse Syndicate`;
  const description =
    summary ||
    `Own shares in ${horse.name}, trained by ${listing.trainer.name}. ${offering.tokenCount} shares at $${offering.tokenPriceNzd.toLocaleString()} NZD each.`;
  const pageUrl = `https://evolutionstables.nz/marketplace/${slug}`;

  return {
    title: `${pageTitle} | Evolution Stables Marketplace`,
    description,
    alternates: {
      canonical: `/marketplace/${slug}`,
    },
    openGraph: {
      type: "website",
      locale: "en_NZ",
      url: pageUrl,
      siteName: "Evolution Stables",
      title: pageTitle,
      description,
      images: [
        {
          url: `/marketplace/${slug}/opengraph-image`,
          width: 1200,
          height: 630,
          alt: `${horse.name} — Racehorse Syndicate`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      site: "@EvolutionStables",
      title: pageTitle,
      description,
    },
  };
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

  const availableShares = Math.max(
    0,
    offering.tokenCount - (offering.percentLeased || 0),
  );
  const percentAvailable = Math.round(
    (availableShares / offering.tokenCount) * 100,
  );

  const pageUrl = `https://evolutionstables.nz/marketplace/${slug}`;

  return (
    <>
      <ListingStructuredData listing={listing} url={pageUrl} />
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
                <h3 className="text-xs uppercase tracking-[0.28em] text-white/40">
                  Syndicate Offering
                </h3>
                <div className="grid grid-cols-2 gap-4 pt-2">
                  <div>
                    <p className="text-xs text-white/40">Price per share</p>
                    <p className="text-lg font-medium text-[#d4a964]">
                      ${offering.tokenPriceNzd.toLocaleString()} NZD
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-white/40">Total shares</p>
                    <p className="text-lg font-medium text-white">
                      {offering.tokenCount}
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
                      ${offering.totalRaiseNzd.toLocaleString()} NZD
                    </p>
                  </div>
                </div>
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
                <p className="text-sm leading-relaxed text-white/70">
                  {summary}
                </p>
                <p className="text-sm leading-relaxed text-white/70">
                  {overview}
                </p>
              </div>

              {/* Purchase CTA */}
              <PurchaseCta
                listingSlug={slug}
                tokenPrice={offering.tokenPriceNzd}
                maxShares={availableShares}
                officialDocuments={listing.officialDocuments}
              />

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
    </>
  );
}
