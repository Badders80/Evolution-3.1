import Link from 'next/link';
import { notFound } from 'next/navigation';
import { loadSsotSeed } from '@/lib/ssot/seed-loader';
import { LastThreeRaces } from '@/components/mystable/LastThreeRaces';

type PageProps = {
  params: {
    horseId: string;
  };
};

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('en-NZ', {
    style: 'currency',
    currency: 'NZD',
    maximumFractionDigits: 2,
  }).format(value);
};

const toNumber = (value: string | undefined) => {
  const parsed = Number(value ?? 0);
  return Number.isFinite(parsed) ? parsed : 0;
};

export default async function HorseProfilePage({ params }: PageProps) {
  const seed = await loadSsotSeed(true);
  const horse = seed.horses.find((item) => item.horse_id === params.horseId);
  if (!horse) {
    notFound();
  }

  const lease = seed.leases.find((item) => item.horse_id === horse.horse_id);
  const trainer = seed.trainers.find((item) => item.trainer_id === horse.trainer_id);
  const owner = seed.owners.find((item) => item.owner_id === horse.owner_id);
  const governingBody = seed.governingBodies.find(
    (item) => item.governing_body_code === horse.governing_body_code,
  );
  const documents = seed.documents
    .filter((item) => item.horse_id === horse.horse_id)
    .sort((a, b) => b.document_date.localeCompare(a.document_date));

  const tokenCount = toNumber(lease?.token_count);
  const tokenPrice = toNumber(lease?.token_price_nzd);
  const issuanceValue =
    toNumber(lease?.total_issuance_value_nzd) || tokenCount * tokenPrice;

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_15%_-10%,rgba(212,169,100,0.15),transparent_40%),#070707] pt-8 text-white">
      <div className="mx-auto max-w-6xl px-6 py-12 md:px-10 lg:px-12">
        <div className="mb-8">
          <Link
            href="/mystable"
            className="text-xs uppercase tracking-[0.2em] text-white/60 transition-colors hover:text-white"
          >
            ← Back to MyStable
          </Link>
        </div>

        <header className="rounded-3xl border border-white/10 bg-[linear-gradient(160deg,#121212,#090909)] p-8 shadow-[0_24px_80px_rgba(0,0,0,0.45)]">
          <p className="text-xs uppercase tracking-[0.2em] text-white/40">Horse Profile</p>
          <h1 className="mt-3 text-4xl font-medium tracking-tight">{horse.horse_name}</h1>
          <p className="mt-4 max-w-3xl text-sm text-white/60">
            Cut-back performance profile for internal use. Core identity and lease metrics are
            synced from the SSOT seed and paired with live race profile links.
          </p>

          <div className="mt-6 flex flex-wrap gap-3 text-xs">
            <span className="rounded-full border border-white/15 px-3 py-1 text-white/70">
              {horse.sex} · {horse.colour}
            </span>
            <span className="rounded-full border border-white/15 px-3 py-1 text-white/70">
              Life No: {horse.nztr_life_number}
            </span>
            <span className="rounded-full border border-white/15 px-3 py-1 text-white/70">
              Microchip: {horse.microchip_number}
            </span>
            <span className="rounded-full border border-white/15 px-3 py-1 text-white/70">
              Status: {lease?.lease_status ?? horse.horse_status}
            </span>
          </div>
        </header>

        <section className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-xl border border-white/10 bg-[linear-gradient(160deg,#121212,#0c0c0c)] p-5">
            <p className="text-[10px] uppercase tracking-[0.2em] text-white/40">Lease %</p>
            <p className="mt-2 text-2xl font-medium">{lease?.percent_leased ?? '0'}%</p>
          </div>
          <div className="rounded-xl border border-white/10 bg-[linear-gradient(160deg,#121212,#0c0c0c)] p-5">
            <p className="text-[10px] uppercase tracking-[0.2em] text-white/40">Token Count</p>
            <p className="mt-2 text-2xl font-medium">{lease?.token_count ?? '0'}</p>
          </div>
          <div className="rounded-xl border border-white/10 bg-[linear-gradient(160deg,#121212,#0c0c0c)] p-5">
            <p className="text-[10px] uppercase tracking-[0.2em] text-white/40">Token Price</p>
            <p className="mt-2 text-2xl font-medium">{formatCurrency(tokenPrice)}</p>
          </div>
          <div className="rounded-xl border border-white/10 bg-[linear-gradient(160deg,#121212,#0c0c0c)] p-5">
            <p className="text-[10px] uppercase tracking-[0.2em] text-white/40">Issuance Value</p>
            <p className="mt-2 text-2xl font-medium">{formatCurrency(issuanceValue)}</p>
          </div>
        </section>

        <section className="mt-8 grid gap-6 lg:grid-cols-[1.2fr,1fr]">
          <div className="rounded-2xl border border-white/10 bg-[linear-gradient(160deg,#111111,#0a0a0a)] p-6">
            <h2 className="text-xl font-medium tracking-tight">Core Identity</h2>
            <dl className="mt-5 grid gap-3 text-sm md:grid-cols-2">
              <div>
                <dt className="text-white/45">Foaling Date</dt>
                <dd className="mt-1 text-white/80">{horse.foaling_date}</dd>
              </div>
              <div>
                <dt className="text-white/45">Country</dt>
                <dd className="mt-1 text-white/80">{horse.country_code}</dd>
              </div>
              <div>
                <dt className="text-white/45">Sire</dt>
                <dd className="mt-1 text-white/80">{horse.sire}</dd>
              </div>
              <div>
                <dt className="text-white/45">Dam</dt>
                <dd className="mt-1 text-white/80">{horse.dam}</dd>
              </div>
              <div>
                <dt className="text-white/45">Trainer / Stable</dt>
                <dd className="mt-1 text-white/80">
                  {trainer?.trainer_name ?? 'Unassigned'} · {trainer?.stable_name ?? 'N/A'}
                </dd>
              </div>
              <div>
                <dt className="text-white/45">Owner / Lessor</dt>
                <dd className="mt-1 text-white/80">{owner?.owner_name ?? 'Unassigned'}</dd>
              </div>
              <div>
                <dt className="text-white/45">Governing Body</dt>
                <dd className="mt-1 text-white/80">
                  {governingBody?.governing_body_name ?? horse.governing_body_code}
                </dd>
              </div>
              <div>
                <dt className="text-white/45">Lease Window</dt>
                <dd className="mt-1 text-white/80">
                  {lease?.start_date ?? 'TBD'} → {lease?.end_date ?? 'TBD'}
                </dd>
              </div>
            </dl>

            <div className="mt-6 flex flex-wrap gap-3 text-xs">
              <a
                href={horse.breeding_url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex rounded-full border border-white/15 px-4 py-2 text-white/70 transition-colors hover:text-white"
              >
                Open Breeding Page ↗
              </a>
              <a
                href={horse.performance_profile_url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex rounded-full border border-white/15 px-4 py-2 text-white/70 transition-colors hover:text-white"
              >
                Open Horse Performance Profile ↗
              </a>
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-[linear-gradient(160deg,#111111,#0a0a0a)] p-6">
            <h2 className="text-xl font-medium tracking-tight">Template Library</h2>
            <p className="mt-2 text-sm text-white/60">
              All active PDS/SA/whitepaper artifacts attached to this horse profile.
            </p>
            <div className="mt-5 space-y-3">
              {documents.length === 0 ? (
                <p className="rounded-lg border border-white/10 bg-black/30 p-3 text-sm text-white/60">
                  No documents linked yet.
                </p>
              ) : (
                documents.map((document) => (
                  <div
                    key={document.document_id}
                    className="rounded-lg border border-white/10 bg-black/30 p-3"
                  >
                    <p className="text-xs uppercase tracking-[0.2em] text-white/45">
                      {document.document_type}
                    </p>
                    <p className="mt-1 text-sm text-white/80">{document.source_reference}</p>
                    <p className="mt-1 text-xs text-white/45">{document.document_date}</p>
                  </div>
                ))
              )}
            </div>
          </div>
        </section>

        <section className="mt-8">
          <LastThreeRaces
            horseId={horse.horse_id}
            horseName={horse.horse_name}
            performanceProfileUrl={horse.performance_profile_url}
          />
        </section>
      </div>
    </main>
  );
}
