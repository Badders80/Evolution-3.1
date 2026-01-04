import "@/lib/env";
import type { Metadata } from "next";
import '@once-ui-system/core/css/tokens.css';
import '@once-ui-system/core/css/styles.css';
import "../styles/globals.css";
import "../styles/brand.css";
import { NavBar } from "@/components/NavBar";
import SupabaseProvider from "@/providers/supabase-provider";
import { OnceUIProvider } from "@/providers/once-ui-provider";
import { StructuredData } from "@/components/seo/StructuredData";
import { getPressArticlesForStructuredData } from "@/lib/press-articles";

export const metadata: Metadata = {
  metadataBase: new URL("https://evolutionstables.nz"),
  title: "Evolution Stables - Digital Racehorse Ownership | Tokenized RWA Platform",
  description: "Own racehorses through digital-syndication. Evolution Stables makes racehorse ownership accessible, transparent, and liquid. Regulated real-world asset (RWA) investing powered by Tokinvest and blockchain technology.",
  keywords: [
    'racehorse ownership',
    'digital syndication',
    'tokenized assets',
    'real world assets',
    'RWA',
    'blockchain racing',
    'fractional ownership',
    'New Zealand racing',
    'NZTR',
    'Tokinvest',
    'Singularry',
    'regulated investment',
    'horse racing investment',
  ],
  authors: [{ name: 'Evolution Stables' }],
  creator: 'Evolution Stables',
  publisher: 'Evolution Stables',
  openGraph: {
    type: 'website',
    locale: 'en_NZ',
    url: 'https://evolutionstables.nz',
    siteName: 'Evolution Stables',
    title: 'Evolution Stables - Digital Racehorse Ownership',
    description: 'Own racehorses through digital-syndication. Making racehorse ownership accessible, transparent, and liquid.',
    images: [
      {
        url: '/images/Logo-Gold-Favicon.png',
        width: 1200,
        height: 630,
        alt: 'Evolution Stables Logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@evostables',
    creator: '@evostables',
    title: 'Evolution Stables - Digital Racehorse Ownership',
    description: 'Own racehorses through digital-syndication. Making racehorse ownership accessible, transparent, and liquid.',
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
  maximumScale: 1,
  userScalable: false,
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
        <OnceUIProvider>
          <SupabaseProvider>
            <NavBar />
            <div className="min-h-screen flex flex-col">
              <main className="flex-1">{children}</main>
            </div>
          </SupabaseProvider>
        </OnceUIProvider>
      </body>
    </html>
  );
}
