import { ReactNode } from 'react';

import { NextIntlClientProvider } from 'next-intl';

import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { LocaleProvider } from '@/components/LocaleProvider';
import { RouteChangeProgress } from '@/components/RouteChangeProgress';
import { routing } from '@/i18n/routing';
import { Providers } from '@/providers';

export const generateStaticParams = () => {
  return routing.locales.map((locale) => ({ locale }));
};

interface ILocaleLayoutProps {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}

const LocaleLayout = async ({ children, params }: ILocaleLayoutProps) => {
  const { locale } = await params;

  return (
    <NextIntlClientProvider locale={locale}>
      <LocaleProvider>
        <Providers>
          <RouteChangeProgress />
          {await Header()}
          <main className='layout-main'>
            <div className='layout-content'>{children}</div>
          </main>
          <Footer />
        </Providers>
      </LocaleProvider>
    </NextIntlClientProvider>
  );
};

export default LocaleLayout;
