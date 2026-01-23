import { constructMetadata } from "@/lib/seo";

export const metadata = constructMetadata({
  title: "Why Evolution",
  description: "Discover why Evolution Stables is the premier choice for modern racehorse ownership.",
  canonical: "/why-evolution",
});

export default function WhyEvolutionPage() {
  return (
    <main className="pt-20">
      <section className="py-24 bg-background">
        <div className="max-w-6xl mx-auto px-6">
          <header className="mb-20 max-w-3xl">
            <p className="label-overline mb-6">Our Edge</p>
            <h1 className="heading-hero mb-8">
              Heritage Meets <br />
              <span className="text-primary italic">Innovation</span>
            </h1>
            <p className="body-lead">
              We aren't here to replace the sport of kings. We're here to
              give it the infrastructure it deserves for the 21st century.
            </p>
          </header>

          <div className="grid md:grid-cols-3 gap-12 mt-24">
            <div className="space-y-4">
              <h4 className="heading-feature">Institutional Grade</h4>
              <p className="body-standard text-neutral-600">
                Our platform is built on financial-grade infrastructure,
                ensuring every transaction is secure and every record is
                immutable.
              </p>
            </div>
            <div className="space-y-4">
              <h4 className="heading-feature">Regulated & Clear</h4>
              <p className="body-standard text-neutral-600">
                We operate within established regulatory frameworks,
                providing a level of transparency and protection previously
                unseen in racing.
              </p>
            </div>
            <div className="space-y-4">
              <h4 className="heading-feature">Liquid Ownership</h4>
              <p className="body-standard text-neutral-600">
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
