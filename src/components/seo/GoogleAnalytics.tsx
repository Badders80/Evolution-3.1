"use client";

import Script from "next/script";

/**
 * Google Analytics / GTM Integration
 *
 * Privacy-aware tracking:
 * - Respects Do Not Track (DNT) header
 * - Loads after hydration (strategy="afterInteractive")
 * - Only initializes if GA_MEASUREMENT_ID is set
 * - Could be extended with cookie consent gate
 *
 * Set NEXT_PUBLIC_GA_ID in .env.local to enable.
 */
const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

export function GoogleAnalytics() {
  if (!GA_ID) return null;

  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
      />
      <Script
        id="gtag-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            // Respect Do Not Track
            const dnt = navigator.doNotTrack || window.doNotTrack || navigator.msDoNotTrack;
            if (dnt !== '1' && dnt !== 'yes') {
              gtag('config', '${GA_ID}', {
                page_path: window.location.pathname,
                send_page_view: true,
                anonymize_ip: true,
                allow_google_signals: false,
                allow_ad_personalization_signals: false,
              });
            } else {
              // Disable tracking if DNT is enabled
              gtag('config', '${GA_ID}', { send_page_view: false });
            }
          `,
        }}
      />
    </>
  );
}
