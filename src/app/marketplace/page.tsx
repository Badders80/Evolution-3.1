import Image from "next/image";
import Link from "next/link";
import { getAllListings } from "@/lib/db/queries/listings";
import { MarketplaceStatusBadge } from "@/components/marketplace/MarketplaceStatusBadge";
import { FooterBar } from "@/components/site/Footer";
import { BreadcrumbStructuredData } from "@/components/seo/BreadcrumbStructuredData";

export default function MarketplacePage() {
  const listings = getAllListings("live");

  return (
    <>
      <BreadcrumbStructuredData
        items={[
          { name: "Home", item: "https://evolutionstables.nz" },
          {
            name: "Marketplace",
            item: "https://evolutionstables.nz/marketplace",
          },
        ]}
      />
      <main className="min-h-screen bg-background text-white pt-32 md:pt-40">
        <div className="mx-auto max-w-7xl px-6 pb-24 md:px-10 lg:px-12">
          <p className="mb-2 text-xs uppercase tracking-[0.28em] text-white/40">
            Evolution Stables
          </p>
          <h1 className="mb-8 text-4xl font-medium tracking-tight text-white">
            Marketplace
          </h1>

          {listings.length === 0 ? (
            <p className="text-white/60">No live listings available.</p>
          ) : (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {listings.map((listing) => (
                <Link
                  key={listing.id}
                  href={`/marketplace/${listing.slug}`}
                  className="group relative overflow-hidden rounded-2xl border border-white/10 bg-black/40 transition-all duration-300 hover:-translate-y-1 hover:border-white/20"
                >
                  <div className="aspect-[4/3] relative overflow-hidden">
                    {listing.heroImageSrc ? (
                      <Image
                        src={listing.heroImageSrc}
                        alt={listing.horse.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center bg-white/5">
                        <span className="text-white/20">No image</span>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  </div>
                  <div className="p-5 space-y-3">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold text-white">
                        {listing.horse.name}
                      </h3>
                      <MarketplaceStatusBadge status={listing.publishStatus} />
                    </div>
                    <p className="text-sm text-white/60">
                      {listing.trainer.name} · {listing.trainer.stableName}
                    </p>
                    <div className="flex items-center justify-between pt-2 border-t border-white/10">
                      <span className="text-sm text-white/40">
                        {listing.offering.tokenCount} shares
                      </span>
                      <span className="text-sm font-medium text-[#d4a964]">
                        ${listing.offering.tokenPriceNzd.toLocaleString()} NZD
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
        <div className="mt-24">
          <FooterBar />
        </div>
      </main>
    </>
  );
}
