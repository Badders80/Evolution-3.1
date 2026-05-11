export type MarketplacePublishStatus =
  | "draft"
  | "ready_to_publish"
  | "live"
  | "closed";
export type MarketplaceApplicationStatus =
  | "submitted"
  | "under_review"
  | "reserved_manual"
  | "closed"
  | "interest";
export type OfferingType = "lease" | "ownership";
export type ApplicationFlow = "direct_purchase" | "interest_enquiry";

export type OfficialDocumentType =
  | "hlt_term_sheet"
  | "pds"
  | "syndicate_agreement"
  | "share_purchase_agreement"
  | "training_management_agreement";

export type OfficialDocument = {
  id: string;
  listingId: string;
  documentType: OfficialDocumentType;
  title: string;
  description: string;
  fileName: string;
  filePath: string;
  fileSizeBytes: number;
  version: string;
  publishedAt: string;
};

export type MarketplaceListing = {
  id: string;
  slug: string;
  title: string;
  publishStatus: MarketplacePublishStatus;
  heroImageSrc: string;
  images: string[];
  summary: string;
  overview: string;
  horse: {
    id: string;
    name: string;
    countryCode: string;
    foalingDate: string;
    sex: string;
    colour: string;
    sire: string;
    dam: string;
    status: string;
    identityStatus: string;
    breedingUrl: string;
    performanceProfileUrl: string;
    nztrLifeNumber: string;
    microchipNumber: string;
  };
  trainer: {
    id: string;
    name: string;
    stableName: string;
    location: string;
    website: string;
  };
  owner: {
    id: string;
    name: string;
    entityType: string;
  };
  offering: {
    offeringType: OfferingType;
    // ── Lease fields (required when offeringType === 'lease') ──
    leaseId?: string;
    leaseStatus?: string;
    startDate?: string;
    endDate?: string;
    durationMonths?: number;
    percentLeased?: number;
    tokenCount?: number;
    stakeUnitPercent?: number;
    tokenPriceNzd?: number;
    totalRaiseNzd?: number;
    investorSharePercent?: number;
    ownerSharePercent?: number;
    // ── Common / both types ──
    pricePerOnePercentNzd: number;
    // ── Ownership fields (required when offeringType === 'ownership') ──
    percentAvailable?: number;
    shareSizeOptions?: number[];
    purchasePriceNzd?: number;
    monthlyCostPerOnePercentNzd?: number;
    monthlyCostStartDate?: string;
    costsIncludedInBuyIn?: string[];
    managementFeeNzd?: number;
    managementFeeCapped?: boolean;
  };
  application: {
    campaignKey: string;
    sourcePath: string;
    applicationFlow: ApplicationFlow;
    minimumStakePercent: number;
    maximumStakePercent: number;
    defaultRequestedStakePercent: number;
    defaultRequestedUnits: number;
    defaultReservationAmountNzd: number;
    defaultStatus: MarketplaceApplicationStatus;
  };
  disclaimers: string[];
  officialDocuments: OfficialDocument[];
};

export type MarketplacePayload = {
  generatedAt: string;
  sourceSeedPath: string;
  publishStatuses: MarketplacePublishStatus[];
  applicationStatuses: MarketplaceApplicationStatus[];
  listings: MarketplaceListing[];
};
