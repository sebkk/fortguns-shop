import { notFound } from 'next/navigation';

import parseHTML from 'html-react-parser';

import pagesApi from '@/api/pages';
import { fields } from '@/constants/pages';
import { IGetPagesParams, IWordPressPageStandard } from '@/types/pages';
import { TFlexibleContentLayout } from '@/types/sections';

import { mapPageSectionsData } from './mapPageSectionsData';

interface IGetPageContentResponse {
  pageTitle: string;
  sections: TFlexibleContentLayout[];
}

export const getPageContent = async (
  slug: string,
  params: IGetPagesParams = {},
): Promise<IGetPageContentResponse> => {
  // eslint-disable-next-line no-console
  console.log(`🛫 [GET_PAGE_CONTENT] START - ${slug} 🛫`);

  try {
    const [page] =
      (await pagesApi.getPageBySlug<IWordPressPageStandard>(slug, {
        _fields: fields,
        status: 'publish',
        ...params,
      })) || [];
    const { title, acf } = page || ({} as IWordPressPageStandard);

    const sections = await mapPageSectionsData(acf?.sections || []);

    // eslint-disable-next-line no-console
    console.log(`✅ [GET_PAGE_CONTENT] SUCCESS - ${slug} ✅`);

    return {
      pageTitle: parseHTML(title?.rendered || '') as string,
      sections,
    };
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(`❌ [GET_PAGE_CONTENT] ERROR - ${slug} ❌`, error);

    return notFound();
  }
};
