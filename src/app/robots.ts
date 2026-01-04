import { MetadataRoute } from 'next';

/**
 * Robots.txt Configuration
 * 
 * Controls how search engines crawl your site.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/auth/'],
    },
    sitemap: 'https://evolutionstables.nz/sitemap.xml',
  };
}
