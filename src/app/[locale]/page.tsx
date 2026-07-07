import { ContentSections } from '@/components/ContentSections';
import { LOCALES } from '@/constants/locales';
import { NAVIGATION_ROUTE } from '@/constants/navigation';
import { PAGES_SLUGS } from '@/constants/pages';
import { cachedGetPageContent } from '@/handlers/page/getPageContent';
import { cachedGetPageMetadata } from '@/handlers/page/getPageMetadata';
import { TMetadataType } from '@/types/metadata';

import styles from './styles.module.scss';

export const dynamic = 'force-static';
export const dynamicParams = false;
export const revalidate = 43200;

export const generateMetadata = async () => {
  const { metadata } = await cachedGetPageMetadata(
    PAGES_SLUGS[NAVIGATION_ROUTE.HOMEPAGE],
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
  const { sections } = await cachedGetPageContent(
    PAGES_SLUGS[NAVIGATION_ROUTE.HOMEPAGE],
  );

  return (
    <div className={styles['homepage-container']}>
      <ContentSections sections={sections} />
    </div>
  );
};

export default Home;
