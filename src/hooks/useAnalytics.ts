'use client';

/**
 * useAnalytics Hook
 *
 * Provides a unified interface for tracking user events via Google Tag Manager.
 */

declare global {
  interface Window {
    gtag?: (command: string, eventName: string, eventParams?: Record<string, any>) => void;
    dataLayer?: any[];
  }
}

export const useAnalytics = () => {
  const trackEvent = (eventName: string, eventParams?: Record<string, any>) => {
    if (typeof window !== 'undefined') {
      // Priority 1: Use window.gtag if available (it internally handles dataLayer)
      if (window.gtag) {
        window.gtag('event', eventName, eventParams);
      }
      // Priority 2: Push directly to dataLayer if gtag is not available
      else if (window.dataLayer) {
        window.dataLayer.push({
          event: eventName,
          ...eventParams,
        });
      }
    }
  };

  return {
    trackWaitlistOpen: () => trackEvent('waitlist_opened'),
    trackWaitlistSubmit: (email: string) => trackEvent('waitlist_submitted', { user_email: email }),
    trackCTAClick: (ctaName: string, destination: string) =>
      trackEvent('cta_clicked', { cta_name: ctaName, destination }),
    trackModuleView: (moduleName: string) =>
      trackEvent('module_viewed', { module_name: moduleName }),
  };
};
