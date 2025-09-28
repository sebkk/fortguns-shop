import { ContentSections } from '@/components/ContentSections';
import { LOCALES } from '@/constants/locales';
import { homepageSlug } from '@/constants/pages';
import { getPageContent } from '@/handlers/page/getPageContent';
import { getPageMetadata } from '@/handlers/page/getPageMetadata';
import { TMetadataType } from '@/types/metadata';

import styles from './styles.module.scss';

export const dynamic = 'force-static';

export const generateMetadata = async () => {
  const { metadata } = await getPageMetadata(
    homepageSlug,
    {},
    TMetadataType.DEFAULT_PAGE,
  );

  return metadata;
};

export async function generateStaticParams() {
  return LOCALES.map((locale) => ({
    locale,
  }));
}

const Home = async () => {
  const { sections } = await getPageContent(homepageSlug);

  return (
    <>
      <div className={styles['homepage-container']}>
        <ContentSections sections={sections} />
      </div>
    </>
  );
};

export default Home;
