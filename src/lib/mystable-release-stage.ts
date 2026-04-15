export type MyStableReleaseStage = 'working_on' | 'pending' | 'production';

export function getMyStableReleaseStage(): MyStableReleaseStage {
  const raw = process.env.NEXT_PUBLIC_MYSTABLE_RELEASE_STAGE?.trim();
  if (raw === 'working_on' || raw === 'pending' || raw === 'production') {
    return raw;
  }
  return 'working_on';
}

export function isMyStablePendingStage(): boolean {
  return getMyStableReleaseStage() === 'pending';
}

export function isMyStableProductionStage(): boolean {
  return getMyStableReleaseStage() === 'production';
}

export function isMyStableWorkingOnStage(): boolean {
  return getMyStableReleaseStage() === 'working_on';
}

export function isMyStablePreviewEnabled(): boolean {
  const stage = getMyStableReleaseStage();
  return stage === 'pending' || stage === 'production';
}