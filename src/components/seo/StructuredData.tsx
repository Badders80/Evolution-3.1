'use client';

import React from 'react';

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
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Evolution Stables',
    alternateName: 'Evolution Stables NZ',
    url: 'https://evolutionstables.nz',
    logo: 'https://evolutionstables.nz/images/Logo-Gold-Favicon.png',
    description: 'Digital-syndication platform for racehorse ownership. Making racehorse ownership accessible, transparent, and liquid through modern technology and blockchain innovation.',
    foundingDate: '2024',
    sameAs: [
      'https://x.com/evostables',
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
    name: 'Evolution Stables',
    url: 'https://evolutionstables.nz',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://evolutionstables.nz/marketplace?search={search_term_string}',
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
