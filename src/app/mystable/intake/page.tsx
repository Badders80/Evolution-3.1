'use client';

import { FormEvent, useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import type {
  SeedGoverningBody,
  SeedHorse,
  SeedLease,
  SeedOwner,
  SeedTrainer,
  SsotHltDraft,
  SsotHltDraftSaveResult,
  SsotSeed,
} from '@/types/ssot';

type SeedApiResponse = {
  ok: boolean;
  seed?: SsotSeed;
  error?: string;
};

type SaveHltApiResponse = {
  ok: boolean;
  draftId?: SsotHltDraftSaveResult['draftId'];
  filePath?: SsotHltDraftSaveResult['filePath'];
  error?: string;
};

type CommercialState = {
  startDate: string;
  durationMonths: string;
  percentLeased: string;
  tokenCount: string;
  monthlyLeasePriceNzd: string;
  investorSharePercent: string;
  notes: string;
};

type SaveState = {
  status: 'idle' | 'saving' | 'saved' | 'error';
  message: string | null;
  draftId?: string;
  filePath?: string;
};

const ADD_NEW_PROFILE = '__add_new_profile__';

const EMPTY_COMMERCIAL: CommercialState = {
  startDate: '',
  durationMonths: '12',
  percentLeased: '10',
  tokenCount: '20',
  monthlyLeasePriceNzd: '40',
  investorSharePercent: '80',
  notes: '',
};

const parseNumber = (value: string) => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : 0;
};

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('en-NZ', {
    style: 'currency',
    currency: 'NZD',
    maximumFractionDigits: 2,
  }).format(value);
};

const toEndDate = (startDate: string, durationMonths: number) => {
  if (!startDate || durationMonths <= 0) return '';
  const start = new Date(`${startDate}T00:00:00`);
  if (Number.isNaN(start.getTime())) return '';
  const end = new Date(start);
  end.setMonth(end.getMonth() + durationMonths);
  end.setDate(end.getDate() - 1);
  return end.toISOString().slice(0, 10);
};

