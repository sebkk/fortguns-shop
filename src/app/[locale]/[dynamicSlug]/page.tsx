import Head from 'next/head';

import pagesApi from '@/api/pages';
import { ContentSections } from '@/components/ContentSections';
import { fieldsStaticPaths } from '@/constants/pages';
import { getPageContent } from '@/handlers/page/getPageContent';

export const dynamicParams = false;
export const dynamic = 'force-static';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; dynamicSlug: string }>;
}) {
  const { dynamicSlug } = await params;

  const { pageTitle } = await getPageContent(dynamicSlug);

  return {
    title: pageTitle,
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
      <Head>
        <title>{pageTitle}</title>
      </Head>
      <ContentSections sections={sections} />
    </div>
  );
};

export const generateStaticParams = async () => {
  try {
    const pages = await pagesApi.getPages({
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
      );

    return params;
  } catch {
    return [];
  }
};

export default DynamicPage;
