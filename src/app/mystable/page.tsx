import { getMyStablePortfolio } from '@/lib/mystable';
import { PortfolioSummary } from '@/components/mystable/PortfolioSummary';
import { PortfolioCard } from '@/components/mystable/PortfolioCard';
import { VerificationStatusBadge } from '@/components/mystable/VerificationStatus';
import { FooterBar } from '@/components/site/Footer';
import { getVerificationStatus } from '@/lib/verification';

export default async function MyStablePage() {
  const portfolio = await getMyStablePortfolio('guest');
  const verificationStatus = getVerificationStatus('guest');

  return (
    <main className="min-h-screen bg-background pt-28 text-white md:pt-36">
      <div className="mx-auto max-w-7xl space-y-10 px-6 pb-24 md:px-10 lg:px-12">
        <header>
          <p className="text-xs uppercase tracking-[0.28em] text-[#D4A964]">
            Evolution Stables
          </p>
          <h1 className="mt-2 text-4xl font-semibold tracking-tight md:text-5xl">
            MyStable
          </h1>
          <p className="mt-4 max-w-2xl text-base text-white/60">
            Your personal command center for managing ownership
            positions, tracking performance, and staying connected to your
            stable.
          </p>
        </header>

        <PortfolioSummary portfolio={portfolio} />

        <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
          <section className="space-y-4">
            <div>
              <h2 className="text-xl font-semibold tracking-tight text-white">
                My Stakes
              </h2>
              <p className="mt-1 text-sm text-white/50">
                Your active ownership positions
              </p>
            </div>

            {portfolio.stakes.length === 0 ? (
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-8 text-center">
                <p className="text-lg font-medium text-white/70">
                  No stakes yet
                </p>
                <p className="mt-2 text-sm text-white/50">
                  Browse the marketplace to reserve your first ownership stake.
                </p>
                <a
                  href="/marketplace"
                  className="mt-4 inline-flex items-center justify-center rounded-full bg-[#D4A964] px-5 py-2.5 text-sm font-semibold text-black transition hover:bg-[#e0b779]"
                >
                  Explore Marketplace
                </a>
              </div>
            ) : (
              <div className="space-y-3">
                {portfolio.stakes.map((stake) => (
                  <PortfolioCard key={stake.id} stake={stake} />
                ))}
              </div>
            )}
          </section>

          <aside className="space-y-4">
            <VerificationStatusBadge status={verificationStatus} />

            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
              <p className="text-xs font-medium tracking-tight text-white">
                Quick Actions
              </p>
              <div className="mt-3 space-y-2 text-sm">
                <a
                  href="/marketplace"
                  className="block text-white/60 transition-colors hover:text-white"
                >
                  View Marketplace →
                </a>
                <a
                  href="/marketplace/first-gear"
                  className="block text-white/60 transition-colors hover:text-white"
                >
                  First Gear Details →
                </a>
              </div>
            </div>
          </aside>
        </div>
      </div>
      <FooterBar />
    </main>
  );
}
