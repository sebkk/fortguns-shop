import { Breadcrumbs } from '@/components/Breadcrumbs/Breadcrumbs';
import { ContentSections } from '@/components/ContentSections';
import { BRANDS_BREADCRUMBS } from '@/constants/breadcrumbs/brands';
import { DEFAULT_LOCALE, PATHNAMES } from '@/constants/locales';
import { NAVIGATION_ROUTE } from '@/constants/navigation';
import { PAGES_SLUGS } from '@/constants/pages';
import { BrandsPageContent } from '@/features/brands/BrandsPageContent';
import { fetchBrands } from '@/handlers/brands/fetchBrands';
import { getPageContent } from '@/handlers/page/getPageContent';
import { getPageMetadata } from '@/handlers/page/getPageMetadata';
import { TMetadataType } from '@/types/metadata';

export const revalidate = 3600;
export const dynamic = 'force-static';
export const dynamicParams = false;

export const generateMetadata = async () => {
  const { metadata } = await getPageMetadata(
    PAGES_SLUGS[NAVIGATION_ROUTE.BRANDS],
    {},
    TMetadataType.DEFAULT_PAGE,
  );

  return metadata;
};

const BrandsPage = async () => {
  const { groupedBrands, totalBrands } = await fetchBrands({
    params: { per_page: 50 },
  });

  const { sections, pageTitle } = await getPageContent(
    PATHNAMES[NAVIGATION_ROUTE.BRANDS][DEFAULT_LOCALE].slice(1),
  );

  return (
    <>
      <Breadcrumbs items={BRANDS_BREADCRUMBS} size='large' />
      <BrandsPageContent
        groupedBrands={groupedBrands}
        totalBrands={totalBrands}
        pageTitle={pageTitle}
      />
      {sections && <ContentSections sections={sections} />}
    </>
  );
};

export default BrandsPage;
