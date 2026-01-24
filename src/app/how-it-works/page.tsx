import { constructMetadata } from "@/lib/seo";
import { Mission } from "@/components/features/Mission";

export const metadata = constructMetadata({
  title: "How It Works",
  description: "Learn how Evolution Stables is redefining racehorse ownership through digital-syndication.",
  canonical: "/how-it-works",
});

export default function HowItWorksPage() {
  return (
    <main className="pt-20">
      <section className="py-24 bg-background">
        <div className="max-w-6xl mx-auto px-6">
          <header className="mb-20 max-w-3xl">
            <p className="label-overline mb-6">The Process</p>
            <h1 className="heading-hero mb-8">
              Simplicity by <br />
              <span className="text-primary italic">Design</span>
            </h1>
            <p className="body-lead">
              We've stripped away the complexity of traditional syndication
              to give you a direct, transparent path to ownership.
            </p>
          </header>
        </div>
      </section>

      <Mission />

      <section className="py-24 bg-surface">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-16">
          <div className="space-y-6">
            <h3 className="heading-sub">1. Browse & Select</h3>
            <p className="body-standard">
              Explore our marketplace of vetted thoroughbreds. Each listing
              includes full performance data, pedigree details, and clear
              ownership terms.
            </p>
          </div>
          <div className="space-y-6">
            <h3 className="heading-sub">2. Secure Ownership</h3>
            <p className="body-standard">
              Purchase your stake instantly through our regulated platform.
              Your ownership is recorded immutably, ensuring security and
              transparency from day one.
            </p>
          </div>
          <div className="space-y-6">
            <h3 className="heading-sub">3. Follow & Engage</h3>
            <p className="body-standard">
              Get real-time updates on your horse's training, health, and
              racing schedule through your personal dashboard.
            </p>
          </div>
          <div className="space-y-6">
            <h3 className="heading-sub">4. Trade with Ease</h3>
            <p className="body-standard">
              Unlike traditional models, you have the flexibility to list
              your stake for sale on our secondary marketplace whenever
              you choose.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
