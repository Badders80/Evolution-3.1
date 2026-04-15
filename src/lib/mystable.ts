import { readMystablePurchaseStore } from '@/lib/mystable-purchases';
import type { MyStablePortfolio, MyStableStake } from '@/types/mystable';

/**
 * Builds a MyStable portfolio for a given user (identified by email).
 * Reads from the file-based purchase store and maps entries to stake objects.
 */
export async function getMyStablePortfolio(
  userId: string,
): Promise<MyStablePortfolio> {
  const store = await readMystablePurchaseStore();

  const userStakes: MyStableStake[] = store.entries
    .filter((entry) => entry.customerEmail.toLowerCase() === userId.toLowerCase())
    .map((entry) => ({
      id: entry.purchaseId,
      userId: entry.customerEmail,
      listingId: entry.listingId,
      listingSlug: entry.listingSlug,
      horseName: entry.horseName,
      horseColour: entry.horseColour,
      horseSex: entry.horseSex,
      trainerName: entry.trainerName,
      stakePercent: entry.requestedStakePercent,
      units: entry.requestedUnits,
      investedNzd: entry.reservationAmountNzd,
      status: entry.status,
      acquiredAt: entry.createdAt,
      leaseEndDate: entry.leaseEndDate,
      heroImageSrc: entry.heroImageSrc,
    }));

  const totalInvestedNzd = userStakes.reduce(
    (sum, stake) => sum + stake.investedNzd,
    0,
  );
  const activeStakes = userStakes.filter(
    (stake) => stake.status === 'active',
  ).length;

  return {
    userId,
    totalInvestedNzd,
    totalStakes: userStakes.length,
    activeStakes,
    stakes: userStakes,
  };
}