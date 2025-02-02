import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import clsx from 'clsx';

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
        className={clsx('h-screen', geistSans.variable, geistMono.variable)}
      >
        {children}
      </body>
    </html>
  );
};

export default RootLayout;
