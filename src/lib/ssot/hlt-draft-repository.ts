import { createFirestoreHltDraftRepository } from '@/lib/ssot/firestore-hlt-draft-repository';
import { createLocalHltDraftRepository } from '@/lib/ssot/local-hlt-draft-repository';
import type {
  SsotHltDraft,
  SsotHltDraftListItem,
  SsotHltDraftSaveResult,
} from '@/types/ssot';

export type HltDraftDataSource = 'local' | 'firestore';

export interface HltDraftRepository {
  readonly source: HltDraftDataSource;
  readonly locationLabel: string;
  listDrafts(): Promise<SsotHltDraftListItem[]>;
  saveDraft(draft: SsotHltDraft): Promise<SsotHltDraftSaveResult>;
}

const DEFAULT_HLT_DRAFT_DATA_SOURCE: HltDraftDataSource = 'local';

const isNonEmpty = (value: unknown): value is string => {
  return typeof value === 'string' && value.trim().length > 0;
};

export function isValidSsotHltDraft(value: unknown): value is SsotHltDraft {
  if (!value || typeof value !== 'object') return false;
  const draft = value as Partial<SsotHltDraft>;
  return (
    isNonEmpty(draft.horseId) &&
    isNonEmpty(draft.horseName) &&
    isNonEmpty(draft.breedingUrl) &&
    isNonEmpty(draft.trainerId) &&
    isNonEmpty(draft.ownerId) &&
    isNonEmpty(draft.governingBodyCode) &&
    Boolean(draft.commercial) &&
    typeof draft.commercial === 'object'
  );
}

export function resolveHltDraftDataSource(
  value: string | undefined = process.env.SSOT_HLT_DATA_SOURCE ?? process.env.SSOT_DATA_SOURCE,
): HltDraftDataSource {
  return value === 'firestore' ? 'firestore' : DEFAULT_HLT_DRAFT_DATA_SOURCE;
}

export function createHltDraftRepository(
  dataSource: HltDraftDataSource = resolveHltDraftDataSource(),
): HltDraftRepository {
  switch (dataSource) {
    case 'firestore':
      return createFirestoreHltDraftRepository();
    case 'local':
    default:
      return createLocalHltDraftRepository();
  }
}
