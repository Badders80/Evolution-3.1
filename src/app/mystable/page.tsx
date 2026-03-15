'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import type {
  PortalSnapshot,
  SsotHltDraftListItem,
  SsotSeed,
} from '@/types/ssot';

type SsotApiResponse = {
  ok: boolean;
  snapshot?: PortalSnapshot;
  seedMeta?: {
    loadedFrom?: string;
  } | null;
  error?: string;
};

type SeedApiResponse = {
  ok: boolean;
  seed?: SsotSeed;
  error?: string;
};

type UpdateItem = {
  slug: string;
  horseName: string;
  dateLabel: string;
  dateIso: string;
  url: string;
};

type UpdatesApiResponse = {
  ok: boolean;
  updates: UpdateItem[];
  error?: string;
};

type MediaItem = {
  name: string;
  url: string;
  sizeBytes: number;
  modifiedAt: string;
};

type MediaApiResponse = {
  ok: boolean;
  media: MediaItem[];
  error?: string;
};

type HltDraftsApiResponse = {
  ok: boolean;
  drafts: SsotHltDraftListItem[];
  error?: string;
};

type HorseBoardRow = {
  horseId: string;
  horseName: string;
  status: string;
  trainerName: string;
  stableName: string;
  leasePercent: string;
  tokenCount: string;
  currentValue: number;
  performanceTag: string;
  performanceProfileUrl: string;
};

const EMPTY_SNAPSHOT: PortalSnapshot = {
  portfolio: {
    totalValue: 0,
    totalReturns: 0,
    returnsPercentage: 0,
    activeStakes: 0,
    monthlyChange: 0,
  },
  horses: [],
  documentsCount: 0,
  leasesCount: 0,
};

const EMPTY_SEED: SsotSeed = {
  trainers: [],
  owners: [],
  governingBodies: [],
  horses: [],
  leases: [],
  documents: [],
  intakeQueue: [],
  amendments: [],
};

const toNumber = (value: string | undefined) => {
  const parsed = Number(value ?? 0);
  return Number.isFinite(parsed) ? parsed : 0;
};

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('en-NZ', {
    style: 'currency',
    currency: 'NZD',
    maximumFractionDigits: 0,
  }).format(value);
};

const formatCompactCurrency = (value: number) => {
  if (Math.abs(value) >= 1000) return `$${(value / 1000).toFixed(1)}k`;
  return formatCurrency(value);
};

