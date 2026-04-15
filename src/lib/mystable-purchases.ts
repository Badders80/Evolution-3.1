import fs from 'node:fs/promises';
import path from 'node:path';
import type { MyStableStakeStatus } from '@/types/mystable';

export type MystablePurchaseEntry = {
  purchaseId: string;
  stripeSessionId: string;
  createdAt: string;
  listingId: string;
  listingSlug: string;
  horseName: string;
  horseColour: string;
  horseSex: string;
  trainerName: string;
  heroImageSrc: string;
  customerEmail: string;
  customerName: string;
  phone?: string;
  notes?: string;
  requestedStakePercent: number;
  requestedUnits: number;
  reservationAmountNzd: number;
  status: MyStableStakeStatus;
  leaseEndDate: string;
  documentAcknowledgements: Record<string, boolean>;
};

type MystablePurchaseStore = {
  updatedAt: string | null;
  entries: MystablePurchaseEntry[];
};

const DEFAULT_STORE: MystablePurchaseStore = {
  updatedAt: null,
  entries: [],
};

const MAX_ENTRIES = 500;

export function getMystablePurchasesPath(): string {
  return path.join(
    process.cwd(),
    'data',
    'generated',
    'mystable-purchases.json',
  );
}

export async function readMystablePurchaseStore(): Promise<MystablePurchaseStore> {
  const filePath = getMystablePurchasesPath();

  try {
    const raw = await fs.readFile(filePath, 'utf8');
    const parsed = JSON.parse(raw) as Partial<MystablePurchaseStore>;

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

export async function appendMystablePurchaseEntry(
  entry: MystablePurchaseEntry,
): Promise<string> {
  const filePath = getMystablePurchasesPath();
  const currentStore = await readMystablePurchaseStore();
  const nextStore: MystablePurchaseStore = {
    updatedAt: new Date().toISOString(),
    entries: [entry, ...currentStore.entries].slice(0, MAX_ENTRIES),
  };

  await fs.mkdir(path.dirname(filePath), { recursive: true });
  await fs.writeFile(filePath, `${JSON.stringify(nextStore, null, 2)}\n`, 'utf8');

  return filePath;
}