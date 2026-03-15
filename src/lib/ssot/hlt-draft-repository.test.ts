import { describe, expect, it } from 'vitest';
import {
  createHltDraftRepository,
  isValidSsotHltDraft,
  resolveHltDraftDataSource,
} from '@/lib/ssot/hlt-draft-repository';

describe('resolveHltDraftDataSource', () => {
  it('defaults to local when unset', () => {
    expect(resolveHltDraftDataSource(undefined)).toBe('local');
  });

  it('keeps firestore when explicitly configured', () => {
    expect(resolveHltDraftDataSource('firestore')).toBe('firestore');
  });

  it('falls back to local for unsupported values', () => {
    expect(resolveHltDraftDataSource('sqlite')).toBe('local');
  });
});

describe('isValidSsotHltDraft', () => {
  it('accepts a complete draft payload', () => {
    expect(
      isValidSsotHltDraft({
        horseId: 'HRS-001',
        horseName: 'Prudentia',
        breedingUrl: 'https://loveracing.nz/Breeding/427416/Prudentia-NZ-2021.aspx',
        trainerId: 'TRN-001',
        ownerId: 'OWN-001',
        governingBodyCode: 'NZTR',
        commercial: {
          startDate: '2026-03-12',
          endDate: '2027-03-11',
          durationMonths: 12,
          percentLeased: 10,
          tokenCount: 20,
          monthlyLeasePriceNzd: 40,
          annualLeasePriceNzd: 480,
          pricePerOnePercentNzd: 48,
          percentPerToken: 0.5,
          tokenPriceNzd: 24,
          totalIssuanceValueNzd: 480,
          investorSharePercent: 80,
          ownerSharePercent: 20,
        },
        hltNarrative: 'Test draft',
        notes: 'Test notes',
      }),
    ).toBe(true);
  });

  it('rejects an incomplete draft payload', () => {
    expect(isValidSsotHltDraft({ horseId: 'HRS-001' })).toBe(false);
  });
});

describe('createHltDraftRepository', () => {
  it('creates a local repository by default', () => {
    const repository = createHltDraftRepository();
    expect(repository.source).toBe('local');
  });

  it('creates a firestore repository when requested', () => {
    const repository = createHltDraftRepository('firestore');
    expect(repository.source).toBe('firestore');
  });
});
