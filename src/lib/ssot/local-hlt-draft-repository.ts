import { randomUUID } from 'node:crypto';
import { mkdir, readFile, readdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import {
  isValidSsotHltDraft,
  type HltDraftRepository,
} from '@/lib/ssot/hlt-draft-repository';
import type {
  SsotHltDraft,
  SsotHltDraftListItem,
  SsotHltDraftRecord,
  SsotHltDraftSaveResult,
} from '@/types/ssot';

const DEFAULT_HLT_DRAFTS_DIR = path.resolve(
  process.cwd(),
  '..',
  'SSOT_Build',
  'intake',
  'v0.1',
  'hlt_drafts',
);

const isValidRecord = (value: unknown): value is SsotHltDraftRecord => {
  if (!value || typeof value !== 'object') return false;
  const record = value as Partial<SsotHltDraftRecord>;
  return (
    typeof record.draftId === 'string' &&
    record.draftId.trim().length > 0 &&
    typeof record.createdAt === 'string' &&
    record.createdAt.trim().length > 0 &&
    typeof record.source === 'string' &&
    record.source.trim().length > 0 &&
    (record.status === 'draft' || record.status === 'submitted') &&
    isValidSsotHltDraft(record.draft)
  );
};

const toSortKey = (value: string) => {
  const parsed = Date.parse(value);
  return Number.isNaN(parsed) ? 0 : parsed;
};

export function resolveLocalHltDraftsDir(
  value: string | undefined = process.env.SSOT_HLT_DRAFTS_DIR,
): string {
  if (value && value.trim().length > 0) {
    return path.resolve(value);
  }
  return DEFAULT_HLT_DRAFTS_DIR;
}

export function createLocalHltDraftRepository(): HltDraftRepository {
  const draftsDir = resolveLocalHltDraftsDir();

  return {
    source: 'local',
    locationLabel: draftsDir,
    async listDrafts(): Promise<SsotHltDraftListItem[]> {
      await mkdir(draftsDir, { recursive: true });
      const files = await readdir(draftsDir, { withFileTypes: true });

      const draftItems = await Promise.all(
        files
          .filter((entry) => entry.isFile() && entry.name.endsWith('.json'))
          .map(async (entry) => {
            const filePath = path.join(draftsDir, entry.name);
            try {
              const raw = await readFile(filePath, 'utf8');
              const parsed: unknown = JSON.parse(raw);
              if (!isValidRecord(parsed)) {
                return null;
              }

              return {
                draftId: parsed.draftId,
                createdAt: parsed.createdAt,
                source: parsed.source,
                status: parsed.status,
                filePath,
                horseId: parsed.draft.horseId,
                horseName: parsed.draft.horseName,
              } satisfies SsotHltDraftListItem;
            } catch {
              return null;
            }
          }),
      );

      return draftItems
        .filter((item): item is SsotHltDraftListItem => Boolean(item))
        .sort((a, b) => toSortKey(b.createdAt) - toSortKey(a.createdAt));
    },
    async saveDraft(draft: SsotHltDraft): Promise<SsotHltDraftSaveResult> {
      const draftId = `HLT-${new Date()
        .toISOString()
        .replace(/[-:.TZ]/g, '')
        .slice(0, 14)}-${randomUUID().slice(0, 8)}`;
      const record: SsotHltDraftRecord = {
        draftId,
        createdAt: new Date().toISOString(),
        source: 'mystable-intake-v0.1',
        status: 'draft',
        draft,
      };

      await mkdir(draftsDir, { recursive: true });
      const outputPath = path.join(draftsDir, `${draftId}.json`);
      await writeFile(outputPath, `${JSON.stringify(record, null, 2)}\n`, 'utf8');

      return {
        draftId,
        filePath: outputPath,
        record,
      };
    },
  };
}
