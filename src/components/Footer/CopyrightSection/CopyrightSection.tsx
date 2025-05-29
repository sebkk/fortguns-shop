'use client';

import { Typography } from '@/components/Typography';
import { useTranslations } from 'next-intl';
import styles from './styles.module.scss';

export const CopyrightSection = () => {
  const t = useTranslations();

  const year = new Date().getFullYear();

  return (
    <Typography fontSize='sm' className={styles['copyright-section']}>
      {t('copyrightText', { year })}
    </Typography>
  );
};
