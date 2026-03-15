export type SeedTrainer = {
  trainer_id: string;
  trainer_name: string;
  stable_name: string;
  contact_name: string;
  phone: string;
  email: string;
  website: string;
  x_url: string;
  instagram_url: string;
  facebook_url: string;
  profile_origin: string;
  profile_status: string;
  notes: string;
};

export type SeedOwner = {
  owner_id: string;
  owner_name: string;
  entity_type: string;
  contact_name: string;
  phone: string;
  email: string;
  website: string;
  x_url: string;
  instagram_url: string;
  facebook_url: string;
  profile_origin: string;
  profile_status: string;
  notes: string;
};

export type SeedGoverningBody = {
  governing_body_code: string;
  governing_body_name: string;
  website: string;
  status: string;
};

export type SeedHorse = {
  horse_id: string;
  horse_name: string;
  country_code: string;
  foaling_date: string;
  sex: string;
  colour: string;
  sire: string;
  dam: string;
  nztr_life_number: string;
  microchip_number: string;
  trainer_id: string;
  owner_id: string;
  governing_body_code: string;
  breeding_url: string;
  performance_profile_url: string;
  horse_status: string;
  identity_status: string;
  source_primary: string;
  source_last_verified_at: string;
  source_notes: string;
};

export type SeedLease = {
  lease_id: string;
  horse_id: string;
  start_date: string;
  end_date: string;
  duration_months: string;
  percent_leased: string;
  token_count: string;
  percent_per_token: string;
  monthly_lease_price_nzd: string;
  annual_lease_price_nzd: string;
  price_per_one_percent_nzd: string;
  token_price_nzd: string;
  total_issuance_value_nzd: string;
  investor_share_percent: string;
  owner_share_percent: string;
  platform_fee_percent: string;
  lease_status: string;
  created_at: string;
  notes: string;
};

export type SeedDocument = {
  document_id: string;
  lease_id: string;
  horse_id: string;
  document_type: string;
  document_version: string;
  document_date: string;
  file_path: string;
  source_system: string;
  source_reference: string;
  is_current: string;
  checksum_sha256: string;
  notes: string;
};

export type SeedIntakeQueue = {
  intake_id: string;
  submitted_at: string;
  submitted_by: string;
  breeding_url: string;
  parse_status: string;
  parsed_horse_name: string;
  parsed_nztr_life_number: string;
  parsed_microchip: string;
  parsed_performance_profile_url: string;
  parse_notes: string;
};

export type SeedAmendment = {
  amendment_id: string;
  entity_type: string;
  entity_id: string;
  field_name: string;
  old_value: string;
  new_value: string;
  changed_by: string;
  changed_at: string;
  approval_status: string;
  approved_by: string;
  approved_at: string;
  reason: string;
};

export type HorseRaceRow = {
  raceKey: string;
  positionSummary: string;
  dateLabel: string;
  dateIso: string;
  raceName: string;
  raceUrl: string;
  distance: string;
};

export type HorseRacesSnapshot = {
  horseId: string;
  horseName: string;
  performanceProfileUrl: string;
  races: HorseRaceRow[];
};

export type SsotHltCommercial = {
  startDate: string;
  endDate: string;
  durationMonths: number;
  percentLeased: number;
  tokenCount: number;
  monthlyLeasePriceNzd: number;
  annualLeasePriceNzd: number;
  pricePerOnePercentNzd: number;
  percentPerToken: number;
  tokenPriceNzd: number;
  totalIssuanceValueNzd: number;
  investorSharePercent: number;
  ownerSharePercent: number;
};

export type SsotHltDraft = {
  horseId: string;
  horseName: string;
  breedingUrl: string;
  trainerId: string;
  ownerId: string;
  governingBodyCode: string;
  commercial: SsotHltCommercial;
  hltNarrative: string;
  notes: string;
};

export type SsotHltDraftRecord = {
  draftId: string;
  createdAt: string;
  source: string;
  status: 'draft' | 'submitted';
  draft: SsotHltDraft;
};

export type SsotHltDraftListItem = {
  draftId: string;
  createdAt: string;
  source: string;
  status: 'draft' | 'submitted';
  filePath: string;
  horseId: string;
  horseName: string;
};

export type SsotHltDraftSaveResult = {
  draftId: string;
  filePath: string;
  record: SsotHltDraftRecord;
};

export type SsotSeedMeta = {
  version?: string;
  generatedAt?: string;
  sourcePath?: string;
  sourceFiles?: string[];
  loadedFrom?: string;
};

export type SsotSeed = {
  trainers: SeedTrainer[];
  owners: SeedOwner[];
  governingBodies: SeedGoverningBody[];
  horses: SeedHorse[];
  leases: SeedLease[];
  documents: SeedDocument[];
  intakeQueue: SeedIntakeQueue[];
  amendments: SeedAmendment[];
  _meta?: SsotSeedMeta;
};

export type PortalHorse = {
  id: string;
  name: string;
  stake: number;
  investment: number;
  currentValue: number;
  returns: number;
  returnsPercentage: number;
  status: string;
  performance: string;
  performanceProfileUrl: string;
  trainerName: string;
};

export type PortalPortfolio = {
  totalValue: number;
  totalReturns: number;
  returnsPercentage: number;
  activeStakes: number;
  monthlyChange: number;
};

export type PortalSnapshot = {
  portfolio: PortalPortfolio;
  horses: PortalHorse[];
  documentsCount: number;
  leasesCount: number;
};
