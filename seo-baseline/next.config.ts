import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // ⚡ Enable Turbopack options (keep it clean)
  experimental: {
    // serverActions: true, // Uncomment if using Server Actions
  },
  // 🚫 WEBPACK CONFIG REMOVED: Let Turbopack handle the speed.
};

export default nextConfig;
