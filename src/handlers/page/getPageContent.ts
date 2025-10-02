import { notFound } from 'next/navigation';

import parseHTML from 'html-react-parser';

import pagesApi from '@/api/pages';
import { fields } from '@/constants/pages';
import { buildLog } from '@/helpers/build/buildLog';
import { IGetPagesParams, IWordPressPageStandard } from '@/types/pages';
import { TFlexibleContentLayout } from '@/types/sections';

import { mapPageSectionsData } from './sectionsDataHandlers/mapPageSectionsData';

interface IGetPageContentResponse {
  pageTitle: string;
  sections: TFlexibleContentLayout[];
}

export const getPageContent = async (
  slug: string,
  params: IGetPagesParams = {},
): Promise<IGetPageContentResponse> => {
  buildLog({
    type: 'info',
    message: `START - ${slug}`,
    functionName: 'getPageContent',
  });

  try {
    const [page] =
      (await pagesApi.getPageBySlug<IWordPressPageStandard>(slug, {
        _fields: fields,
        status: 'publish',
        ...params,
      })) || [];
    const { title, acf } = page || ({} as IWordPressPageStandard);

    const sections = await mapPageSectionsData(acf?.sections || []);

    buildLog({
      type: 'success',
      message: slug,
      functionName: 'getPageContent',
    });

    const pageTitle = title?.rendered
      ? (parseHTML(title?.rendered || '') as string)
      : '';

    return {
      pageTitle,
      sections,
    };
  } catch (error) {
    buildLog({
      type: 'error',
      message: slug,
      functionName: 'getPageContent',
      additionalLog: error,
    });

    return notFound();
  }
};
