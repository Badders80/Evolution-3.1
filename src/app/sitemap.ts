import { MetadataRoute } from 'next';
import { isMarketplaceProductionStage } from '@/lib/marketplace-release-stage';

/**
 * Sitemap Configuration
 * 
 * Generates a sitemap for search engines to crawl your site.
 * This helps with SEO by ensuring all important pages are indexed.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://evolutionstables.nz';
  const routes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/press`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.5,
    },
  ];

  if (isMarketplaceProductionStage()) {
    routes.push({
      url: `${baseUrl}/marketplace`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.8,
    });
  }

  return routes;
}
