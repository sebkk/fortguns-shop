'use client';

import { useCallback } from 'react';

export const useGoogleAnalytics = () => {
  const trackEvent = useCallback(
    (action: string, category: string, label?: string, value?: number) => {
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', action, {
          event_category: category,
          event_label: label,
          value: value,
        });
      }
    },
    [],
  );

  const trackPageView = useCallback((url: string, title?: string) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('config', process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || '', {
        page_title: title || document.title,
        page_location: url,
      });
    }
  }, []);

  const updateConsent = useCallback(
    (analyticsStorage: 'granted' | 'denied') => {
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('consent', 'update', {
          analytics_storage: analyticsStorage,
        });
      }
    },
    [],
  );

  return {
    trackEvent,
    trackPageView,
    updateConsent,
  };
};
