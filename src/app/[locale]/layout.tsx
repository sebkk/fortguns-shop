import { routing } from '@/i18n/routing';

import '@/assets/styles/globals.scss';

export const generateStaticParams = () => {
  return routing.locales.map((locale) => ({ locale }));
};

interface IRootLayoutProps {
  children: React.ReactNode;
}

const RootLayout = async ({ children }: IRootLayoutProps) => {
  return <div>{children}</div>;
};

export default RootLayout;
