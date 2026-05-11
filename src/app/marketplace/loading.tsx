export default function MarketplaceLoading() {
  return (
    <div className="min-h-screen bg-background pt-32 md:pt-40">
      <div className="mx-auto max-w-7xl px-6 pb-24 md:px-10 lg:px-12">
        <div className="mb-12 space-y-2">
          <div className="h-3 w-32 animate-pulse rounded bg-white/10" />
          <div className="h-8 w-48 animate-pulse rounded bg-white/10" />
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="overflow-hidden rounded-2xl border border-white/10 bg-black/40"
            >
              <div className="aspect-[4/3] animate-pulse bg-white/5" />
              <div className="space-y-3 p-5">
                <div className="h-5 w-32 animate-pulse rounded bg-white/10" />
                <div className="h-4 w-48 animate-pulse rounded bg-white/5" />
                <div className="flex justify-between pt-2">
                  <div className="h-4 w-20 animate-pulse rounded bg-white/10" />
                  <div className="h-4 w-16 animate-pulse rounded bg-[#d4a964]/20" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
