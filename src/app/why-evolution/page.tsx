import { constructMetadata } from "@/lib/seo";

export const metadata = constructMetadata({
  title: "Why Evolution",
  description: "Discover why Evolution Stables is the premier choice for modern racehorse ownership.",
  canonical: "/why-evolution",
});

export default function WhyEvolutionPage() {
  return (
    <main className="pt-20">
      <section className="py-32 md:py-48 bg-background">
        <div className="max-w-7xl mx-auto px-8 md:px-12">
          <header className="mb-32 max-w-4xl">
            <p className="label-overline mb-8">Our Edge</p>
            <h1 className="text-display mb-12">
              Heritage Meets <br />
              <span className="text-brand-gold italic">Innovation</span>
            </h1>
            <p className="body-lead text-xl max-w-2xl text-neutral-400">
              We aren't here to replace the sport of kings. We're here to
              give it the infrastructure it deserves for the 21st century.
            </p>
          </header>

          <div className="grid md:grid-cols-3 gap-16 mt-32">
            <div className="space-y-6 p-8 bg-white/[0.02] border border-white/[0.05] rounded-2xl">
              <h4 className="text-xl font-medium text-white">Institutional Grade</h4>
              <p className="body-standard text-neutral-400 font-light leading-relaxed">
                Our platform is built on financial-grade infrastructure,
                ensuring every transaction is secure and every record is
                immutable.
              </p>
            </div>
            <div className="space-y-6 p-8 bg-white/[0.02] border border-white/[0.05] rounded-2xl">
              <h4 className="text-xl font-medium text-white">Regulated & Clear</h4>
              <p className="body-standard text-neutral-400 font-light leading-relaxed">
                We operate within established regulatory frameworks,
                providing a level of transparency and protection previously
                unseen in racing.
              </p>
            </div>
            <div className="space-y-6 p-8 bg-white/[0.02] border border-white/[0.05] rounded-2xl">
              <h4 className="text-xl font-medium text-white">Liquid Ownership</h4>
              <p className="body-standard text-neutral-400 font-light leading-relaxed">
                The ability to buy and sell stakes creates a dynamic
                marketplace, giving owners control over their capital.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
