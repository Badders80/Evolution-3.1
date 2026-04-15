export type MarketplaceReleaseStage = 'working_on' | 'pending' | 'production';

export function getMarketplaceReleaseStage(): MarketplaceReleaseStage {
  const raw = process.env.NEXT_PUBLIC_MARKETPLACE_RELEASE_STAGE?.trim();
  if (raw === 'working_on' || raw === 'pending' || raw === 'production') {
    return raw;
  }
  return 'working_on';
}

export function isMarketplacePendingStage(): boolean {
  return getMarketplaceReleaseStage() === 'pending';
}

export function isMarketplaceProductionStage(): boolean {
  return getMarketplaceReleaseStage() === 'production';
}

export function isMarketplaceWorkingOnStage(): boolean {
  return getMarketplaceReleaseStage() === 'working_on';
}

export function isMarketplacePreviewEnabled(): boolean {
  const stage = getMarketplaceReleaseStage();
  return stage === 'pending' || stage === 'production';
}
