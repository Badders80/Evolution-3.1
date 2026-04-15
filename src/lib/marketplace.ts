import marketplacePayload from '@/data/marketplace-listings.generated.json';
import type {
  MarketplaceListing,
  MarketplacePayload,
  MarketplacePublishStatus,
} from '@/types/marketplace';

const payload = marketplacePayload as MarketplacePayload;

export function getMarketplacePayload(): MarketplacePayload {
  return payload;
}

export function getMarketplaceListings(
  status: MarketplacePublishStatus = 'live',
): MarketplaceListing[] {
  return payload.listings.filter((listing) => listing.publishStatus === status);
}

export function getMarketplaceListingBySlug(slug: string): MarketplaceListing | null {
  return payload.listings.find((listing) => listing.slug === slug) ?? null;
}

export function formatNzd(amount: number): string {
  return new Intl.NumberFormat('en-NZ', {
    style: 'currency',
    currency: 'NZD',
    maximumFractionDigits: amount % 1 === 0 ? 0 : 2,
  }).format(amount);
}

export function formatPercent(value: number): string {
  return `${Number.isInteger(value) ? value : value.toFixed(2).replace(/\.?0+$/, '')}%`;
}

export function formatDate(value: string): string {
  return new Intl.DateTimeFormat('en-NZ', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(new Date(`${value}T00:00:00`));
}
