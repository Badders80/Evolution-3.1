import { constructMetadata } from "@/lib/seo";

export const metadata = constructMetadata({
  title: "Fractional Ownership",
  description: "Experience elite racehorse ownership through fractional stakes, making it accessible to everyone.",
  canonical: "/fractional-ownership",
});

export default function FractionalOwnershipPage() {
  return (
    <main className="pt-20">
      <section className="py-24 bg-background">
        <div className="max-w-6xl mx-auto px-6">
          <header className="mb-20 max-w-3xl">
            <p className="label-overline mb-6">Accessibility</p>
            <h1 className="heading-hero mb-8">
              Elite Racing <br />
              <span className="text-primary italic">For Everyone</span>
            </h1>
            <p className="body-lead">
              Fractional ownership lowers the barriers to entry, allowing
              you to participate in high-performance thoroughbreds with
              capital levels that suit you.
            </p>
          </header>

          <div className="bg-surface p-12 rounded-2xl border border-white/5 space-y-12">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="heading-sub mb-4">Sharing the Risk & Reward</h3>
                <p className="body-standard">
                  By owning a fraction of multiple horses rather than a 100%
                  stake in one, you can diversify your portfolio across different
                  bloodlines, trainers, and racing types.
                </p>
              </div>
              <div className="p-8 bg-black/50 rounded-xl border border-white/5">
                <p className="label-overline mb-4">Example Structure</p>
                <div className="space-y-2">
                  <div className="flex justify-between border-b border-white/5 py-2">
                    <span className="body-small uppercase">Minimum Stake</span>
                    <span className="body-standard text-primary">$1,000</span>
                  </div>
                  <div className="flex justify-between border-b border-white/5 py-2">
                    <span className="body-small uppercase">Platform Fee</span>
                    <span className="body-standard">0.5%</span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="body-small uppercase">Trading Fee</span>
                    <span className="body-standard">1%</span>
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
