import { ImageResponse } from "next/og";
import { getListingBySlug } from "@/lib/db/queries/listings";

export const runtime = "edge";
export const alt = "Evolution Stables — Racehorse Syndicate";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Dynamic OG Image for Marketplace Listings
 *
 * Generates a social share card with horse name, price, and branding.
 * Uses edge runtime for fast generation.
 */
export default async function Image({ params }: { params: { slug: string } }) {
  const listing = getListingBySlug(params.slug);

  const horseName = listing?.horse?.name || "Racehorse Syndicate";
  const price = listing?.offering?.tokenPriceNzd
    ? `$${listing.offering.tokenPriceNzd.toLocaleString()} NZD`
    : "View Pricing";
  const shares = listing?.offering?.tokenCount
    ? `${listing.offering.tokenCount} shares available`
    : "Limited availability";

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #0b0b0b 0%, #1a1a1a 100%)",
        color: "#fff",
        fontFamily: "system-ui, -apple-system, sans-serif",
        padding: "60px",
        position: "relative",
      }}
    >
      {/* Brand accent line */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "8px",
          background: "#d4a964",
        }}
      />

      {/* Logo / Brand */}
      <div
        style={{
          position: "absolute",
          top: "40px",
          left: "60px",
          display: "flex",
          alignItems: "center",
          gap: "12px",
        }}
      >
        <div
          style={{
            width: "32px",
            height: "32px",
            borderRadius: "50%",
            background: "#d4a964",
          }}
        />
        <span
          style={{
            fontSize: "20px",
            fontWeight: 600,
            color: "#d4a964",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
          }}
        >
          Evolution Stables
        </span>
      </div>

      {/* Main content */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          gap: "24px",
          maxWidth: "900px",
        }}
      >
        <span
          style={{
            fontSize: "16px",
            textTransform: "uppercase",
            letterSpacing: "0.28em",
            color: "#d4a964",
            fontWeight: 500,
          }}
        >
          Digital Racehorse Ownership
        </span>

        <h1
          style={{
            fontSize: "72px",
            fontWeight: 700,
            lineHeight: 1.1,
            margin: 0,
            color: "#fff",
          }}
        >
          {horseName}
        </h1>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "12px",
            marginTop: "16px",
          }}
        >
          <span
            style={{
              fontSize: "36px",
              fontWeight: 600,
              color: "#d4a964",
            }}
          >
            {price}
          </span>
          <span
            style={{
              fontSize: "20px",
              color: "rgba(255,255,255,0.6)",
            }}
          >
            {shares}
          </span>
        </div>
      </div>

      {/* Footer */}
      <div
        style={{
          position: "absolute",
          bottom: "40px",
          left: "60px",
          right: "60px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          fontSize: "14px",
          color: "rgba(255,255,255,0.4)",
        }}
      >
        <span>evolutionstables.nz</span>
        <span>Authorised NZ Syndicator</span>
      </div>
    </div>,
    {
      width: 1200,
      height: 630,
    },
  );
}
