import { MetadataRoute } from 'next';

/**
 * Sitemap Configuration
 * 
 * Generates a sitemap for search engines to crawl your site.
 * This helps with SEO by ensuring all important pages are indexed.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://evolutionstables.nz';
  
  return [
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
}
