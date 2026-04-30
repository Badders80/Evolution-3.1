import { MetadataRoute } from "next";
import { getAllListings } from "@/lib/db/queries/listings";

/**
 * Sitemap Configuration
 *
 * Generates a sitemap for search engines to crawl your site.
 * Includes all static routes + dynamic marketplace listings.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://evolutionstables.nz";

  // Static public routes
  const routes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/press`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/marketplace`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.3,
    },
  ];

  // Dynamic marketplace listings (only live + ready_to_publish)
  const listings = getAllListings();
  const publicListings = listings.filter(
    (l) => l.publishStatus === "live" || l.publishStatus === "ready_to_publish",
  );

  for (const listing of publicListings) {
    routes.push({
      url: `${baseUrl}/marketplace/${listing.slug}`,
      lastModified: new Date(listing.updatedAt || Date.now()),
      changeFrequency: "daily",
      priority: 0.8,
    });
  }

  return routes;
}
