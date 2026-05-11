export default function DemoLoading() {
  return (
    <div className="min-h-screen bg-black">
      <div className="relative flex h-screen w-full flex-col items-center justify-center overflow-hidden">
        <div className="absolute inset-0 animate-pulse bg-black/80" />
        <div className="relative z-10 space-y-4 text-center">
          <div className="mx-auto h-10 w-48 animate-pulse rounded bg-[#d4af37]/20" />
          <div className="mx-auto h-5 w-80 animate-pulse rounded bg-white/10" />
        </div>
      </div>
      <div className="min-h-screen bg-[#0a0a0a] pt-24">
        <div className="mx-auto max-w-7xl space-y-20 px-6 py-12 md:px-10 lg:px-12">
          {Array.from({ length: 2 }).map((_, i) => (
            <div
              key={i}
              className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2"
            >
              <div className="space-y-4">
                <div className="h-3 w-24 animate-pulse rounded bg-white/10" />
                <div className="h-8 w-48 animate-pulse rounded bg-white/10" />
                <div className="h-16 w-full animate-pulse rounded bg-white/5" />
              </div>
              <div className="min-h-[400px] animate-pulse rounded-2xl bg-white/5" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
