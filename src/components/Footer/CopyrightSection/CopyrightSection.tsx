'use client';

import { useTranslations } from 'next-intl';

import { Typography } from '@/components/Typography';

import styles from './styles.module.scss';

export const CopyrightSection = () => {
  const t = useTranslations();

  const year = new Date().getFullYear();

  const yearText = t('copyrightText', { year });

  return (
    <Typography fontSize='sm' className={styles['copyright-section']}>
      {yearText}
    </Typography>
  );
};
