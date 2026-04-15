import { Badge } from '@/components/ui/Badge';
import type { MarketplacePublishStatus } from '@/types/marketplace';

const classNameMap: Record<MarketplacePublishStatus, string> = {
  draft: 'border-slate-700 bg-slate-900 text-slate-300',
  ready_to_publish: 'border-amber-600/30 bg-amber-500/10 text-amber-200',
  live: 'border-emerald-600/30 bg-emerald-500/10 text-emerald-200',
  closed: 'border-neutral-700 bg-neutral-900 text-neutral-300',
};

export function MarketplaceStatusBadge({
  status,
}: {
  status: MarketplacePublishStatus;
}) {
  return (
    <Badge variant="outline" className={classNameMap[status]}>
      {status.replace(/_/g, ' ')}
    </Badge>
  );
}
