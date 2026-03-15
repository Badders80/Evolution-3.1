import type { LoadSsotSeedOptions, SsotReadRepository } from '@/lib/ssot/ssot-read-repository';

const FIRESTORE_NOT_READY_MESSAGE =
  'SSOT_DATA_SOURCE=firestore is configured, but the Firestore-backed SsotReadRepository is not implemented yet.';

const missingFirestoreContext = () => {
  const missing: string[] = [];

  if (!process.env.GOOGLE_CLOUD_PROJECT) {
    missing.push('GOOGLE_CLOUD_PROJECT');
  }

  if (!process.env.GOOGLE_CLOUD_LOCATION) {
    missing.push('GOOGLE_CLOUD_LOCATION');
  }

  return missing;
};

export function createFirestoreSsotReadRepository(): SsotReadRepository {
  return {
    source: 'firestore',
    async loadSeed(_options: LoadSsotSeedOptions = {}) {
      const missing = missingFirestoreContext();
      const hint =
        missing.length > 0
          ? ` Missing env: ${missing.join(', ')}.`
          : ' The seam is ready; the Firestore implementation is the next step.';

      throw new Error(`${FIRESTORE_NOT_READY_MESSAGE}${hint}`);
    },
  };
}
