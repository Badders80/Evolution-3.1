import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  trailingSlash: false,
  async redirects() {
    return [
      {
        source: '/home',
        destination: '/',
        permanent: true,
      },
      {
        source: '/join-us',
        destination: '/marketplace',
        permanent: true,
      },
      {
        source: '/horse/first-gear',
        destination: '/marketplace',
        permanent: true,
      },
      {
        source: '/horse/zeddiani',
        destination: '/marketplace',
        permanent: true,
      },
      {
        source: '/media',
        destination: '/',
        permanent: true,
      },
    ];
  },
  // ⚡ Enable Turbopack options (keep it clean)
  experimental: {
    // serverActions: true, // Uncomment if using Server Actions
  },
  // 🚫 WEBPACK CONFIG REMOVED: Let Turbopack handle the speed.
};

export default nextConfig;
