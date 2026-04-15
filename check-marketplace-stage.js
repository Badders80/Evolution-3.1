// Simple script to check marketplace release stage
const { getMarketplaceReleaseStage, isMarketplacePreviewEnabled } = require('./src/lib/marketplace-release-stage');

console.log('Current Marketplace Release Stage:', getMarketplaceReleaseStage());
console.log('Is Preview Enabled:', isMarketplacePreviewEnabled());