/** @type {import('next').NextConfig} */
const nextConfig = {
  // ⚡ Enable Turbopack options (keep it clean)
  experimental: {
    // serverActions: true, // Uncomment if using Server Actions
  },
  // 🚫 WEBPACK CONFIG REMOVED: Let Turbopack handle the speed.
};

module.exports = nextConfig;
