import fs from 'node:fs/promises';
import path from 'node:path';
import type { MarketplaceApplicationStatus } from '@/types/marketplace';

export type MarketplaceManualOpsGoogleSheetsStatus =
  | 'forwarded'
  | 'not_configured'
  | 'failed';

export type MarketplaceManualOpsEntry = {
  submissionReference: string;
  submittedAt: string;
  campaignKey: string;
  source?: string;
  fullName: string;
  email: string;
  phone?: string;
  listingId: string;
  listingSlug: string;
  horseId: string;
  horseName: string;
  leaseId: string;
  requestedStakePercent: number;
  requestedUnits: number;
  reservationAmountNzd: number;
  applicationStatus: MarketplaceApplicationStatus;
  notes?: string;
  googleSheetsStatus: MarketplaceManualOpsGoogleSheetsStatus;
  googleSheetsError?: string;
};

type MarketplaceManualOpsStore = {
  updatedAt: string | null;
  entries: MarketplaceManualOpsEntry[];
};

const DEFAULT_STORE: MarketplaceManualOpsStore = {
  updatedAt: null,
  entries: [],
};

const MAX_ENTRIES = 250;

export function getMarketplaceManualOpsPath(): string {
  return (
    process.env.MARKETPLACE_MANUAL_OPS_PATH?.trim() ||
    path.join(process.cwd(), 'data', 'generated', 'marketplace-manual-ops.json')
  );
}

export async function readMarketplaceManualOpsStore(): Promise<MarketplaceManualOpsStore> {
  const filePath = getMarketplaceManualOpsPath();

  try {
    const raw = await fs.readFile(filePath, 'utf8');
    const parsed = JSON.parse(raw) as Partial<MarketplaceManualOpsStore>;

    return {
      updatedAt:
        typeof parsed.updatedAt === 'string' && parsed.updatedAt
          ? parsed.updatedAt
          : null,
      entries: Array.isArray(parsed.entries) ? parsed.entries : [],
    };
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
      return DEFAULT_STORE;
    }

    throw error;
  }
}

export async function appendMarketplaceManualOpsEntry(
  entry: MarketplaceManualOpsEntry,
): Promise<string> {
  const filePath = getMarketplaceManualOpsPath();
  const currentStore = await readMarketplaceManualOpsStore();
  const nextStore: MarketplaceManualOpsStore = {
    updatedAt: new Date().toISOString(),
    entries: [entry, ...currentStore.entries].slice(0, MAX_ENTRIES),
  };

  await fs.mkdir(path.dirname(filePath), { recursive: true });
  await fs.writeFile(filePath, `${JSON.stringify(nextStore, null, 2)}\n`, 'utf8');

  return filePath;
}
