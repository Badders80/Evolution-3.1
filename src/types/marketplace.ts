export type MarketplacePublishStatus = 'draft' | 'ready_to_publish' | 'live' | 'closed';
export type MarketplaceApplicationStatus = 'submitted' | 'under_review' | 'reserved_manual' | 'closed';

export type OfficialDocumentType = 'hlt_term_sheet' | 'pds' | 'syndicate_agreement';

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
    leaseId: string;
    leaseStatus: string;
    startDate: string;
    endDate: string;
    durationMonths: number;
    percentLeased: number;
    tokenCount: number;
    stakeUnitPercent: number;
    tokenPriceNzd: number;
    totalRaiseNzd: number;
    investorSharePercent: number;
    ownerSharePercent: number;
    pricePerOnePercentNzd: number;
  };
  application: {
    campaignKey: string;
    sourcePath: string;
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
