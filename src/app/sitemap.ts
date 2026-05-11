import { MetadataRoute } from "next";
import { isMarketplaceProductionStage } from "@/lib/marketplace-release-stage";

/**
 * Sitemap Configuration
 *
 * Generates a sitemap for search engines to crawl your site.
 * This helps with SEO by ensuring all important pages are indexed.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://evolutionstables.nz";
  const now = new Date();

  const routes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/press`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/demo`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/updates`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.4,
    },
  ];

  if (isMarketplaceProductionStage()) {
    routes.push({
      url: `${baseUrl}/marketplace`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.8,
    });
    // Dynamic listing detail pages — deferred to Token migration
    // Add after new marketplace launches with stable URLs
  }

  return routes;
}
