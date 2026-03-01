interface PressArticle {
  headline: string;
  url: string;
  publisher: string;
  datePublished: string;
}

interface StructuredDataProps {
  pressArticles?: PressArticle[];
}

/**
 * StructuredData Component
 * 
 * Generates JSON-LD structured data for SEO purposes.
 * Includes Organization schema with press mentions to help search engines
 * associate external articles with your brand.
 */
export function StructuredData({ pressArticles = [] }: StructuredDataProps) {
  const canonicalBaseUrl = 'https://www.evolutionstables.nz';

  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${canonicalBaseUrl}/#organization`,
    name: 'Evolution Stables',
    alternateName: 'Evolution Stables NZ',
    url: canonicalBaseUrl,
    logo: `${canonicalBaseUrl}/images/Logo-Gold-Favicon.png`,
    description:
      'Evolution Stables is the premier platform for regulated racehorse ownership through digital-syndication and tokenised assets.',
    foundingDate: '2024',
    sameAs: [
      'https://x.com/EvolutionStables',
      'https://instagram.com/evostables',
      'https://www.linkedin.com/in/alex-baddeley/',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      email: 'alex@evolutionstables.nz',
      contactType: 'Customer Service',
    },
    areaServed: {
      '@type': 'Place',
      name: 'New Zealand',
    },
    keywords: [
      'racehorse ownership',
      'digital syndication',
      'tokenized assets',
      'real world assets',
      'RWA',
      'blockchain',
      'horse racing',
      'fractional ownership',
      'New Zealand racing',
      'NZTR',
      'regulated investment',
      'Tokinvest',
      'Singularry',
    ],
    // Add press mentions if provided
    ...(pressArticles.length > 0 && {
      subjectOf: pressArticles.map(article => ({
        '@type': 'NewsArticle',
        headline: article.headline,
        url: article.url,
        publisher: {
          '@type': 'Organization',
          name: article.publisher,
        },
        datePublished: article.datePublished,
      })),
    }),
  };

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${canonicalBaseUrl}/#website`,
    name: 'Evolution Stables',
    url: canonicalBaseUrl,
    inLanguage: 'en-NZ',
    publisher: {
      '@id': `${canonicalBaseUrl}/#organization`,
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: `${canonicalBaseUrl}/marketplace?search={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteSchema),
        }}
      />
    </>
  );
}
