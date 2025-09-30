import { getTranslations } from 'next-intl/server';

import { ArrowIcon } from '@/components/_icons/ArrowIcon';
import { LinkBtnNavServer } from '@/components/LinkBtnNav/LinkBtnNavServer';

import styles from './styles.module.scss';

const NotFound = async () => {
  const t = await getTranslations();

  const notFoundText = t('notFound');
  const linkText = t('goBackToHome');

  return (
    <div className={styles['not-found']}>
      <h2>404</h2>
      <p>{notFoundText}</p>
      <LinkBtnNavServer
        href='/'
        className={styles['not-found-link']}
        linkProps={{
          nativeLink: true,
          anchorProps: { rel: '', target: '_self' },
        }}
      >
        {linkText}
        <ArrowIcon />
      </LinkBtnNavServer>
    </div>
  );
};

export default NotFound;
