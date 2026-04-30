import type { MetadataRoute } from "next";

/**
 * Web App Manifest
 *
 * Enables PWA installability on mobile/desktop.
 * Provides app-like experience when added to home screen.
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Evolution Stables",
    short_name: "Evolution",
    description:
      "Digital racehorse ownership platform. Browse, purchase, and manage tokenized racehorse syndicates.",
    start_url: "/",
    display: "standalone",
    background_color: "#0b0b0b",
    theme_color: "#d4a964",
    orientation: "portrait",
    icons: [
      {
        src: "/images/Logo-Gold-Favicon.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/images/Logo-Gold-Favicon.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
    categories: ["finance", "investment", "sports"],
    lang: "en",
    scope: "/",
  };
}
