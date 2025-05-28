import clsx from 'clsx';
import { Geist, Geist_Mono } from 'next/font/google';

import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { getHeaderNavigation } from '@/handlers/header/getHeaderNavigation';

import type { Metadata } from 'next';

import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'FortGuns',
  description: 'Sklep z bronią palną i wyposażeniem strzeleckim.',
};

const RootLayout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const menu = await getHeaderNavigation();

  return (
    <html lang='en'>
      <body
        className={clsx(
          'min-h-screen bg-background text-white',
          geistSans.variable,
          geistMono.variable,
        )}
      >
        <Header />
        <main className='min-h-screen pt-[150px]'>{children}</main>
        <Footer />
      </body>
    </html>
  );
};

export default RootLayout;
