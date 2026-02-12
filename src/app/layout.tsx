import type { Metadata } from "next";
import "../styles/globals.css";
import "../styles/brand.css";
import { NavBar } from "@/components/NavBar";
import { AppProviders } from "@/providers/app-providers";
import { StructuredData } from "@/components/seo/StructuredData";
import { getPressArticlesForStructuredData } from "@/lib/press-articles";

export const metadata: Metadata = {
  metadataBase: new URL("https://evolutionstables.nz"),
  title: "Evolution Stables - Regulated Marketplace for Digital Equine Assets",
  description:
    "Evolution Stables is the premier platform for regulated racehorse ownership through digital-syndication and tokenised assets.",
  keywords: [
    'Regulated Equine Marketplace',
    'Digital Equine Assets',
    'Institutionalised Horse Racing',
    'Digital Syndication',
    'Tokenised Racehorse Ownership',
    'RWA Racing Platform',
    'High Performance Thoroughbreds',
    'Evolution Stables',
    'New Zealand Racing Governance',
  ],
  authors: [{ name: 'Evolution Stables' }],
  creator: 'Evolution Stables',
  publisher: 'Evolution Stables',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_NZ',
    url: 'https://evolutionstables.nz',
    siteName: 'Evolution Stables',
    title: 'Evolution Stables - Regulated Marketplace for Digital Equine Assets',
    description:
      'Evolution Stables is the premier platform for regulated racehorse ownership through digital-syndication and tokenised assets.',
    images: [
      {
        url: '/images/Logo-Gold.png',
        width: 1200,
        height: 630,
        alt: 'Evolution Stables',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@EvolutionStables',
    creator: '@EvolutionStables',
    title: 'Evolution Stables - Regulated Marketplace for Digital Equine Assets',
    description:
      'Evolution Stables is the premier platform for regulated racehorse ownership through digital-syndication and tokenised assets.',
    images: ['/images/Logo-Gold.png'],
  },
  icons: {
    icon: '/images/Logo-Gold-Favicon.png',
    shortcut: '/images/Logo-Gold-Favicon.png',
    apple: '/images/Logo-Gold-Favicon.png',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <head>
        <link
          rel="preload"
          href="/fonts/GeistSans-VFItalic.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <StructuredData pressArticles={getPressArticlesForStructuredData()} />
      </head>
      <body className="min-h-screen bg-black antialiased" suppressHydrationWarning>
        <AppProviders>
          <NavBar />
          <div className="min-h-screen flex flex-col">
            <main className="flex-1">{children}</main>
          </div>
        </AppProviders>
      </body>
    </html>
  );
}