const extractBreedingId = (url: string) => {
  const match = url.match(/\/Breeding\/(\d+)\//i);
  return match ? match[1] : null;
};

export default function SsotIntakePage() {
  const [seed, setSeed] = useState<SsotSeed | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [trainers, setTrainers] = useState<SeedTrainer[]>([]);
  const [owners, setOwners] = useState<SeedOwner[]>([]);
  const [governingBodies, setGoverningBodies] = useState<SeedGoverningBody[]>([]);

  const [breedingUrl, setBreedingUrl] = useState('');
  const [selectedHorse, setSelectedHorse] = useState<SeedHorse | null>(null);
  const [populateMessage, setPopulateMessage] = useState<string | null>(null);

  const [selectedTrainerId, setSelectedTrainerId] = useState('');
  const [selectedOwnerId, setSelectedOwnerId] = useState('');
  const [selectedGoverningBodyCode, setSelectedGoverningBodyCode] = useState('');

  const [commercial, setCommercial] = useState<CommercialState>(EMPTY_COMMERCIAL);
  const [generatedDraft, setGeneratedDraft] = useState<SsotHltDraft | null>(null);
  const [saveState, setSaveState] = useState<SaveState>({
    status: 'idle',
    message: null,
  });

  const [newTrainerName, setNewTrainerName] = useState('');
  const [newStableName, setNewStableName] = useState('');
  const [newOwnerName, setNewOwnerName] = useState('');
  const [newOwnerType, setNewOwnerType] = useState('company');
  const [newGoverningBodyCode, setNewGoverningBodyCode] = useState('');
  const [newGoverningBodyName, setNewGoverningBodyName] = useState('');

  useEffect(() => {
    let cancelled = false;

    const loadSeed = async () => {
      try {
        const response = await fetch('/api/ssot/seed', { cache: 'no-store' });
        const payload = (await response.json()) as SeedApiResponse;
        if (!response.ok || !payload.ok || !payload.seed) {
          throw new Error(payload.error || 'Failed to load SSOT seed.');
        }

        if (!cancelled) {
          setSeed(payload.seed);
          setTrainers(payload.seed.trainers);
          setOwners(payload.seed.owners);
          setGoverningBodies(payload.seed.governingBodies);
          setError(null);
        }
      } catch (loadError) {
        if (!cancelled) {
          setError(loadError instanceof Error ? loadError.message : 'Failed to load SSOT seed.');
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    };

    loadSeed();

    return () => {
      cancelled = true;
    };
  }, []);

  const computed = useMemo(() => {
    const durationMonths = parseNumber(commercial.durationMonths);
    const percentLeased = parseNumber(commercial.percentLeased);
    const tokenCount = parseNumber(commercial.tokenCount);
    const monthlyLeasePriceNzd = parseNumber(commercial.monthlyLeasePriceNzd);
    const investorSharePercent = parseNumber(commercial.investorSharePercent);

    const endDate = toEndDate(commercial.startDate, durationMonths);
    const annualLeasePriceNzd = monthlyLeasePriceNzd * 12;
    const pricePerOnePercentNzd =
      percentLeased > 0 ? annualLeasePriceNzd / percentLeased : 0;
    const percentPerToken = tokenCount > 0 ? percentLeased / tokenCount : 0;
    const tokenPriceNzd = pricePerOnePercentNzd * percentPerToken;
    const totalIssuanceValueNzd = tokenCount * tokenPriceNzd;
    const ownerSharePercent = Math.max(0, 100 - investorSharePercent);

    return {
      durationMonths,
      percentLeased,
      tokenCount,
      monthlyLeasePriceNzd,
      investorSharePercent,
      ownerSharePercent,
      endDate,
      annualLeasePriceNzd,
      pricePerOnePercentNzd,
      percentPerToken,
      tokenPriceNzd,
      totalIssuanceValueNzd,
    };
  }, [commercial]);

  const profilesComplete = useMemo(() => {
    return Boolean(
      selectedTrainerId &&
        selectedOwnerId &&
        selectedGoverningBodyCode &&
        selectedTrainerId !== ADD_NEW_PROFILE &&
        selectedOwnerId !== ADD_NEW_PROFILE &&
        selectedGoverningBodyCode !== ADD_NEW_PROFILE,
    );
  }, [selectedGoverningBodyCode, selectedOwnerId, selectedTrainerId]);

  const applyDefaultsFromLease = (lease: SeedLease | null) => {
    if (!lease) {
      setCommercial((prev) => ({
        ...prev,
        startDate: prev.startDate || '',
      }));
      return;
    }

    setCommercial({
      startDate: lease.start_date || '',
      durationMonths: lease.duration_months || '12',
      percentLeased: lease.percent_leased || '10',
      tokenCount: lease.token_count || '20',
      monthlyLeasePriceNzd: lease.monthly_lease_price_nzd || '40',
      investorSharePercent: lease.investor_share_percent || '80',
      notes: '',
    });
  };

  const clearOutputs = () => {
    setGeneratedDraft(null);
    setSaveState({
      status: 'idle',
      message: null,
    });
  };

  const handlePopulateFromLink = () => {
    clearOutputs();
    setPopulateMessage(null);

    if (!seed) {
      setPopulateMessage('Seed not loaded yet.');
      return;
    }

    const breedingId = extractBreedingId(breedingUrl.trim());
    if (!breedingId) {
      setPopulateMessage('Invalid Loveracing URL. Expected /Breeding/<id>/<slug>.aspx');
      return;
    }

    const horse = seed.horses.find((item) =>
      item.breeding_url.includes(`/Breeding/${breedingId}/`),
    );

    if (!horse) {
      setSelectedHorse(null);
      setSelectedTrainerId('');
      setSelectedOwnerId('');
      setSelectedGoverningBodyCode('');
      setPopulateMessage(
        `No horse found in seed for Breeding ID ${breedingId}. Add horse to intake files first.`,
      );
      return;
    }

    const lease = seed.leases.find((item) => item.horse_id === horse.horse_id) ?? null;

    setSelectedHorse(horse);
    setSelectedTrainerId(horse.trainer_id || '');
    setSelectedOwnerId(horse.owner_id || '');
    setSelectedGoverningBodyCode(horse.governing_body_code || '');
    applyDefaultsFromLease(lease);
    setPopulateMessage(`Loaded ${horse.horse_name} from seed.`);
  };

  const handleAddTrainer = () => {
    if (!newTrainerName.trim()) return;
    const trainer: SeedTrainer = {
      trainer_id: `TRN-CUSTOM-${Date.now()}`,
      trainer_name: newTrainerName.trim(),
      stable_name: newStableName.trim() || 'New Stable',
      contact_name: '',
      phone: '',
      email: '',
      website: '',
      x_url: '',
      instagram_url: '',
      facebook_url: '',
      profile_origin: 'custom',
      profile_status: 'active',
      notes: 'Added via intake screen',
    };
    setTrainers((prev) => [...prev, trainer]);
    setSelectedTrainerId(trainer.trainer_id);
    setNewTrainerName('');
    setNewStableName('');
  };

  const handleAddOwner = () => {
    if (!newOwnerName.trim()) return;
    const owner: SeedOwner = {
      owner_id: `OWN-CUSTOM-${Date.now()}`,
      owner_name: newOwnerName.trim(),
      entity_type: newOwnerType,
      contact_name: '',
      phone: '',
      email: '',
      website: '',
      x_url: '',
      instagram_url: '',
      facebook_url: '',
      profile_origin: 'custom',
      profile_status: 'active',
      notes: 'Added via intake screen',
    };
    setOwners((prev) => [...prev, owner]);
    setSelectedOwnerId(owner.owner_id);
    setNewOwnerName('');
  };

  const handleAddGoverningBody = () => {
    if (!newGoverningBodyCode.trim() || !newGoverningBodyName.trim()) return;
    const governingBody: SeedGoverningBody = {
      governing_body_code: newGoverningBodyCode.trim().toUpperCase(),
      governing_body_name: newGoverningBodyName.trim(),
      website: '',
      status: 'custom',
    };
    setGoverningBodies((prev) => [...prev, governingBody]);
    setSelectedGoverningBodyCode(governingBody.governing_body_code);
    setNewGoverningBodyCode('');
    setNewGoverningBodyName('');
  };

  const handleGenerateDraft = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setPopulateMessage(null);

    if (!selectedHorse) {
      setPopulateMessage('Populate a horse first.');
      return;
    }

    if (!profilesComplete) {
      setPopulateMessage('Select trainer, owner, and governing body before generating.');
      return;
    }

    if (!commercial.startDate) {
      setPopulateMessage('Start date is required for SSOT_HLT.');
      return;
    }

    const draft: SsotHltDraft = {
      horseId: selectedHorse.horse_id,
      horseName: selectedHorse.horse_name,
      breedingUrl: selectedHorse.breeding_url,
      trainerId: selectedTrainerId,
      ownerId: selectedOwnerId,
      governingBodyCode: selectedGoverningBodyCode,
      commercial: {
        startDate: commercial.startDate,
        endDate: computed.endDate,
        durationMonths: computed.durationMonths,
        percentLeased: computed.percentLeased,
        tokenCount: computed.tokenCount,
        monthlyLeasePriceNzd: computed.monthlyLeasePriceNzd,
        annualLeasePriceNzd: computed.annualLeasePriceNzd,
        pricePerOnePercentNzd: computed.pricePerOnePercentNzd,
        percentPerToken: computed.percentPerToken,
        tokenPriceNzd: computed.tokenPriceNzd,
        totalIssuanceValueNzd: computed.totalIssuanceValueNzd,
        investorSharePercent: computed.investorSharePercent,
        ownerSharePercent: computed.ownerSharePercent,
      },
      hltNarrative: `HLT Lease period: ${computed.durationMonths} months (${commercial.startDate} to ${computed.endDate}). Agreed split: ${computed.investorSharePercent}% to tokenholders / ${computed.ownerSharePercent}% to owner.`,
      notes: commercial.notes,
    };

    setGeneratedDraft(draft);
    setSaveState({
      status: 'saving',
      message: 'Saving SSOT_HLT draft...',
    });

    try {
      const response = await fetch('/api/ssot/hlt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ draft }),
      });
      const payload = (await response.json()) as SaveHltApiResponse;
      if (!response.ok || !payload.ok || !payload.draftId || !payload.filePath) {
        throw new Error(payload.error || 'Failed to save SSOT_HLT draft.');
      }

      setSaveState({
        status: 'saved',
        message: 'SSOT_HLT saved to draft library.',
        draftId: payload.draftId,
        filePath: payload.filePath,
      });
    } catch (saveError) {
      setSaveState({
        status: 'error',
        message:
          saveError instanceof Error ? saveError.message : 'Failed to save SSOT_HLT draft.',
      });
    }
  };

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_12%_-15%,rgba(212,169,100,0.18),transparent_45%),#070707] pt-8 text-white">
      <div className="mx-auto max-w-6xl px-6 py-12 md:px-10 lg:px-12">
        <div className="mb-8">
          <Link
            href="/mystable"
            className="text-xs uppercase tracking-[0.2em] text-white/60 transition-colors hover:text-white"
          >
            Back to MyStable
          </Link>
        </div>

        <header className="rounded-3xl border border-white/10 bg-[linear-gradient(160deg,#121212,#090909)] p-8 shadow-[0_24px_80px_rgba(0,0,0,0.45)]">
          <p className="text-xs uppercase tracking-[0.2em] text-white/40">SSOT Input</p>
          <h1 className="mt-3 text-4xl font-medium tracking-tight">Create SSOT_HLT</h1>
          <p className="mt-4 max-w-3xl text-sm text-white/60">
            Intake starts with one Loveracing breeding URL. Profiles and commercial logic unlock in
            sequence, then one action generates and saves the draft.
          </p>
          <div className="mt-6 flex flex-wrap gap-2 text-[11px] uppercase tracking-[0.18em]">
            <span className="rounded-full border border-white/15 px-3 py-1 text-white/70">
              1. Link Intake
            </span>
            <span className="rounded-full border border-white/15 px-3 py-1 text-white/70">
              2. Profile Assignment
            </span>
            <span className="rounded-full border border-white/15 px-3 py-1 text-white/70">
              3. Commercial Logic
            </span>
            <span className="rounded-full border border-white/15 px-3 py-1 text-white/70">
              4. Generate + Save
            </span>
          </div>
        </header>

        <section className="mt-8 rounded-2xl border border-white/10 bg-[linear-gradient(165deg,#111111,#0a0a0a)] p-6">
          <label className="text-xs uppercase tracking-[0.2em] text-white/40" htmlFor="breeding-url">
            Horse Breeding URL
          </label>
          <div className="mt-3 flex flex-col gap-3 md:flex-row">
            <input
              id="breeding-url"
              type="url"
              value={breedingUrl}
              onChange={(event) => setBreedingUrl(event.target.value)}
              placeholder="https://loveracing.nz/Breeding/427416/Prudentia-NZ-2021.aspx"
              className="w-full rounded-lg border border-white/10 bg-black px-4 py-3 text-sm text-white placeholder:text-white/40 focus:border-white/30 focus:outline-none"
            />
            <button
              type="button"
              onClick={handlePopulateFromLink}
              className="rounded-lg border border-white/15 bg-white/5 px-5 py-3 text-xs uppercase tracking-[0.2em] text-white/80 transition-colors hover:bg-white/10"
            >
              Populate
            </button>
          </div>
          {populateMessage ? <p className="mt-3 text-sm text-white/60">{populateMessage}</p> : null}
          {isLoading ? <p className="mt-3 text-sm text-white/60">Loading seed...</p> : null}
          {error ? <p className="mt-3 text-sm text-red-300">{error}</p> : null}
        </section>

        {selectedHorse ? (
          <form className="mt-8 space-y-6" onSubmit={handleGenerateDraft}>
            <section className="rounded-2xl border border-white/10 bg-[linear-gradient(165deg,#111111,#0a0a0a)] p-6">
              <h2 className="text-lg font-medium tracking-tight">Horse Profile (Auto-Populated)</h2>
              <dl className="mt-4 grid gap-3 text-sm md:grid-cols-2">
                <div>
                  <dt className="text-white/45">Horse</dt>
                  <dd className="mt-1 text-white/80">{selectedHorse.horse_name}</dd>
                </div>
                <div>
                  <dt className="text-white/45">Life Number</dt>
                  <dd className="mt-1 text-white/80">{selectedHorse.nztr_life_number}</dd>
                </div>
                <div>
                  <dt className="text-white/45">Microchip</dt>
                  <dd className="mt-1 text-white/80">{selectedHorse.microchip_number}</dd>
                </div>
                <div>
                  <dt className="text-white/45">Performance Profile</dt>
                  <dd className="mt-1">
                    <a
                      href={selectedHorse.performance_profile_url}
                      target="_blank"
                      rel="noreferrer"
                      className="text-white/80 underline decoration-white/30 underline-offset-2 hover:text-white"
                    >
                      Open live profile
                    </a>
                  </dd>
                </div>
              </dl>
            </section>

            <section className="rounded-2xl border border-white/10 bg-[linear-gradient(165deg,#111111,#0a0a0a)] p-6">
              <h2 className="text-lg font-medium tracking-tight">Profiles</h2>
              <div className="mt-4 grid gap-5 lg:grid-cols-3">
                <div className="space-y-3">
                  <label className="text-xs uppercase tracking-[0.2em] text-white/40">Trainer / Stable</label>
                  <select
                    value={selectedTrainerId}
                    onChange={(event) => setSelectedTrainerId(event.target.value)}
                    className="w-full rounded-lg border border-white/10 bg-black px-3 py-2 text-sm text-white"
                  >
                    <option value="">Select trainer</option>
                    {trainers.map((trainer) => (
                      <option key={trainer.trainer_id} value={trainer.trainer_id}>
                        {trainer.trainer_name} · {trainer.stable_name}
                      </option>
                    ))}
                    <option value={ADD_NEW_PROFILE}>+ Add New Profile</option>
                  </select>
                  {selectedTrainerId === ADD_NEW_PROFILE ? (
                    <div className="space-y-2 rounded-lg border border-white/10 bg-black/30 p-3">
                      <p className="text-xs uppercase tracking-[0.2em] text-white/40">Add New Profile</p>
                      <input
                        value={newTrainerName}
                        onChange={(event) => setNewTrainerName(event.target.value)}
                        placeholder="Trainer name"
                        className="w-full rounded border border-white/10 bg-black px-2 py-1.5 text-xs text-white"
                      />
                      <input
                        value={newStableName}
                        onChange={(event) => setNewStableName(event.target.value)}
                        placeholder="Stable name"
                        className="w-full rounded border border-white/10 bg-black px-2 py-1.5 text-xs text-white"
                      />
                      <button
                        type="button"
                        onClick={handleAddTrainer}
                        className="w-full rounded border border-white/15 py-1.5 text-[11px] uppercase tracking-[0.2em] text-white/75 hover:bg-white/5"
                      >
                        Add Trainer
                      </button>
                    </div>
                  ) : null}
                </div>

                <div className="space-y-3">
                  <label className="text-xs uppercase tracking-[0.2em] text-white/40">Owner / Lessor</label>
                  <select
                    value={selectedOwnerId}
                    onChange={(event) => setSelectedOwnerId(event.target.value)}
                    className="w-full rounded-lg border border-white/10 bg-black px-3 py-2 text-sm text-white"
                  >
                    <option value="">Select owner</option>
                    {owners.map((owner) => (
                      <option key={owner.owner_id} value={owner.owner_id}>
                        {owner.owner_name}
                      </option>
                    ))}
                    <option value={ADD_NEW_PROFILE}>+ Add New Profile</option>
                  </select>
                  {selectedOwnerId === ADD_NEW_PROFILE ? (
                    <div className="space-y-2 rounded-lg border border-white/10 bg-black/30 p-3">
                      <p className="text-xs uppercase tracking-[0.2em] text-white/40">Add New Profile</p>
                      <input
                        value={newOwnerName}
                        onChange={(event) => setNewOwnerName(event.target.value)}
                        placeholder="Owner legal name"
                        className="w-full rounded border border-white/10 bg-black px-2 py-1.5 text-xs text-white"
                      />
                      <select
                        value={newOwnerType}
                        onChange={(event) => setNewOwnerType(event.target.value)}
                        className="w-full rounded border border-white/10 bg-black px-2 py-1.5 text-xs text-white"
                      >
                        <option value="company">Company</option>
                        <option value="trust">Trust</option>
                        <option value="individual">Individual</option>
                      </select>
                      <button
                        type="button"
                        onClick={handleAddOwner}
                        className="w-full rounded border border-white/15 py-1.5 text-[11px] uppercase tracking-[0.2em] text-white/75 hover:bg-white/5"
                      >
                        Add Owner
                      </button>
                    </div>
                  ) : null}
                </div>

                <div className="space-y-3">
                  <label className="text-xs uppercase tracking-[0.2em] text-white/40">Governing Body</label>
                  <select
                    value={selectedGoverningBodyCode}
                    onChange={(event) => setSelectedGoverningBodyCode(event.target.value)}
                    className="w-full rounded-lg border border-white/10 bg-black px-3 py-2 text-sm text-white"
                  >
                    <option value="">Select governing body</option>
                    {governingBodies.map((body) => (
                      <option key={body.governing_body_code} value={body.governing_body_code}>
                        {body.governing_body_code} · {body.governing_body_name}
                      </option>
                    ))}
                    <option value={ADD_NEW_PROFILE}>+ Add New Profile</option>
                  </select>
                  {selectedGoverningBodyCode === ADD_NEW_PROFILE ? (
                    <div className="space-y-2 rounded-lg border border-white/10 bg-black/30 p-3">
                      <p className="text-xs uppercase tracking-[0.2em] text-white/40">Add New Profile</p>
                      <input
                        value={newGoverningBodyCode}
                        onChange={(event) => setNewGoverningBodyCode(event.target.value)}
                        placeholder="Code (e.g. HKJC)"
                        className="w-full rounded border border-white/10 bg-black px-2 py-1.5 text-xs text-white"
                      />
                      <input
                        value={newGoverningBodyName}
                        onChange={(event) => setNewGoverningBodyName(event.target.value)}
                        placeholder="Full name"
                        className="w-full rounded border border-white/10 bg-black px-2 py-1.5 text-xs text-white"
                      />
                      <button
                        type="button"
                        onClick={handleAddGoverningBody}
                        className="w-full rounded border border-white/15 py-1.5 text-[11px] uppercase tracking-[0.2em] text-white/75 hover:bg-white/5"
                      >
                        Add Body
                      </button>
                    </div>
                  ) : null}
                </div>
              </div>
            </section>

            {profilesComplete ? (
              <>
                <section className="rounded-2xl border border-white/10 bg-[linear-gradient(165deg,#111111,#0a0a0a)] p-6">
                  <h2 className="text-lg font-medium tracking-tight">Commercial Terms</h2>
                  <div className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    <div>
                      <label className="text-xs uppercase tracking-[0.2em] text-white/40">Start Date</label>
                      <input
                        type="date"
                        value={commercial.startDate}
                        onChange={(event) =>
                          setCommercial((prev) => ({ ...prev, startDate: event.target.value }))
                        }
                        className="mt-2 w-full rounded-lg border border-white/10 bg-black px-3 py-2 text-sm text-white"
                      />
                    </div>
                    <div>
                      <label className="text-xs uppercase tracking-[0.2em] text-white/40">Duration (Months)</label>
                      <input
                        type="number"
                        min={1}
                        value={commercial.durationMonths}
                        onChange={(event) =>
                          setCommercial((prev) => ({ ...prev, durationMonths: event.target.value }))
                        }
                        className="mt-2 w-full rounded-lg border border-white/10 bg-black px-3 py-2 text-sm text-white"
                      />
                    </div>
                    <div>
                      <label className="text-xs uppercase tracking-[0.2em] text-white/40">% Leased</label>
                      <input
                        type="number"
                        min={0}
                        max={100}
                        value={commercial.percentLeased}
                        onChange={(event) =>
                          setCommercial((prev) => ({ ...prev, percentLeased: event.target.value }))
                        }
                        className="mt-2 w-full rounded-lg border border-white/10 bg-black px-3 py-2 text-sm text-white"
                      />
                    </div>
                    <div>
                      <label className="text-xs uppercase tracking-[0.2em] text-white/40">Token Count</label>
                      <input
                        type="number"
                        min={1}
                        value={commercial.tokenCount}
                        onChange={(event) =>
                          setCommercial((prev) => ({ ...prev, tokenCount: event.target.value }))
                        }
                        className="mt-2 w-full rounded-lg border border-white/10 bg-black px-3 py-2 text-sm text-white"
                      />
                    </div>
                    <div>
                      <label className="text-xs uppercase tracking-[0.2em] text-white/40">
                        Monthly Lease Price (NZD)
                      </label>
                      <input
                        type="number"
                        min={0}
                        step="0.01"
                        value={commercial.monthlyLeasePriceNzd}
                        onChange={(event) =>
                          setCommercial((prev) => ({ ...prev, monthlyLeasePriceNzd: event.target.value }))
                        }
                        className="mt-2 w-full rounded-lg border border-white/10 bg-black px-3 py-2 text-sm text-white"
                      />
                    </div>
                    <div>
                      <label className="text-xs uppercase tracking-[0.2em] text-white/40">
                        Investor Split (%)
                      </label>
                      <input
                        type="number"
                        min={0}
                        max={100}
                        value={commercial.investorSharePercent}
                        onChange={(event) =>
                          setCommercial((prev) => ({
                            ...prev,
                            investorSharePercent: event.target.value,
                          }))
                        }
                        className="mt-2 w-full rounded-lg border border-white/10 bg-black px-3 py-2 text-sm text-white"
                      />
                    </div>
                  </div>

                  <div className="mt-5 rounded-xl border border-white/10 bg-black/35 p-4">
                    <p className="text-xs uppercase tracking-[0.2em] text-white/45">Smart Calculations</p>
                    <div className="mt-3 grid gap-3 text-sm md:grid-cols-2 lg:grid-cols-3">
                      <p className="text-white/70">
                        End Date: <span className="text-white">{computed.endDate || '—'}</span>
                      </p>
                      <p className="text-white/70">
                        Annual Price:{' '}
                        <span className="text-white">{formatCurrency(computed.annualLeasePriceNzd)}</span>
                      </p>
                      <p className="text-white/70">
                        Price per 1%:{' '}
                        <span className="text-white">{formatCurrency(computed.pricePerOnePercentNzd)}</span>
                      </p>
                      <p className="text-white/70">
                        % per Token: <span className="text-white">{computed.percentPerToken.toFixed(4)}%</span>
                      </p>
                      <p className="text-white/70">
                        Token Price: <span className="text-white">{formatCurrency(computed.tokenPriceNzd)}</span>
                      </p>
                      <p className="text-white/70">
                        Total Issuance:{' '}
                        <span className="text-white">{formatCurrency(computed.totalIssuanceValueNzd)}</span>
                      </p>
                      <p className="text-white/70">
                        Owner Split: <span className="text-white">{computed.ownerSharePercent}%</span>
                      </p>
                    </div>
                  </div>
                </section>

                <section className="rounded-2xl border border-white/10 bg-[linear-gradient(165deg,#111111,#0a0a0a)] p-6">
                  <label className="text-xs uppercase tracking-[0.2em] text-white/40" htmlFor="extra-info">
                    Extra Info
                  </label>
                  <textarea
                    id="extra-info"
                    rows={4}
                    value={commercial.notes}
                    onChange={(event) =>
                      setCommercial((prev) => ({ ...prev, notes: event.target.value }))
                    }
                    placeholder="Any additional notes, caveats, or issuance commentary..."
                    className="mt-3 w-full rounded-lg border border-white/10 bg-black px-3 py-2 text-sm text-white placeholder:text-white/35"
                  />
                  <button
                    type="submit"
                    className="mt-5 rounded-lg border border-white/15 bg-white/5 px-5 py-3 text-xs uppercase tracking-[0.2em] text-white/80 transition-colors hover:bg-white/10"
                  >
                    {saveState.status === 'saving' ? 'Generating...' : 'Generate SSOT_HLT'}
                  </button>
                </section>
              </>
            ) : (
              <section className="rounded-2xl border border-white/10 bg-[linear-gradient(165deg,#111111,#0a0a0a)] p-6">
                <p className="text-sm text-white/60">
                  Complete trainer, owner, and governing body selection to unlock commercial logic.
                </p>
              </section>
            )}
          </form>
        ) : null}

        {generatedDraft ? (
          <section className="mt-8 rounded-2xl border border-amber-200/30 bg-[#15120b] p-6">
            <p className="text-xs uppercase tracking-[0.2em] text-amber-200/70">Draft Output</p>
            <h2 className="mt-2 text-2xl font-medium tracking-tight text-amber-100">SSOT_HLT</h2>
            <p className="mt-3 text-sm text-amber-100/75">{generatedDraft.hltNarrative}</p>
            {saveState.message ? (
              <p
                className={`mt-3 text-sm ${
                  saveState.status === 'error' ? 'text-red-200' : 'text-amber-100/80'
                }`}
              >
                {saveState.message}
              </p>
            ) : null}
            {saveState.filePath ? (
              <p className="mt-1 text-xs text-amber-100/70">
                {saveState.draftId}: {saveState.filePath}
              </p>
            ) : null}
            <pre className="mt-4 overflow-x-auto rounded-lg border border-amber-100/20 bg-black/35 p-4 text-xs text-amber-100/80">
              {JSON.stringify(generatedDraft, null, 2)}
            </pre>
          </section>
        ) : null}
      </div>
    </main>
  );
}
