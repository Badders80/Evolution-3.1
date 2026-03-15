import { describe, expect, it } from 'vitest';
import {
  createSsotReadRepository,
  resolveSsotDataSource,
} from '@/lib/ssot/ssot-read-repository';

describe('resolveSsotDataSource', () => {
  it('defaults to local when unset', () => {
    expect(resolveSsotDataSource(undefined)).toBe('local');
  });

  it('keeps firestore when explicitly configured', () => {
    expect(resolveSsotDataSource('firestore')).toBe('firestore');
  });

  it('falls back to local for unsupported values', () => {
    expect(resolveSsotDataSource('sqlite')).toBe('local');
  });
});

describe('createSsotReadRepository', () => {
  it('creates a local repository by default', () => {
    const repository = createSsotReadRepository();
    expect(repository.source).toBe('local');
  });

  it('creates a firestore repository when requested', () => {
    const repository = createSsotReadRepository('firestore');
    expect(repository.source).toBe('firestore');
  });
});
