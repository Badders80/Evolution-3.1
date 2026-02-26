import { MetadataRoute } from 'next';

/**
 * Robots.txt Configuration
 * 
 * Controls how search engines crawl your site.
 */
export default function robots(): MetadataRoute.Robots {
  const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || 'https://evolutionstables.nz').replace(/\/$/, '');
  const isProductionEnv = process.env.VERCEL_ENV
    ? process.env.VERCEL_ENV === 'production'
    : process.env.NODE_ENV === 'production';

  return {
    rules: isProductionEnv
      ? {
          userAgent: '*',
          allow: '/',
          disallow: ['/api/', '/auth/'],
        }
      : {
          userAgent: '*',
          disallow: '/',
        },
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
