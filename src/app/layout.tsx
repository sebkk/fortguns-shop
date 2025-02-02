import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import clsx from 'clsx';

import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

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

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang='en'>
      <body
        className={clsx(
          'min-h-screen bg-elevation-2 text-white',
          geistSans.variable,
          geistMono.variable,
        )}
      >
        <Header />
        <div className='h-full'>{children}</div>
        <Footer />
      </body>
    </html>
  );
};

export default RootLayout;
