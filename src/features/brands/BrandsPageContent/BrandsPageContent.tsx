'use client';

import React from 'react';

import { useTranslations } from 'next-intl';

import { SectionPageHeader } from '@/components/_sections/SectionPageHeader';
import { Spacer } from '@/components/Spacer';
import { IBrand } from '@/types/brands';

import { BrandsList } from '../BrandsList';

interface IBrandsPageContentProps {
  brands: IBrand[];
  totalProducts: number;
}

export const BrandsPageContent = ({
  brands,
  totalProducts,
}: IBrandsPageContentProps) => {
  const t = useTranslations();

  return (
    <div>
      <Spacer />
      <SectionPageHeader
        section={{
          acf_fc_layout: 'section_page_header',
          section_options: {
            section_background: 'default',
            section_layout: 'container',
          },
          title: t.markup('labelBrands'),
          description: t.markup('labelBrandsDescriptionWithCount', {
            count: totalProducts,
            strong: (chunks: React.ReactNode) => `<strong>${chunks}</strong>`,
          }),
        }}
      />
      <Spacer />
      <BrandsList brands={brands} />
      <Spacer size='lg' />
    </div>
  );
};
