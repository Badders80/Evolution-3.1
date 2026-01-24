import { constructMetadata } from "@/lib/seo";

export const metadata = constructMetadata({
  title: "Fractional Ownership",
  description: "Experience elite racehorse ownership through fractional stakes, making it accessible to everyone.",
  canonical: "/fractional-ownership",
});

export default function FractionalOwnershipPage() {
  return (
    <main className="pt-20">
      <section className="py-32 md:py-48 bg-background">
        <div className="max-w-7xl mx-auto px-8 md:px-12">
          <header className="mb-32 max-w-4xl">
            <p className="label-overline mb-8">Accessibility</p>
            <h1 className="text-display mb-12">
              Elite Racing <br />
              <span className="text-brand-gold italic">For Everyone</span>
            </h1>
            <p className="body-lead text-xl max-w-2xl text-neutral-400">
              Fractional ownership lowers the barriers to entry, allowing
              you to participate in high-performance thoroughbreds with
              capital levels that suit you.
            </p>
          </header>

          <div className="bg-white/[0.02] p-12 md:p-20 rounded-3xl border border-white/5 space-y-12">
            <div className="grid md:grid-cols-2 gap-20 items-center">
              <div className="space-y-8">
                <h3 className="text-4xl font-light text-white tracking-tight">Sharing the <span className="text-brand-gold italic">Risk & Reward</span></h3>
                <p className="body-standard text-lg text-neutral-400 font-light leading-relaxed">
                  By owning a fraction of multiple horses rather than a 100%
                  stake in one, you can diversify your portfolio across different
                  bloodlines, trainers, and racing types.
                </p>
              </div>
              <div className="p-10 bg-black/40 rounded-2xl border border-white/10 backdrop-blur-sm">
                <p className="label-overline mb-8 text-neutral-500">Example Structure</p>
                <div className="space-y-4">
                  <div className="flex justify-between border-b border-white/5 pb-4">
                    <span className="text-xs uppercase tracking-widest text-neutral-400">Minimum Stake</span>
                    <span className="text-xl font-light text-brand-gold">$1,000</span>
                  </div>
                  <div className="flex justify-between border-b border-white/5 pb-4">
                    <span className="text-xs uppercase tracking-widest text-neutral-400">Platform Fee</span>
                    <span className="text-xl font-light text-white">0.5%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-xs uppercase tracking-widest text-neutral-400">Trading Fee</span>
                    <span className="text-xl font-light text-white">1%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
