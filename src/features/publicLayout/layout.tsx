'use client';

import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

type PublicLayoutProps = {
  children: React.ReactNode;
};

const PublicLayout: React.FC<PublicLayoutProps> = ({ children }) => {
  return (
    <section className='flex h-full w-full flex-col bg-elevation-2'>
      <Header />
      <div className='h-full'>{children}</div>
      <Footer />
    </section>
  );
};

export default PublicLayout;
