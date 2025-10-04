import pagesApi from '@/api/pages';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { ContentSections } from '@/components/ContentSections';
import { Spacer } from '@/components/Spacer';
import { DYNAMIC_PAGE_BREADCRUMBS } from '@/constants/breadcrumbs/dynamicPages';
import { DEFAULT_LOCALE } from '@/constants/locales';
import { fieldsStaticPaths } from '@/constants/pages';
import { getPageContent } from '@/handlers/page/getPageContent';
import { getPageMetadata } from '@/handlers/page/getPageMetadata';
import { TMetadataType } from '@/types/metadata';
import { IWordPressPageStaticPaths } from '@/types/pages';

export const dynamicParams = false;
export const dynamic = 'force-static';
export const revalidate = 600;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; dynamicSlug: string }>;
}) {
  const { dynamicSlug } = await params;

  const { metadata } = await getPageMetadata(
    dynamicSlug,
    {},
    TMetadataType.DYNAMIC_PAGE,
  );

  const { pageTitle } = await getPageContent(dynamicSlug);

  return {
    title: pageTitle,
    ...metadata,
  };
}

const DynamicPage = async ({
  params,
}: {
  params: Promise<{ locale: string; dynamicSlug: string }>;
}) => {
  const { dynamicSlug } = await params;

  const { pageTitle, sections } = await getPageContent(dynamicSlug);
  return (
    <div className='spacing-top-30'>
      <Breadcrumbs
        items={DYNAMIC_PAGE_BREADCRUMBS(pageTitle as string)}
        size='large'
        hideSpacer
      />
      <Spacer />
      <ContentSections sections={sections} />
    </div>
  );
};

export const generateStaticParams = async () => {
  try {
    const pages = await pagesApi.getPages<IWordPressPageStaticPaths>({
      _fields: fieldsStaticPaths,
      status: 'publish',
    });

    const params = pages
      .filter(({ acf }) => acf?.destination?.includes('dynamicSlug'))
      .flatMap(
        ({ acf }) =>
          acf?.slugs_list?.map(({ pathname, locale }) => ({
            locale,
            dynamicSlug: pathname,
          })) || [],
      )
      .filter(({ locale }) => locale === DEFAULT_LOCALE);

    return params;
  } catch {
    return [];
  }
};

export default DynamicPage;
