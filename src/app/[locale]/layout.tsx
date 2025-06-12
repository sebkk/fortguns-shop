import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';

import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { routing } from '@/i18n/routing';

import '@/assets/styles/globals.scss';

import { Providers } from '@/providers';

export const generateStaticParams = () => {
  return routing.locales.map((locale) => ({ locale }));
};

export const metadata: Metadata = {
  title: 'FortGuns',
  description: 'Sklep z bronią palną i wyposażeniem strzeleckim.',
};

interface IRootLayoutProps {
  children: React.ReactNode;
  params: { locale: string };
}

const RootLayout = async ({ children, params }: IRootLayoutProps) => {
  const { locale } = (await params) || {};

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider locale={locale}>
          <Providers>
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
