import { ReactNode } from 'react';

import type { Metadata, Viewport } from 'next';

import '@/assets/styles/globals.scss';

export const metadata: Metadata = {
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
  maximumScale: 5,
  userScalable: false,
};

interface IRootLayoutProps {
  children: ReactNode;
}

const RootLayout = ({ children }: IRootLayoutProps) => {
  return (
    <html>
      <body>{children}</body>
    </html>
  );
};

export default RootLayout;
