import Link from 'next/link';
import type { MyStableStake } from '@/types/mystable';
import { formatNzd, formatPercent } from '@/lib/marketplace';

type PortfolioCardProps = {
  stake: MyStableStake;
};

const statusConfig: Record<
  string,
  { label: string; bg: string; text: string }
> = {
  pending_payment: {
    label: 'Pending Payment',
    bg: 'bg-amber-500/10',
    text: 'text-amber-400',
  },
  active: {
    label: 'Active',
    bg: 'bg-emerald-500/10',
    text: 'text-emerald-400',
  },
  matured: {
    label: 'Matured',
    bg: 'bg-blue-500/10',
    text: 'text-blue-400',
  },
  cancelled: {
    label: 'Cancelled',
    bg: 'bg-neutral-500/10',
    text: 'text-neutral-400',
  },
};

export function PortfolioCard({ stake }: PortfolioCardProps) {
  const status = statusConfig[stake.status] ?? statusConfig.active;

  return (
    <Link
      href={`/marketplace/${stake.listingSlug}`}
      className="group block rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition hover:border-[#D4A964]/30 hover:bg-white/[0.05]"
    >
      <div className="flex items-start justify-between">
        <div className="min-w-0 flex-1">
          <h3 className="text-lg font-semibold tracking-tight text-white group-hover:text-[#D4A964]">
            {stake.horseName}
          </h3>
          <div className="mt-1 flex items-center gap-2">
            <span
              className={`inline-block rounded px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider ${status.bg} ${status.text}`}
            >
              {status.label}
            </span>
            <span className="text-xs text-white/40">
              {stake.horseColour} {stake.horseSex}
            </span>
          </div>
        </div>
        <div className="text-right">
          <p className="text-lg font-semibold text-white">
            {formatPercent(stake.stakePercent)}
          </p>
          <p className="text-xs text-white/40">stake</p>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-3 border-t border-white/5 pt-4">
        <div>
          <p className="text-[10px] uppercase tracking-wider text-white/40">
            Units
          </p>
          <p className="mt-1 text-sm font-medium text-white">
            {stake.units}
          </p>
        </div>
        <div>
          <p className="text-[10px] uppercase tracking-wider text-white/40">
            Invested
          </p>
          <p className="mt-1 text-sm font-medium text-white">
            {formatNzd(stake.investedNzd)}
          </p>
        </div>
        <div>
          <p className="text-[10px] uppercase tracking-wider text-white/40">
            Trainer
          </p>
          <p className="mt-1 text-sm font-medium text-white truncate">
            {stake.trainerName}
          </p>
        </div>
      </div>
    </Link>
  );
}