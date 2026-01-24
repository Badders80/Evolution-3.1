import { constructMetadata } from "@/lib/seo";
import { Mission } from "@/components/features/Mission";
import { ProcessTimeline } from "@/components/features/ProcessTimeline";

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

      <ProcessTimeline />
    </main>
  );
}
