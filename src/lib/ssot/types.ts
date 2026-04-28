export interface SSOTListing {
  id: string;
  slug: string;
  title: string;
  publish_status: string;
  hero_image_src: string;
  images: string[];
  summary: string;
  overview: string;
  horse: {
    id: string;
    name: string;
    country_code: string;
    foaling_date: string;
    sex: string;
    colour: string;
    sire: string;
    dam: string;
    status: string;
    identity_status: string;
    breeding_url: string;
    performance_profile_url: string;
    nztr_life_number: string;
    microchip_number: string;
  };
  trainer: {
    id: string;
    name: string;
    stable_name: string;
    location: string;
    website: string;
  };
  owner: {
    id: string;
    name: string;
    entity_type: string;
  };
  offering: {
    lease_id: string;
    lease_status: string;
    start_date: string;
    end_date: string;
    duration_months: number;
    percent_leased: number;
    token_count: number;
    stake_unit_percent: number;
    token_price_nzd: number;
    total_raise_nzd: number;
    investor_share_percent: number;
    owner_share_percent: number;
    price_per_one_percent_nzd: number;
  };
  application: {
    campaign_key: string;
    source_path: string;
    minimum_stake_percent: number;
    maximum_stake_percent: number;
    default_requested_stake_percent: number;
    default_requested_units: number;
    default_reservation_amount_nzd: number;
    default_status: string;
  };
  disclaimers: string[];
  official_documents: Array<{
    id: string;
    listing_id: string;
    document_type: string;
    title: string;
    description: string;
    file_name: string;
    file_path: string;
    file_size_bytes: number;
    version: string;
    published_at: string;
  }>;
}

export interface SSOTPayload {
  generated_at: string;
  source_seed_path: string;
  publish_statuses: string[];
  application_statuses: string[];
  listings: SSOTListing[];
}