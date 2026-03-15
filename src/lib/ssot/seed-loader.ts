import { getEmptySsotSeed } from '@/lib/ssot/local-ssot-read-repository';
import {
  createSsotReadRepository,
  resolveSsotDataSource,
  type SsotReadRepository,
} from '@/lib/ssot/ssot-read-repository';
import type {
  PortalHorse,
  PortalSnapshot,
  SsotSeed,
} from '@/types/ssot';

const toNumber = (value: string | undefined): number => {
  const parsed = Number(value ?? 0);
  return Number.isFinite(parsed) ? parsed : 0;
};

let cachedRepository: SsotReadRepository | null = null;
let cachedRepositorySource: ReturnType<typeof resolveSsotDataSource> | null = null;

export function getSsotReadRepository(): SsotReadRepository {
  const dataSource = resolveSsotDataSource();
  if (!cachedRepository || cachedRepositorySource !== dataSource) {
    cachedRepository = createSsotReadRepository(dataSource);
    cachedRepositorySource = dataSource;
  }
  return cachedRepository;
}

export async function loadSsotSeed(forceRefresh = false): Promise<SsotSeed> {
  return getSsotReadRepository().loadSeed({ forceRefresh });
}

const toPortalStatus = (horseStatus: string, leaseStatus: string) => {
  if (leaseStatus === 'active') return 'racing';
  if (leaseStatus === 'proposed') return 'proposed';
  if (leaseStatus === 'completed') return 'completed';
  return horseStatus || 'draft';
};

const toPortalHorses = (seed: SsotSeed): PortalHorse[] => {
  const trainerById = new Map(seed.trainers.map((trainer) => [trainer.trainer_id, trainer]));
  const leaseByHorseId = new Map(seed.leases.map((lease) => [lease.horse_id, lease]));

  return seed.horses
    .map((horse) => {
      const lease = leaseByHorseId.get(horse.horse_id);
      const trainer = trainerById.get(horse.trainer_id);
      const tokenCount = toNumber(lease?.token_count);
      const tokenPrice = toNumber(lease?.token_price_nzd);
      const issuanceValue =
        toNumber(lease?.total_issuance_value_nzd) || tokenCount * tokenPrice;

      return {
        id: horse.horse_id,
        name: horse.horse_name,
        stake: toNumber(lease?.percent_leased),
        investment: issuanceValue,
        currentValue: issuanceValue,
        returns: 0,
        returnsPercentage: 0,
        status: toPortalStatus(horse.horse_status, lease?.lease_status ?? ''),
        performance: horse.nztr_life_number || 'No race profile',
        performanceProfileUrl: horse.performance_profile_url,
        trainerName: trainer?.trainer_name || 'Unassigned trainer',
      };
    })
    .sort((a, b) => a.name.localeCompare(b.name));
};

export function buildPortalSnapshot(seed: SsotSeed): PortalSnapshot {
  const horses = toPortalHorses(seed);
  const totalValue = horses.reduce((sum, horse) => sum + horse.currentValue, 0);
  const activeStakes = seed.leases.filter((lease) => lease.lease_status === 'active').length;

  return {
    portfolio: {
      totalValue,
      totalReturns: 0,
      returnsPercentage: 0,
      activeStakes,
      monthlyChange: 0,
    },
    horses,
    documentsCount: seed.documents.length,
    leasesCount: seed.leases.length,
  };
}

export function getEmptySeed(): SsotSeed {
  return getEmptySsotSeed();
}
