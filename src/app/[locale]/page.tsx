import Head from 'next/head';

import { ContentSections } from '@/components/ContentSections';
import { homepageSlug } from '@/constants/pages';
import { getPageContent } from '@/handlers/page/getPageContent';

import styles from './styles.module.scss';

const Home = async () => {
  const { pageTitle, sections } = await getPageContent(homepageSlug);

  return (
    <div className={styles['homepage-container']}>
      <Head>
        <title>{pageTitle}</title>
      </Head>
      <ContentSections sections={sections} />
    </div>
  );
};

export default Home;
