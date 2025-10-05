/* eslint-disable @typescript-eslint/no-explicit-any */
// Google Analytics gtag types
declare global {
  interface Window {
    gtag: (
      command: 'config' | 'event' | 'consent',
      targetId: string,
      config?: Record<string, any>,
    ) => void;
    dataLayer: any[];
  }
}

export interface GtagEvent {
  action: string;
  category: string;
  label?: string;
  value?: number;
}

export interface GtagConsent {
  analytics_storage: 'granted' | 'denied';
  ad_storage?: 'granted' | 'denied';
  functionality_storage?: 'granted' | 'denied';
  personalization_storage?: 'granted' | 'denied';
  security_storage?: 'granted' | 'denied';
}

export interface GtagConfig {
  page_title?: string;
  page_location?: string;
  send_page_view?: boolean;
}

export {};
