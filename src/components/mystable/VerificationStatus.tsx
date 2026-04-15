import Link from 'next/link';
import type { VerificationStatus } from '@/types/verification';

type VerificationStatusProps = {
  status: VerificationStatus;
};

const statusConfig: Record<
  VerificationStatus,
  { label: string; bg: string; text: string; description: string }
> = {
  not_started: {
    label: 'Not Started',
    bg: 'bg-neutral-500/10',
    text: 'text-neutral-400',
    description:
      'Identity verification has not been started. Complete verification to unlock full portfolio features.',
  },
  in_progress: {
    label: 'In Progress',
    bg: 'bg-amber-500/10',
    text: 'text-amber-400',
    description:
      'Your identity verification is being processed. This usually takes a few minutes.',
  },
  verified: {
    label: 'Verified',
    bg: 'bg-emerald-500/10',
    text: 'text-emerald-400',
    description:
      'Your identity has been verified. You have full access to all portfolio features.',
  },
  failed: {
    label: 'Failed',
    bg: 'bg-red-500/10',
    text: 'text-red-400',
    description:
      'Identity verification was unsuccessful. Please try again or contact support.',
  },
  expired: {
    label: 'Expired',
    bg: 'bg-neutral-500/10',
    text: 'text-neutral-400',
    description:
      'Your verification session has expired. Please start a new verification.',
  },
};

export function VerificationStatusBadge({
  status,
}: VerificationStatusProps) {
  const config = statusConfig[status] ?? statusConfig.not_started;

  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.24em] text-white/40">
            Identity Verification
          </p>
          <div className="mt-2 flex items-center gap-2">
            <span
              className={`inline-block rounded px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider ${config.bg} ${config.text}`}
            >
              {config.label}
            </span>
          </div>
          <p className="mt-3 text-sm leading-relaxed text-white/60">
            {config.description}
          </p>
        </div>
      </div>

      {status === 'not_started' || status === 'failed' || status === 'expired' ? (
        <Link
          href="/mystable/verify"
          className="mt-4 inline-flex items-center justify-center rounded-full bg-[#D4A964] px-5 py-2.5 text-sm font-semibold text-black transition hover:bg-[#e0b779]"
        >
          Start Verification
        </Link>
      ) : null}
    </div>
  );
}