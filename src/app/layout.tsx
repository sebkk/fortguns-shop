import { ReactNode } from 'react';

import { NextIntlClientProvider } from 'next-intl';

import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { RouteChangeProgress } from '@/components/RouteChangeProgress';
import { DEFAULT_LOCALE } from '@/constants/locales';
import { Providers } from '@/providers';

import type { Metadata } from 'next';

import '@/assets/styles/globals.scss';

export const metadata: Metadata = {
  title: 'FortGuns',
  description: 'Sklep z bronią palną i wyposażeniem strzeleckim.',
};

interface IRootLayoutProps {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}

const RootLayout = async ({ children, params }: IRootLayoutProps) => {
  const { locale } = (await params) || {};

  return (
    <html lang={locale || DEFAULT_LOCALE}>
      <body>
        <NextIntlClientProvider locale={locale}>
          <Providers>
            <RouteChangeProgress />
            {await Header()}
            <main className='layout-main'>
              <div className='layout-content'>{children}</div>
            </main>
            <Footer />
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
};

export default RootLayout;
