'use client';

import React from 'react';

import { useTranslations } from 'next-intl';

import { SectionPageHeader } from '@/components/_sections/SectionPageHeader';
import { Spacer } from '@/components/Spacer';
import { IBrand, IGroupedBrands } from '@/types/brands';
import { ESectionBackground, ESectionLayout } from '@/types/sections';

import { BrandsList } from '../BrandsList';

interface IBrandsPageContentProps {
  brands: IBrand[];
  groupedBrands: IGroupedBrands[];
  totalProducts: number;
}

export const BrandsPageContent = ({
  groupedBrands,
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
            section_background: ESectionBackground.DEFAULT,
            section_layout: ESectionLayout.CONTAINER,
          },
          title: t.markup('labelBrands'),
          description: t.markup('labelBrandsDescriptionWithCount', {
            count: totalProducts,
            strong: (chunks: React.ReactNode) => `<strong>${chunks}</strong>`,
          }),
        }}
      />
      <Spacer />
      <BrandsList groupedBrands={groupedBrands} />
      <Spacer size='lg' />
    </div>
  );
};
