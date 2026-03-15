'use client';

import { useEffect, useMemo, useState } from 'react';
import type { HorseRaceRow, HorseRacesSnapshot } from '@/types/ssot';

type Props = {
  horseId: string;
  horseName: string;
  performanceProfileUrl: string;
};

type RacesApiResponse = {
  ok: boolean;
  warning?: string;
  snapshot?: HorseRacesSnapshot;
  error?: string;
};

const toRaceLabel = (race: HorseRaceRow) => {
  return `${race.dateLabel} · ${race.positionSummary}`;
};

export function LastThreeRaces({ horseId, horseName, performanceProfileUrl }: Props) {
  const [races, setRaces] = useState<HorseRaceRow[]>([]);
  const [selectedRaceKey, setSelectedRaceKey] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [warning, setWarning] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    const loadRaces = async () => {
      try {
        const response = await fetch(`/api/horses/${encodeURIComponent(horseId)}/races`, {
          cache: 'no-store',
        });
        const payload = (await response.json()) as RacesApiResponse;
        if (!response.ok || !payload.ok || !payload.snapshot) {
          throw new Error(payload.error || 'Failed to load race lines.');
        }

        if (!cancelled) {
          const raceRows = payload.snapshot.races ?? [];
          setRaces(raceRows);
          setSelectedRaceKey(raceRows[0]?.raceKey ?? '');
          setWarning(payload.warning ?? null);
        }
      } catch (error) {
        if (!cancelled) {
          setRaces([]);
          setSelectedRaceKey('');
          setWarning(error instanceof Error ? error.message : 'Failed to load races.');
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    };

    loadRaces();

    return () => {
      cancelled = true;
    };
  }, [horseId]);

  const selectedRace = useMemo(() => {
    if (!selectedRaceKey) return races[0] ?? null;
    return races.find((race) => race.raceKey === selectedRaceKey) ?? races[0] ?? null;
  }, [races, selectedRaceKey]);

  return (
    <div className="rounded-2xl border border-white/10 bg-[linear-gradient(165deg,#111111,#090909)] p-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-white/40">Race Snapshot</p>
          <h3 className="mt-2 text-xl font-medium tracking-tight text-white">Last Three Races</h3>
          <p className="mt-2 text-sm text-white/60">
            Parsed from the live Horse Performance Profile and kept linked to source.
          </p>
        </div>
        <div className="flex w-full flex-col gap-3 md:w-[320px]">
          <label className="text-xs uppercase tracking-[0.2em] text-white/40" htmlFor="race-select">
            Select Race
          </label>
          <select
            id="race-select"
            value={selectedRace?.raceKey ?? ''}
            onChange={(event) => setSelectedRaceKey(event.target.value)}
            disabled={races.length === 0 || isLoading}
            className="rounded-lg border border-white/10 bg-black px-3 py-2 text-sm text-white focus:border-white/30 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
          >
            {races.length === 0 ? (
              <option value="">{isLoading ? 'Loading races...' : 'No races parsed'}</option>
            ) : (
              races.map((race) => (
                <option key={race.raceKey} value={race.raceKey}>
                  {toRaceLabel(race)}
                </option>
              ))
            )}
          </select>
        </div>
      </div>

      <div className="mt-5 rounded-xl border border-white/10 bg-black/40 p-4">
        {selectedRace ? (
          <>
            <p className="text-sm text-white/70">
              <span className="font-medium text-white">{horseName}</span> · {selectedRace.dateLabel}
            </p>
            <div className="mt-3 grid gap-3 md:grid-cols-3">
              <div className="rounded-lg border border-white/10 bg-black/30 p-3">
                <p className="text-[10px] uppercase tracking-[0.2em] text-white/45">Position</p>
                <p className="mt-1 text-sm text-white/90">{selectedRace.positionSummary}</p>
              </div>
              <div className="rounded-lg border border-white/10 bg-black/30 p-3">
                <p className="text-[10px] uppercase tracking-[0.2em] text-white/45">Distance</p>
                <p className="mt-1 text-sm text-white/90">{selectedRace.distance || 'N/A'}</p>
              </div>
              <div className="rounded-lg border border-white/10 bg-black/30 p-3">
                <p className="text-[10px] uppercase tracking-[0.2em] text-white/45">Race</p>
                <a
                  href={selectedRace.raceUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-1 block text-sm text-white/90 underline decoration-white/30 underline-offset-2 hover:text-white"
                >
                  {selectedRace.raceName}
                </a>
              </div>
            </div>
          </>
        ) : (
          <p className="text-sm text-white/65">
            No race rows were parsed yet. Use the live profile link below.
          </p>
        )}

        <div className="mt-4 overflow-hidden rounded-lg border border-white/10">
          <table className="w-full text-left text-xs">
            <thead className="bg-white/5 text-white/55">
              <tr>
                <th className="px-3 py-2 font-medium">Date</th>
                <th className="px-3 py-2 font-medium">Position</th>
                <th className="px-3 py-2 font-medium">Distance</th>
                <th className="px-3 py-2 font-medium">Race</th>
              </tr>
            </thead>
            <tbody>
              {races.map((race) => (
                <tr key={race.raceKey} className="border-t border-white/10 text-white/75">
                  <td className="px-3 py-2">{race.dateLabel}</td>
                  <td className="px-3 py-2">{race.positionSummary}</td>
                  <td className="px-3 py-2">{race.distance || 'N/A'}</td>
                  <td className="px-3 py-2">
                    <a
                      href={race.raceUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="underline decoration-white/25 underline-offset-2 hover:text-white"
                    >
                      {race.raceName}
                    </a>
                  </td>
                </tr>
              ))}
              {races.length === 0 ? (
                <tr className="border-t border-white/10">
                  <td colSpan={4} className="px-3 py-3 text-white/55">
                    {isLoading ? 'Loading race lines...' : 'No race lines available.'}
                  </td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>

        {warning ? (
          <p className="mt-3 text-xs text-amber-200/80">
            Live parse warning: {warning}. Falling back to source links.
          </p>
        ) : null}

        <a
          href={performanceProfileUrl}
          target="_blank"
          rel="noreferrer"
          className="mt-4 inline-flex items-center text-xs uppercase tracking-[0.2em] text-white/70 transition-colors hover:text-white"
        >
          Open Horse Performance Profile
        </a>
      </div>
    </div>
  );
}
