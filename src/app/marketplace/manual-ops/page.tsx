import { notFound, redirect } from 'next/navigation';
import { FooterBar } from '@/components/site/Footer';
import {
  getOperatorSession,
  isMarketplaceFounderInboxEnabled,
} from '@/lib/auth';
import {
  readMarketplaceManualOpsStore,
  type MarketplaceManualOpsEntry,
} from '@/lib/marketplace-manual-ops';
import { formatNzd, formatPercent } from '@/lib/marketplace';
import { isMarketplacePreviewEnabled } from '@/lib/marketplace-release-stage';

export const dynamic = 'force-dynamic';

function formatTimestamp(value: string | null): string {
  if (!value) {
    return 'No submissions yet';
  }

  return new Intl.DateTimeFormat('en-NZ', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  }).format(new Date(value));
}

function getPendingCount(entries: MarketplaceManualOpsEntry[]): number {
  return entries.filter((entry) => entry.applicationStatus !== 'closed').length;
}

export default async function MarketplaceManualOpsPage() {
  if (!isMarketplacePreviewEnabled() || !isMarketplaceFounderInboxEnabled()) {
    notFound();
  }

  const session = await getOperatorSession();
  if (!session) {
    redirect('/auth?redirectedFrom=%2Fmarketplace%2Fmanual-ops');
  }

  const store = await readMarketplaceManualOpsStore();
  const latestEntry = store.entries[0] ?? null;

  return (
    <main className="min-h-screen bg-background pt-28 text-white md:pt-36">
      <div className="mx-auto max-w-6xl space-y-10 px-6 pb-24 md:px-10 lg:px-12">
        <section className="rounded-[32px] border border-white/10 bg-white/[0.03] p-8 shadow-[0_30px_120px_rgba(0,0,0,0.45)]">
          <p className="text-xs uppercase tracking-[0.28em] text-white/40">
            Founder Manual Ops
          </p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight text-white md:text-5xl">
            Marketplace inbox
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-white/70">
            This page surfaces marketplace application and reservation requests
            captured for manual follow-up. When Google Sheets is configured, each
            submission is mirrored there as well.
          </p>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
              <p className="text-xs uppercase tracking-[0.24em] text-white/40">
                Requests captured
              </p>
              <p className="mt-2 text-2xl font-semibold text-white">
                {store.entries.length}
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
              <p className="text-xs uppercase tracking-[0.24em] text-white/40">
                Pending review
              </p>
              <p className="mt-2 text-2xl font-semibold text-white">
                {getPendingCount(store.entries)}
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
              <p className="text-xs uppercase tracking-[0.24em] text-white/40">
                Last updated
              </p>
              <p className="mt-2 text-sm font-semibold text-white">
                {formatTimestamp(store.updatedAt)}
              </p>
            </div>
          </div>
        </section>

        {store.entries.length === 0 ? (
          <section className="rounded-[28px] border border-dashed border-white/10 bg-black/20 p-8 text-sm text-white/65">
            No marketplace applications have been captured yet. Submit a live
            listing request to populate this inbox.
          </section>
        ) : (
          <section className="space-y-6">
            {latestEntry ? (
              <div className="rounded-[28px] border border-white/10 bg-black/20 p-6">
                <p className="text-xs uppercase tracking-[0.24em] text-white/40">
                  Most recent request
                </p>
                <div className="mt-4 grid gap-4 md:grid-cols-4">
                  <div>
                    <p className="text-xs text-white/40">Reference</p>
                    <p className="mt-1 font-semibold text-white">
                      {latestEntry.submissionReference}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-white/40">Applicant</p>
                    <p className="mt-1 font-semibold text-white">
                      {latestEntry.fullName}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-white/40">Listing</p>
                    <p className="mt-1 font-semibold text-white">
                      {latestEntry.horseName}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-white/40">Submitted</p>
                    <p className="mt-1 font-semibold text-white">
                      {formatTimestamp(latestEntry.submittedAt)}
                    </p>
                  </div>
                </div>
              </div>
            ) : null}

            <div className="grid gap-5">
              {store.entries.map((entry) => (
                <article
                  key={entry.submissionReference}
                  className="rounded-[28px] border border-white/10 bg-white/[0.03] p-6 shadow-[0_18px_60px_rgba(0,0,0,0.28)]"
                >
                  <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                    <div>
                      <p className="text-xs uppercase tracking-[0.24em] text-white/40">
                        {entry.submissionReference}
                      </p>
                      <h2 className="mt-2 text-2xl font-semibold tracking-tight text-white">
                        {entry.fullName}
                      </h2>
                      <p className="mt-2 text-sm text-white/65">
                        {entry.email}
                        {entry.phone ? ` • ${entry.phone}` : ''}
                      </p>
                    </div>
                    <div className="rounded-full border border-white/10 bg-black/20 px-4 py-2 text-xs uppercase tracking-[0.24em] text-white/60">
                      {entry.applicationStatus.replace(/_/g, ' ')}
                    </div>
                  </div>

                  <div className="mt-6 grid gap-4 md:grid-cols-3 xl:grid-cols-6">
                    <div>
                      <p className="text-xs text-white/40">Listing</p>
                      <p className="mt-1 font-semibold text-white">
                        {entry.horseName}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-white/40">Requested stake</p>
                      <p className="mt-1 font-semibold text-white">
                        {formatPercent(entry.requestedStakePercent)}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-white/40">Units</p>
                      <p className="mt-1 font-semibold text-white">
                        {entry.requestedUnits}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-white/40">Reservation</p>
                      <p className="mt-1 font-semibold text-white">
                        {formatNzd(entry.reservationAmountNzd)}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-white/40">Submitted</p>
                      <p className="mt-1 font-semibold text-white">
                        {formatTimestamp(entry.submittedAt)}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-white/40">Google Sheets</p>
                      <p className="mt-1 font-semibold text-white">
                        {entry.googleSheetsStatus.replace(/_/g, ' ')}
                      </p>
                    </div>
                  </div>

                  {entry.notes ? (
                    <div className="mt-5 rounded-2xl border border-white/10 bg-black/20 p-4">
                      <p className="text-xs uppercase tracking-[0.24em] text-white/40">
                        Applicant notes
                      </p>
                      <p className="mt-2 text-sm leading-relaxed text-white/70">
                        {entry.notes}
                      </p>
                    </div>
                  ) : null}

                  {entry.googleSheetsError ? (
                    <p className="mt-4 text-sm text-amber-200">
                      Google Sheets mirror error: {entry.googleSheetsError}
                    </p>
                  ) : null}
                </article>
              ))}
            </div>
          </section>
        )}
      </div>
      <FooterBar />
    </main>
  );
}
