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
  try {
    const [page] =
      (await pagesApi.getPageBySlug<IWordPressPageStandard>(slug, {
        _fields: fields,
        status: 'publish',
        ...params,
      })) || [];
    const { title, acf } = page || ({} as IWordPressPageStandard);

    const sections = await mapPageSectionsData(acf?.sections || []);

    return {
      pageTitle: parseHTML(title?.rendered || '') as string,
      sections,
    };
  } catch (error) {
    console.error(error);

    return notFound();
  }
};
