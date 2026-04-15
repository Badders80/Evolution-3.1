import { formatNzd } from '@/lib/marketplace';
import type { MyStablePortfolio } from '@/types/mystable';

type PortfolioSummaryProps = {
  portfolio: MyStablePortfolio;
};

export function PortfolioSummary({ portfolio }: PortfolioSummaryProps) {
  const averageStakeSize =
    portfolio.totalStakes > 0
      ? portfolio.totalInvestedNzd / portfolio.totalStakes
      : 0;

  return (
    <div className="grid gap-4 sm:grid-cols-3">
      <div className="rounded-2xl border border-[#D4A964]/30 bg-[#D4A964]/5 p-5">
        <p className="text-xs uppercase tracking-[0.24em] text-[#D4A964]">
          Total Invested
        </p>
        <p className="mt-2 text-3xl font-semibold tracking-tight text-white">
          {formatNzd(portfolio.totalInvestedNzd)}
        </p>
        <p className="mt-1 text-sm text-white/50">
          Across {portfolio.totalStakes} stake{portfolio.totalStakes !== 1 ? 's' : ''}
        </p>
      </div>

      <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
        <p className="text-xs uppercase tracking-[0.24em] text-white/40">
          Active Stakes
        </p>
        <p className="mt-2 text-3xl font-semibold tracking-tight text-white">
          {portfolio.activeStakes}
        </p>
        <p className="mt-1 text-sm text-white/50">
          Currently active
        </p>
      </div>

      <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
        <p className="text-xs uppercase tracking-[0.24em] text-white/40">
          Average Stake
        </p>
        <p className="mt-2 text-3xl font-semibold tracking-tight text-white">
          {formatNzd(averageStakeSize)}
        </p>
        <p className="mt-1 text-sm text-white/50">
          Per investment
        </p>
      </div>
    </div>
  );
}