import { createFirestoreSsotReadRepository } from '@/lib/ssot/firestore-ssot-read-repository';
import { createLocalSsotReadRepository } from '@/lib/ssot/local-ssot-read-repository';
import type { SsotSeed } from '@/types/ssot';

export type SsotDataSource = 'local' | 'firestore';

export type LoadSsotSeedOptions = {
  forceRefresh?: boolean;
};

export interface SsotReadRepository {
  readonly source: SsotDataSource;
  loadSeed(options?: LoadSsotSeedOptions): Promise<SsotSeed>;
}

const DEFAULT_SSOT_DATA_SOURCE: SsotDataSource = 'local';

export function resolveSsotDataSource(
  value: string | undefined = process.env.SSOT_DATA_SOURCE,
): SsotDataSource {
  return value === 'firestore' ? 'firestore' : DEFAULT_SSOT_DATA_SOURCE;
}

export function createSsotReadRepository(
  dataSource: SsotDataSource = resolveSsotDataSource(),
): SsotReadRepository {
  switch (dataSource) {
    case 'firestore':
      return createFirestoreSsotReadRepository();
    case 'local':
    default:
      return createLocalSsotReadRepository();
  }
}
