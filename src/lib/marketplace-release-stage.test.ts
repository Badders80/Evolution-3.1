import { afterEach, describe, expect, it, vi } from 'vitest';

describe('marketplace release stage helpers', () => {
  afterEach(() => {
    vi.unstubAllEnvs();
    vi.resetModules();
  });

  it('defaults to working_on when no stage is configured', async () => {
    vi.stubEnv('NEXT_PUBLIC_MARKETPLACE_RELEASE_STAGE', '');
    const mod = await import('./marketplace-release-stage');
    expect(mod.getMarketplaceReleaseStage()).toBe('working_on');
    expect(mod.isMarketplaceWorkingOnStage()).toBe(true);
    expect(mod.isMarketplacePreviewEnabled()).toBe(false);
  });

  it('treats pending as preview-enabled but not production', async () => {
    vi.stubEnv('NEXT_PUBLIC_MARKETPLACE_RELEASE_STAGE', 'pending');
    const mod = await import('./marketplace-release-stage');
    expect(mod.getMarketplaceReleaseStage()).toBe('pending');
    expect(mod.isMarketplacePendingStage()).toBe(true);
    expect(mod.isMarketplacePreviewEnabled()).toBe(true);
    expect(mod.isMarketplaceProductionStage()).toBe(false);
  });

  it('treats production as the public-safe stage', async () => {
    vi.stubEnv('NEXT_PUBLIC_MARKETPLACE_RELEASE_STAGE', 'production');
    const mod = await import('./marketplace-release-stage');
    expect(mod.getMarketplaceReleaseStage()).toBe('production');
    expect(mod.isMarketplaceProductionStage()).toBe(true);
    expect(mod.isMarketplacePreviewEnabled()).toBe(true);
  });
});
