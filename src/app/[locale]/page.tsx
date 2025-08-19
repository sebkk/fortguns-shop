import Head from 'next/head';

import { ContentSections } from '@/components/ContentSections';
import { LOCALES } from '@/constants/locales';
import { homepageSlug } from '@/constants/pages';
import { getPageContent } from '@/handlers/page/getPageContent';

import styles from './styles.module.scss';

export const dynamic = 'force-static';

export async function generateStaticParams() {
  return LOCALES.map((locale) => ({
    locale,
  }));
}

export async function generateMetadata({
  params: _params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { pageTitle } = await getPageContent(homepageSlug);

  return {
    title: pageTitle,
  };
}

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
