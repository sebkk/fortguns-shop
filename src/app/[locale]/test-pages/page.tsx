import pagesApi from '@/api/pages';
import { ContentSections } from '@/components/ContentSections';
import { DEFAULT_LOCALE, PATHNAMES } from '@/constants/locales';
import { NAVIGATION_ROUTE } from '@/constants/navigation';
import { fieldsTestPages } from '@/constants/pages';
import { getPageContent } from '@/handlers/page/getPageContent';
import { IWordPressPageStandard } from '@/types/pages';

export const dynamic = 'force-static';
export const dynamicParams = false;
export const revalidate = 3600;

export async function generateMetadata() {
  const data = await pagesApi.getPageBySlug<IWordPressPageStandard>(
    PATHNAMES[NAVIGATION_ROUTE.TEST_PAGES][DEFAULT_LOCALE].slice(1),
    {
      _fields: fieldsTestPages,
      status: 'publish',
    },
  );

  const page = data?.[0];

  return {
    title: page?.title?.rendered,
    robots: 'noindex, nofollow',
  };
}

const TestPages = async () => {
  const { sections } = await getPageContent(
    PATHNAMES[NAVIGATION_ROUTE.TEST_PAGES][DEFAULT_LOCALE].slice(1),
  );

  return (
    <div>
      <ContentSections sections={sections} />
    </div>
  );
};

export default TestPages;
