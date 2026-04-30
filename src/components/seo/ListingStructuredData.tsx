import React from "react";
import type { MarketplaceListing } from "@/types/marketplace";

interface ListingStructuredDataProps {
  listing: MarketplaceListing;
  url: string;
}

/**
 * Generates JSON-LD structured data for a marketplace listing.
 *
 * Includes:
 * - Product schema (for price, availability, brand)
 * - Horse schema (custom type via Thing + additionalType)
 * - BreadcrumbList schema
 */
export function ListingStructuredData({
  listing,
  url,
}: ListingStructuredDataProps) {
  const { horse, trainer, owner, offering, title, summary } = listing;

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: title || `${horse.name} — Racehorse Syndicate`,
    description:
      summary || `Own shares in ${horse.name}, trained by ${trainer.name}.`,
    brand: {
      "@type": "Brand",
      name: "Evolution Stables",
      logo: "https://evolutionstables.nz/images/Logo-Gold-Favicon.png",
    },
    manufacturer: {
      "@type": "Organization",
      name: owner.name || "Evolution Stables",
    },
    offers: {
      "@type": "Offer",
      url,
      priceCurrency: "NZD",
      price: offering.tokenPriceNzd.toString(),
      availability:
        offering.tokenCount > (offering.percentLeased || 0)
          ? "https://schema.org/InStock"
          : "https://schema.org/OutOfStock",
      validFrom: offering.startDate,
      priceValidUntil: offering.endDate,
      eligibleRegion: {
        "@type": "Place",
        name: "New Zealand",
      },
    },
    additionalProperty: [
      {
        "@type": "PropertyValue",
        name: "Horse Name",
        value: horse.name,
      },
      {
        "@type": "PropertyValue",
        name: "Sex",
        value: horse.sex,
      },
      {
        "@type": "PropertyValue",
        name: "Colour",
        value: horse.colour,
      },
      {
        "@type": "PropertyValue",
        name: "Foaling Date",
        value: horse.foalingDate,
      },
      {
        "@type": "PropertyValue",
        name: "Sire",
        value: horse.sire,
      },
      {
        "@type": "PropertyValue",
        name: "Dam",
        value: horse.dam,
      },
      {
        "@type": "PropertyValue",
        name: "Trainer",
        value: trainer.name,
      },
      {
        "@type": "PropertyValue",
        name: "Total Shares",
        value: offering.tokenCount.toString(),
      },
      {
        "@type": "PropertyValue",
        name: "Share Price",
        value: `$${offering.tokenPriceNzd.toLocaleString()} NZD`,
      },
    ],
  };

  const horseSchema = {
    "@context": "https://schema.org",
    "@type": "Thing",
    additionalType: "https://schema.org/Animal",
    name: horse.name,
    description: `${horse.sex} ${horse.colour} foaled ${horse.foalingDate}. Sire: ${horse.sire}, Dam: ${horse.dam}.`,
    identifier: {
      "@type": "PropertyValue",
      name: "NZTR Life Number",
      value: horse.nztrLifeNumber,
    },
    subjectOf: {
      "@type": "Product",
      name: title || `${horse.name} — Racehorse Syndicate`,
      url,
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://evolutionstables.nz",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Marketplace",
        item: "https://evolutionstables.nz/marketplace",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: horse.name,
        item: url,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(horseSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
    </>
  );
}
