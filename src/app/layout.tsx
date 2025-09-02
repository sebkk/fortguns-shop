import { ReactNode } from 'react';

import type { Metadata } from 'next';

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
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
    userScalable: false,
  },
};

interface IRootLayoutProps {
  children: ReactNode;
}

const RootLayout = ({ children }: IRootLayoutProps) => {
  return (
    <html>
      {/* <Head>
        <link
          rel='icon'
          type='image/png'
          sizes='32x32'
          href='/pictures/icon.png'
        />
        <link
          rel='icon'
          type='image/png'
          sizes='16x16'
          href='/pictures/icon.png'
        />

        <link
          rel='apple-touch-icon'
          sizes='180x180'
          href='/pictures/icon.png'
        />
        <link
          rel='apple-touch-icon'
          sizes='152x152'
          href='/pictures/icon.png'
        />
        <link
          rel='apple-touch-icon'
          sizes='120x120'
          href='/pictures/icon.png'
        />
      </Head> */}
      <body>{children}</body>
    </html>
  );
};

export default RootLayout;
