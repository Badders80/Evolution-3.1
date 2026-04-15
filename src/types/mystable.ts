export type MyStableStakeStatus = 'pending_payment' | 'active' | 'matured' | 'cancelled';

export type MyStableStake = {
  id: string;
  userId: string;
  listingId: string;
  listingSlug: string;
  horseName: string;
  horseColour: string;
  horseSex: string;
  trainerName: string;
  stakePercent: number;
  units: number;
  investedNzd: number;
  status: MyStableStakeStatus;
  acquiredAt: string;
  leaseEndDate: string;
  heroImageSrc: string;
};

export type MyStablePortfolio = {
  userId: string;
  totalInvestedNzd: number;
  totalStakes: number;
  activeStakes: number;
  stakes: MyStableStake[];
};