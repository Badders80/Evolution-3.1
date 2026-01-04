/**
 * Hover Effect Variants
 * Reusable hover effect configurations for cards and panels
 * 
 * USAGE:
 * In your page.tsx, pass the hoverEffect prop to StickyScrollSection:
 * 
 * <StickyScrollSection
 *   hoverEffect="blueGradientShimmer"  // or "goldGradientShimmer", "pureWhiteShimmer", "minimalLift"
 *   {...other props}
 * />
 * 
 * SAVED VARIANTS:
 * - blueGradientShimmer: Current (white-to-blue gradient) ✓
 * - goldGradientShimmer: White-to-gold (brand color)
 * - pureWhiteShimmer: Pure white gradient
 * - minimalLift: No gradient, just badge animation
 */

export const cardHoverEffects = {
  /**
   * Blue Gradient Shimmer (Current - OUR MISSION section)
   * Premium white-to-blue gradient with subtle glow
   */
  blueGradientShimmer: {
    gradient: 'linear-gradient(140deg, rgba(255,255,255,0.06), rgba(67,129,255,0.08) 40%, transparent 70%)',
    badgeClasses: 'text-white/50 group-hover:scale-105 group-hover:text-white',
    transitionClasses: 'duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]',
    description: 'White-to-blue gradient overlay with number badge scale and brightness',
  },

  /**
   * Gold Gradient Shimmer
   * Premium white-to-gold gradient matching brand primary color
   */
  goldGradientShimmer: {
    gradient: 'linear-gradient(140deg, rgba(255,255,255,0.06), rgba(212,169,100,0.08) 40%, transparent 70%)',
    badgeClasses: 'text-white/50 group-hover:scale-105 group-hover:text-primary',
    transitionClasses: 'duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]',
    description: 'White-to-gold gradient overlay (brand color #d4a964)',
  },

  /**
   * Pure White Shimmer
   * Minimal white-only gradient for subtle elegance
   */
  pureWhiteShimmer: {
    gradient: 'linear-gradient(140deg, rgba(255,255,255,0.06), rgba(255,255,255,0.10) 40%, transparent 70%)',
    badgeClasses: 'text-white/50 group-hover:scale-105 group-hover:text-white',
    transitionClasses: 'duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]',
    description: 'Pure white gradient with no color accent',
  },

  /**
   * Minimal Lift
   * Subtle lift effect with no gradient overlay
   */
  minimalLift: {
    gradient: 'none',
    badgeClasses: 'text-white/50 group-hover:scale-110 group-hover:text-primary',
    transitionClasses: 'duration-500 ease-out',
    description: 'No gradient, just badge scale and color change',
  },
} as const;

export type CardHoverEffect = keyof typeof cardHoverEffects;
