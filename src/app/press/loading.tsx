export default function PressLoading() {
  return (
    <div className="min-h-screen pt-32 pb-20 bg-[#0a0a0a]">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="mb-20 max-w-3xl space-y-4">
          <div className="flex items-center gap-4">
            <div className="h-3 w-24 animate-pulse rounded bg-white/10" />
            <div className="h-px w-12 bg-[#d4af37]/30" />
          </div>
          <div className="space-y-2">
            <div className="h-12 w-80 animate-pulse rounded bg-white/10" />
            <div className="h-12 w-64 animate-pulse rounded bg-white/5" />
          </div>
          <div className="h-5 w-96 animate-pulse rounded bg-white/5" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="space-y-6">
              <div className="aspect-[16/9] animate-pulse rounded-sm bg-white/5" />
              <div className="space-y-3">
                <div className="h-3 w-32 animate-pulse rounded bg-white/10" />
                <div className="h-5 w-full animate-pulse rounded bg-white/10" />
                <div className="h-4 w-3/4 animate-pulse rounded bg-white/5" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