const formatDateTime = (value: string) => {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat('en-NZ', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(date);
};

const formatBytes = (sizeBytes: number) => {
  if (sizeBytes >= 1024 * 1024) return `${(sizeBytes / (1024 * 1024)).toFixed(1)} MB`;
  if (sizeBytes >= 1024) return `${(sizeBytes / 1024).toFixed(1)} KB`;
  return `${sizeBytes} B`;
};

const toTitle = (value: string) => {
  return value.replace(/_/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase());
};

const statusTone = (status: string) => {
  switch (status) {
    case 'racing':
      return 'bg-emerald-100 text-emerald-700';
    case 'proposed':
      return 'bg-amber-100 text-amber-700';
    case 'completed':
      return 'bg-slate-200 text-slate-700';
    default:
      return 'bg-slate-100 text-slate-700';
  }
};

const panelClass =
  'rounded-2xl border border-slate-200 bg-white shadow-[0_8px_24px_rgba(15,23,32,0.04)]';

export default function MyStablePage() {
  const [snapshot, setSnapshot] = useState<PortalSnapshot>(EMPTY_SNAPSHOT);
  const [seed, setSeed] = useState<SsotSeed>(EMPTY_SEED);
  const [updates, setUpdates] = useState<UpdateItem[]>([]);
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [drafts, setDrafts] = useState<SsotHltDraftListItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [seedPath, setSeedPath] = useState<string | null>(null);
  const [loadedAt, setLoadedAt] = useState<string>('');

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      try {
        const [snapshotRes, seedRes, updatesRes, mediaRes, draftRes] = await Promise.all([
          fetch('/api/ssot', { cache: 'no-store' }),
          fetch('/api/ssot/seed', { cache: 'no-store' }),
          fetch('/api/updates', { cache: 'no-store' }),
          fetch('/api/media/prudentia', { cache: 'no-store' }),
          fetch('/api/ssot/hlt', { cache: 'no-store' }),
        ]);

        const snapshotPayload = (await snapshotRes.json()) as SsotApiResponse;
        const seedPayload = (await seedRes.json()) as SeedApiResponse;
        const updatesPayload = (await updatesRes.json()) as UpdatesApiResponse;
        const mediaPayload = (await mediaRes.json()) as MediaApiResponse;
        const draftPayload = (await draftRes.json()) as HltDraftsApiResponse;

        if (!snapshotRes.ok || !snapshotPayload.ok || !snapshotPayload.snapshot) {
          throw new Error(snapshotPayload.error || 'Snapshot failed.');
        }
        if (!seedRes.ok || !seedPayload.ok || !seedPayload.seed) {
          throw new Error(seedPayload.error || 'Seed failed.');
        }

        if (!cancelled) {
          setSnapshot(snapshotPayload.snapshot);
          setSeed(seedPayload.seed);
          setUpdates(updatesPayload.updates ?? []);
          setMedia(mediaPayload.media ?? []);
          setDrafts(draftRes.ok && draftPayload.ok ? draftPayload.drafts ?? [] : []);
          setSeedPath(snapshotPayload.seedMeta?.loadedFrom ?? null);
          setLoadedAt(new Date().toISOString());
          setLoadError(null);
        }
      } catch (error) {
        if (!cancelled) {
          setLoadError(error instanceof Error ? error.message : 'Dashboard load failed.');
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    };

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  const horseRows = useMemo(() => {
    const horseById = new Map(seed.horses.map((item) => [item.horse_id, item]));
    const leaseByHorseId = new Map(seed.leases.map((item) => [item.horse_id, item]));
    const trainerById = new Map(seed.trainers.map((item) => [item.trainer_id, item]));

    const rows: HorseBoardRow[] = snapshot.horses.map((horse) => {
      const seedHorse = horseById.get(horse.id);
      const lease = leaseByHorseId.get(horse.id);
      const trainer = seedHorse ? trainerById.get(seedHorse.trainer_id) : null;
      return {
        horseId: horse.id,
        horseName: horse.name,
        status: horse.status,
        trainerName: trainer?.trainer_name ?? 'Unassigned',
        stableName: trainer?.stable_name ?? 'N/A',
        leasePercent: lease?.percent_leased ?? '0',
        tokenCount: lease?.token_count ?? '0',
        currentValue: horse.currentValue,
        performanceTag: horse.performance,
        performanceProfileUrl: horse.performanceProfileUrl,
      };
    });

    return rows.sort((a, b) => a.horseName.localeCompare(b.horseName));
  }, [seed.horses, seed.leases, seed.trainers, snapshot.horses]);

  const totalTokens = useMemo(() => {
    return seed.leases.reduce((sum, lease) => sum + toNumber(lease.token_count), 0);
  }, [seed.leases]);

  const latestUpdate = updates[0];

  return (
    <main className="min-h-screen bg-[#eef1f4] pt-8 text-[#101925]">
      <div className="mx-auto max-w-[1500px] px-4 pb-10 sm:px-6 lg:px-8">
        <header className={`${panelClass} p-6`}>
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-[11px] uppercase tracking-[0.2em] text-slate-500">Evolution Stables</p>
              <h1 className="mt-2 text-[2rem] font-semibold tracking-tight text-slate-900">MyStable Command</h1>
              <p className="mt-2 max-w-3xl text-sm text-slate-600">
                Portfolio control, horse profile operations, SSOT_HLT intake, and investor communications.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Link
                href="/mystable/intake"
                className="rounded-lg border border-slate-300 bg-slate-900 px-4 py-2 text-xs uppercase tracking-[0.18em] text-white transition-colors hover:bg-slate-800"
              >
                New Intake
              </Link>
              <Link
                href="/mystable/horses/HRS-002"
                className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-xs uppercase tracking-[0.18em] text-slate-700 transition-colors hover:bg-slate-100"
              >
                Open Prudentia
              </Link>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap gap-6 text-xs text-slate-500">
            <span>
              {isLoading
                ? 'Refreshing dashboard...'
                : loadError
                  ? `Load issue: ${loadError}`
                  : `Loaded ${formatDateTime(loadedAt)}`}
            </span>
            {seedPath ? <span className="break-all">Source: {seedPath}</span> : null}
          </div>
        </header>

        <section className="mt-6 grid gap-6 xl:grid-cols-[290px,1fr]">
          <aside className="space-y-6">
            <div className={`${panelClass} p-5`}>
              <p className="text-[11px] uppercase tracking-[0.2em] text-slate-500">Actions</p>
              <div className="mt-3 space-y-2">
                <Link
                  href="/mystable/intake"
                  className="block rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-700 hover:bg-slate-100"
                >
                  SSOT Input Window
                </Link>
                <Link
                  href="/mystable/horses/HRS-001"
                  className="block rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-700 hover:bg-slate-100"
                >
                  First Gear Profile
                </Link>
                <Link
                  href="/mystable/horses/HRS-002"
                  className="block rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-700 hover:bg-slate-100"
                >
                  Prudentia Profile
                </Link>
              </div>
            </div>

            <div className={`${panelClass} p-5`}>
              <p className="text-[11px] uppercase tracking-[0.2em] text-slate-500">Registry Snapshot</p>
              <div className="mt-3 space-y-3 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Trainers</span>
                  <span className="font-medium text-slate-900">{seed.trainers.length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Owners</span>
                  <span className="font-medium text-slate-900">{seed.owners.length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Bodies</span>
                  <span className="font-medium text-slate-900">{seed.governingBodies.length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Documents</span>
                  <span className="font-medium text-slate-900">{snapshot.documentsCount}</span>
                </div>
              </div>
            </div>

            <div className={`${panelClass} p-5`}>
              <p className="text-[11px] uppercase tracking-[0.2em] text-slate-500">Latest Update</p>
              {latestUpdate ? (
                <Link href={latestUpdate.url} className="mt-3 block rounded-lg border border-slate-200 p-3 hover:bg-slate-50">
                  <p className="text-sm text-slate-900">{latestUpdate.horseName}</p>
                  <p className="mt-1 text-xs text-slate-500">{latestUpdate.dateLabel}</p>
                </Link>
              ) : (
                <p className="mt-3 text-sm text-slate-500">No updates loaded.</p>
              )}
            </div>
          </aside>

          <div className="space-y-6">
            <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              <article className={`${panelClass} p-4`}>
                <p className="text-[10px] uppercase tracking-[0.2em] text-slate-500">Portfolio Value</p>
                <p className="mt-1 text-2xl font-semibold text-slate-900">
                  {formatCompactCurrency(snapshot.portfolio.totalValue)}
                </p>
              </article>
              <article className={`${panelClass} p-4`}>
                <p className="text-[10px] uppercase tracking-[0.2em] text-slate-500">Active Leases</p>
                <p className="mt-1 text-2xl font-semibold text-slate-900">{snapshot.portfolio.activeStakes}</p>
              </article>
              <article className={`${panelClass} p-4`}>
                <p className="text-[10px] uppercase tracking-[0.2em] text-slate-500">Horse Profiles</p>
                <p className="mt-1 text-2xl font-semibold text-slate-900">{horseRows.length}</p>
              </article>
              <article className={`${panelClass} p-4`}>
                <p className="text-[10px] uppercase tracking-[0.2em] text-slate-500">Total Tokens</p>
                <p className="mt-1 text-2xl font-semibold text-slate-900">{totalTokens}</p>
              </article>
            </section>

            <section className={`${panelClass} p-6`}>
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <p className="text-[11px] uppercase tracking-[0.2em] text-slate-500">Horse Operations</p>
                  <h2 className="mt-1 text-xl font-semibold text-slate-900">Horse Command Board</h2>
                </div>
              </div>

              <div className="space-y-3">
                {horseRows.length === 0 ? (
                  <p className="rounded-lg border border-slate-200 bg-slate-50 p-3 text-sm text-slate-500">
                    No horse profiles loaded.
                  </p>
                ) : (
                  horseRows.map((row) => (
                    <div
                      key={row.horseId}
                      className="grid gap-3 rounded-xl border border-slate-200 bg-slate-50 p-4 md:grid-cols-[1.8fr,1fr,1fr,auto]"
                    >
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <p className="text-base font-medium text-slate-900">{row.horseName}</p>
                          <span className={`rounded-full px-2 py-0.5 text-[10px] uppercase tracking-[0.2em] ${statusTone(row.status)}`}>
                            {row.status}
                          </span>
                        </div>
                        <p className="mt-1 text-xs text-slate-500">{row.horseId}</p>
                        <p className="mt-1 text-xs text-slate-600">
                          {row.trainerName} · {row.stableName}
                        </p>
                      </div>
                      <div>
                        <p className="text-[10px] uppercase tracking-[0.2em] text-slate-500">Lease</p>
                        <p className="mt-1 text-sm font-medium text-slate-900">{row.leasePercent}%</p>
                        <p className="mt-1 text-xs text-slate-600">{row.tokenCount} tokens</p>
                      </div>
                      <div>
                        <p className="text-[10px] uppercase tracking-[0.2em] text-slate-500">Performance</p>
                        <p className="mt-1 text-sm font-medium text-slate-900">{row.performanceTag}</p>
                        <p className="mt-1 text-xs text-slate-600">{formatCompactCurrency(row.currentValue)}</p>
                      </div>
                      <div className="flex flex-wrap gap-2 md:justify-end">
                        <Link
                          href={`/mystable/horses/${row.horseId}`}
                          className="rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs uppercase tracking-[0.15em] text-slate-700 hover:bg-slate-100"
                        >
                          Profile
                        </Link>
                        <a
                          href={row.performanceProfileUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs uppercase tracking-[0.15em] text-slate-700 hover:bg-slate-100"
                        >
                          Performance
                        </a>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </section>

            <section className="grid gap-6 lg:grid-cols-2">
              <article className={`${panelClass} p-5`}>
                <div className="mb-3 flex items-center justify-between">
                  <h3 className="text-base font-semibold text-slate-900">Investor Updates</h3>
                  <span className="text-xs text-slate-500">{updates.length} items</span>
                </div>
                <div className="space-y-2">
                  {updates.length === 0 ? (
                    <p className="text-sm text-slate-500">No update posts found.</p>
                  ) : (
                    updates.slice(0, 6).map((item) => (
                      <Link
                        key={item.slug}
                        href={item.url}
                        className="block rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 hover:bg-slate-100"
                      >
                        <p className="text-sm text-slate-900">{item.horseName}</p>
                        <p className="mt-1 text-xs text-slate-500">{item.dateLabel}</p>
                      </Link>
                    ))
                  )}
                </div>
              </article>

              <article className={`${panelClass} p-5`}>
                <div className="mb-3 flex items-center justify-between">
                  <h3 className="text-base font-semibold text-slate-900">SSOT_HLT Drafts</h3>
                  <span className="text-xs text-slate-500">{drafts.length} items</span>
                </div>
                <div className="space-y-2">
                  {drafts.length === 0 ? (
                    <p className="text-sm text-slate-500">No saved drafts yet.</p>
                  ) : (
                    drafts.slice(0, 6).map((draft) => (
                      <div key={draft.draftId} className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2">
                        <div className="flex items-center justify-between gap-2">
                          <p className="text-sm text-slate-900">{draft.horseName}</p>
                          <span className="rounded-full bg-slate-200 px-2 py-0.5 text-[10px] uppercase tracking-[0.2em] text-slate-700">
                            {draft.status}
                          </span>
                        </div>
                        <p className="mt-1 text-xs text-slate-500">{draft.draftId}</p>
                        <p className="mt-1 text-xs text-slate-500">{formatDateTime(draft.createdAt)}</p>
                      </div>
                    ))
                  )}
                </div>
              </article>
            </section>

            <section className="grid gap-6 lg:grid-cols-2">
              <article className={`${panelClass} p-5`}>
                <h3 className="text-base font-semibold text-slate-900">Template Library</h3>
                <div className="mt-3 space-y-2">
                  {seed.documents.length === 0 ? (
                    <p className="text-sm text-slate-500">No documents in seed.</p>
                  ) : (
                    seed.documents.slice(0, 6).map((document) => (
                      <div key={document.document_id} className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2">
                        <p className="text-[11px] uppercase tracking-[0.2em] text-slate-500">
                          {toTitle(document.document_type)}
                        </p>
                        <p className="mt-1 text-sm text-slate-900">{document.source_reference}</p>
                      </div>
                    ))
                  )}
                </div>
              </article>

              <article className={`${panelClass} p-5`}>
                <h3 className="text-base font-semibold text-slate-900">Media Intake</h3>
                <div className="mt-3 space-y-2">
                  {media.length === 0 ? (
                    <p className="text-sm text-slate-500">No media clips found.</p>
                  ) : (
                    media.slice(0, 6).map((item) => (
                      <a
                        key={item.url}
                        href={item.url}
                        target="_blank"
                        rel="noreferrer"
                        className="block rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 hover:bg-slate-100"
                      >
                        <p className="text-sm text-slate-900">{item.name}</p>
                        <p className="mt-1 text-xs text-slate-500">{formatBytes(item.sizeBytes)}</p>
                      </a>
                    ))
                  )}
                </div>
              </article>
            </section>
          </div>
        </section>
      </div>
    </main>
  );
}
