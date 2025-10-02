'use client';

// import { useTranslations } from 'next-intl';

import { ContentHTML } from '@/components/ContentHTML';
import { TitleWithDesc } from '@/components/TitleWithDesc';
import { IProductDetails } from '@/types/product';

import styles from './styles.module.scss';

interface IProductMainSectionProps {
  product: IProductDetails;
}

export const ProductDescriptionSection = ({
  product,
}: IProductMainSectionProps) => {
  // const t = useTranslations();

  const { description } = product || {};

  if (!description) return null;
  return (
    <div className={styles['product-description-section']}>
      <TitleWithDesc
        wrapperClassName={styles['product-description-title']}
        titleProps={{ variant: 'section-heading' }}
        // title={t('description')}
      />
      <ContentHTML content={description} />
    </div>
  );
};
