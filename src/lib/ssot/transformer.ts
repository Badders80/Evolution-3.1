import type { SSOTListing } from "./types";
import type { MarketplaceListing, OfficialDocument } from "@/types/marketplace";

export function transformSSOTToListing(ssot: SSOTListing): MarketplaceListing {
  return {
    id: ssot.id,
    slug: ssot.slug,
    title: ssot.title,
    publishStatus: asPublishStatus(ssot.publish_status),
    heroImageSrc: ssot.hero_image_src,
    images: ssot.images,
    summary: ssot.summary,
    overview: ssot.overview,
    horse: {
      id: ssot.horse.id,
      name: ssot.horse.name,
      countryCode: ssot.horse.country_code,
      foalingDate: ssot.horse.foaling_date,
      sex: ssot.horse.sex,
      colour: ssot.horse.colour,
      sire: ssot.horse.sire,
      dam: ssot.horse.dam,
      status: ssot.horse.status,
      identityStatus: ssot.horse.identity_status,
      breedingUrl: ssot.horse.breeding_url,
      performanceProfileUrl: ssot.horse.performance_profile_url,
      nztrLifeNumber: ssot.horse.nztr_life_number,
      microchipNumber: ssot.horse.microchip_number,
    },
    trainer: {
      id: ssot.trainer.id,
      name: ssot.trainer.name,
      stableName: ssot.trainer.stable_name,
      location: ssot.trainer.location,
      website: ssot.trainer.website,
    },
    owner: {
      id: ssot.owner.id,
      name: ssot.owner.name,
      entityType: ssot.owner.entity_type,
    },
    offering: {
      leaseId: ssot.offering.lease_id,
      leaseStatus: ssot.offering.lease_status,
      startDate: ssot.offering.start_date,
      endDate: ssot.offering.end_date,
      durationMonths: ssot.offering.duration_months,
      percentLeased: ssot.offering.percent_leased,
      tokenCount: ssot.offering.token_count,
      stakeUnitPercent: ssot.offering.stake_unit_percent,
      tokenPriceNzd: ssot.offering.token_price_nzd,
      totalRaiseNzd: ssot.offering.total_raise_nzd,
      investorSharePercent: ssot.offering.investor_share_percent,
      ownerSharePercent: ssot.offering.owner_share_percent,
      pricePerOnePercentNzd: ssot.offering.price_per_one_percent_nzd,
    },
    application: {
      campaignKey: ssot.application.campaign_key,
      sourcePath: ssot.application.source_path,
      minimumStakePercent: ssot.application.minimum_stake_percent,
      maximumStakePercent: ssot.application.maximum_stake_percent,
      defaultRequestedStakePercent: ssot.application.default_requested_stake_percent,
      defaultRequestedUnits: ssot.application.default_requested_units,
      defaultReservationAmountNzd: ssot.application.default_reservation_amount_nzd,
      defaultStatus: asApplicationStatus(ssot.application.default_status),
    },
    disclaimers: ssot.disclaimers,
    officialDocuments: ssot.official_documents.map(
      (doc): OfficialDocument => ({
        id: doc.id,
        listingId: doc.listing_id,
        documentType: asDocumentType(doc.document_type),
        title: doc.title,
        description: doc.description,
        fileName: doc.file_name,
        filePath: doc.file_path,
        fileSizeBytes: doc.file_size_bytes,
        version: doc.version,
        publishedAt: doc.published_at,
      })
    ),
  };
}

function asPublishStatus(
  value: string
): MarketplaceListing["publishStatus"] {
  const valid = ["draft", "ready_to_publish", "live", "closed"] as const;
  return valid.includes(value as (typeof valid)[number])
    ? (value as MarketplaceListing["publishStatus"])
    : "draft";
}

function asApplicationStatus(
  value: string
): MarketplaceListing["application"]["defaultStatus"] {
  const valid = ["submitted", "under_review", "reserved_manual", "closed"] as const;
  return valid.includes(value as (typeof valid)[number])
    ? (value as MarketplaceListing["application"]["defaultStatus"])
    : "submitted";
}

function asDocumentType(
  value: string
): OfficialDocument["documentType"] {
  const valid = ["hlt_term_sheet", "pds", "syndicate_agreement"] as const;
  return valid.includes(value as (typeof valid)[number])
    ? (value as OfficialDocument["documentType"])
    : "pds";
}