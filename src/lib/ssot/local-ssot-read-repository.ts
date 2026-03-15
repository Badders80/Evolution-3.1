import path from 'node:path';
import { readFile } from 'node:fs/promises';
import type { LoadSsotSeedOptions, SsotReadRepository } from '@/lib/ssot/ssot-read-repository';
import type {
  SeedHorse,
  SeedLease,
  SeedTrainer,
  SsotSeed,
  SsotSeedMeta,
} from '@/types/ssot';

const DEFAULT_SEED_PATH = path.resolve(
  process.cwd(),
  '..',
  'SSOT_Build',
  'intake',
  'v0.1',
  'seed.json',
);

const EMPTY_SSOT_SEED: SsotSeed = {
  trainers: [],
  owners: [],
  governingBodies: [],
  horses: [],
  leases: [],
  documents: [],
  intakeQueue: [],
  amendments: [],
};

const toArray = <T>(value: unknown): T[] => {
  return Array.isArray(value) ? (value as T[]) : [];
};

export function resolveLocalSsotSeedPath(
  value: string | undefined = process.env.SSOT_SEED_PATH,
): string {
  if (value && value.trim().length > 0) {
    return path.resolve(value);
  }
  return DEFAULT_SEED_PATH;
}

export function normalizeSsotSeed(raw: unknown, loadedFrom: string): SsotSeed {
  const value = (raw ?? {}) as Partial<SsotSeed> & { _meta?: SsotSeedMeta };
  return {
    trainers: toArray<SeedTrainer>(value.trainers),
    owners: toArray(value.owners),
    governingBodies: toArray(value.governingBodies),
    horses: toArray<SeedHorse>(value.horses),
    leases: toArray<SeedLease>(value.leases),
    documents: toArray(value.documents),
    intakeQueue: toArray(value.intakeQueue),
    amendments: toArray(value.amendments),
    _meta: {
      ...(value._meta ?? {}),
      loadedFrom,
    },
  };
}

async function readSeedFromDisk(): Promise<SsotSeed> {
  const seedPath = resolveLocalSsotSeedPath();
  const raw = await readFile(seedPath, 'utf8');
  return normalizeSsotSeed(JSON.parse(raw), seedPath);
}

export function createLocalSsotReadRepository(): SsotReadRepository {
  let cachedSeedPromise: Promise<SsotSeed> | null = null;

  return {
    source: 'local',
    async loadSeed(options: LoadSsotSeedOptions = {}) {
      if (options.forceRefresh || !cachedSeedPromise) {
        cachedSeedPromise = readSeedFromDisk();
      }

      try {
        return await cachedSeedPromise;
      } catch (error) {
        cachedSeedPromise = null;
        throw error;
      }
    },
  };
}

export function getEmptySsotSeed(): SsotSeed {
  return EMPTY_SSOT_SEED;
}
