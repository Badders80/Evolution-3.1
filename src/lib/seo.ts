import { Metadata } from 'next';

interface SEOProps {
  title?: string;
  description?: string;
  canonical?: string;
  ogImage?: string;
  noIndex?: boolean;
}

export function constructMetadata({
  title = "Evolution Stables - Digital Racehorse Ownership",
  description = "Own racehorses through digital-syndication. Making racehorse ownership accessible, transparent, and liquid.",
  canonical = "/",
  ogImage = "/images/Logo-Gold-Favicon.png",
  noIndex = false,
}: SEOProps = {}): Metadata {
  const fullTitle = title.includes("Evolution Stables")
    ? title
    : `${title} | Evolution Stables`;

  return {
    title: fullTitle,
    description,
    alternates: {
      canonical: `https://evolutionstables.nz${canonical}`,
    },
    openGraph: {
      title: fullTitle,
      description,
      url: `https://evolutionstables.nz${canonical}`,
      siteName: 'Evolution Stables',
      images: [
        {
          url: ogImage,
        },
      ],
      type: 'website',
      locale: 'en_NZ',
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [ogImage],
      creator: '@EvolutionStable',
    },
    icons: {
      icon: '/images/Logo-Gold-Favicon.png',
      shortcut: '/images/Logo-Gold-Favicon.png',
      apple: '/images/Logo-Gold-Favicon.png',
    },
    metadataBase: new URL('https://evolutionstables.nz'),
    ...(noIndex && {
      robots: {
        index: false,
        follow: false,
      },
    }),
  };
}
