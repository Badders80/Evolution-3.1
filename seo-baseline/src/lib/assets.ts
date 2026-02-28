// Asset constants for images and media
export const MARKETING = {
  band1: '/images/Background-hooves-back-and-white.jpg',
  band2: '/images/Horse-Double-Black.png',
  hero: '/images/hero.svg',
  alt: {
    horseAndFoal: '/images/Horse-and-foal.jpg',
    landscapeOverlay: '/images/Landscape-digitaloverlay.jpg',
    hoovesOnGrass: '/images/Hooves-on-grass.png',
  },
};

// Landing prototype assets
export const hero = MARKETING.band2;
export const horseLegs = MARKETING.alt.hoovesOnGrass;

export const LOGOS = {
  // Main logos
  main: '/images/Evolution-Stables-Logo.svg',
  black: '/images/Evolution-Stables-Logo-Black.svg',
  white: '/images/Evolution-Stables-Logo-White.svg',
  
  // Monochrome variants
  mono: {
    black: '/images/EvolutionStables-Mono-Black.svg',
    white: '/images/EvolutionStables-Mono-White.svg',
    gold: '/images/EvolutionStables-Mono-Gold.svg',
  },
  
  // Simple/icon versions
  simple: {
    black: '/images/Logo-Black.png',
    gold: '/images/Logo-Gold.png',
    grey: '/images/Logo-Grey.png',
  },
  
  // Name logos (new)
  name: {
    black: '/images/Evolution-Stables-Name-Logo-Black.svg',
    white: '/images/Evolution-Stables-Name-Logo-White.svg',
    gold: '/images/Evolution-Stables-Name-Logo-Gold.svg',
    grey: '/images/Evolution-Stables-Name-Logo-Grey.svg',
  },
};

export const ILLUSTRATIONS = {
  illus1: '/images/illus-1.svg',
  illus2: '/images/illus-2.svg',
  illus3: '/images/illus-3.svg',
};

export const PLACEHOLDERS = {
  image: MARKETING.alt.horseAndFoal,
  avatar: LOGOS.simple.grey,
  logo: LOGOS.main,
};

// Evolution Stables Brand Colors
export const BRAND_COLORS = {
  gold: '#d4a964',
  gray: '#747474',
  white: '#ffffff',
  black: '#000000',
};
