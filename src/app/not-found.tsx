import { useTranslations } from 'next-intl';

import { ArrowIcon } from '@/components/_icons/ArrowIcon';
import { LinkBtnNav } from '@/components/LinkBtnNav';

import styles from './styles.module.scss';

const NotFound = () => {
  const t = useTranslations();

  return (
    <div className={styles['not-found']}>
      <h2>404</h2>
      <p>{t('notFound')}</p>
      <LinkBtnNav href='/'>
        {t('goBackToHome')} <ArrowIcon />
      </LinkBtnNav>
    </div>
  );
};

export default NotFound;
