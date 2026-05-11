import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Evolution Stables",
    short_name: "Evolution",
    description: "Digital-syndication platform for racehorse ownership.",
    start_url: "/",
    display: "standalone",
    background_color: "#000000",
    theme_color: "#d4af37",
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
  };
}
