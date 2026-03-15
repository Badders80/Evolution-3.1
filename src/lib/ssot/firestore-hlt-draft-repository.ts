import type { HltDraftRepository } from '@/lib/ssot/hlt-draft-repository';

const FIRESTORE_NOT_READY_MESSAGE =
  'SSOT_HLT_DATA_SOURCE=firestore is configured, but the Firestore-backed HltDraftRepository is not implemented yet.';

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

const buildHint = () => {
  const missing = missingFirestoreContext();
  return missing.length > 0
    ? ` Missing env: ${missing.join(', ')}.`
    : ' The seam is ready; the Firestore implementation is the next step.';
};

export function createFirestoreHltDraftRepository(): HltDraftRepository {
  return {
    source: 'firestore',
    locationLabel: 'firestore://ssot_hlt_drafts',
    async listDrafts() {
      throw new Error(`${FIRESTORE_NOT_READY_MESSAGE}${buildHint()}`);
    },
    async saveDraft() {
      throw new Error(`${FIRESTORE_NOT_READY_MESSAGE}${buildHint()}`);
    },
  };
}
