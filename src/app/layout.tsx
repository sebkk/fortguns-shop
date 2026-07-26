import { ReactNode } from 'react';

import { Analytics } from '@vercel/analytics/react';
// import { SpeedInsights } from '@vercel/speed-insights/next';

import { GoogleAnalytics } from '@/components/GoogleAnalytics';

import type { Metadata, Viewport } from 'next';

import '@/assets/styles/globals.scss';

export const metadata: Metadata = {
  // Rank Math cannot supply canonicals: the CMS is set to "discourage search
  // engines" (correct for a headless install), which makes it drop every
  // <link> tag. They are built from this base and each page's own route.
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? 'https://fortguns.pl',
  ),
  title: 'FortGuns',
  description: 'Sklep z bronią palną i wyposażeniem strzeleckim.',
  manifest: '/manifest.webmanifest',
  icons: {
    icon: '/pictures/icon.png',
    shortcut: '/pictures/icon.png',
    apple: '/pictures/icon.png',
    other: {
      rel: 'apple-touch-icon',
      url: '/pictures/icon.png',
    },
  },
  appleWebApp: {
    title: 'FortGuns',
    statusBarStyle: 'black-translucent',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 6,
  userScalable: true,
};

interface IRootLayoutProps {
  children: ReactNode;
}

const RootLayout = ({ children }: IRootLayoutProps) => {
  const measurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

  return (
    <html>
      <body>
        {measurementId && <GoogleAnalytics measurementId={measurementId} />}
        {children}
        <Analytics />
        {/* <SpeedInsights /> */}
      </body>
    </html>
  );
};

export default RootLayout;
