import { unstable_cache } from 'next/cache';
import { notFound } from 'next/navigation';

import parseHTML from 'html-react-parser';

import pagesApi from '@/api/pages';
import { CMS_DATA_REVALIDATE } from '@/constants/cache';
import { DEFAULT_LOCALE, PATHNAMES } from '@/constants/locales';
import { NAVIGATION_ROUTE } from '@/constants/navigation';
import { fields } from '@/constants/pages';
import { buildLog } from '@/helpers/build/buildLog';
import { createStableCacheKey } from '@/helpers/cache';
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

    const isProductsOrBrandsPage =
      PATHNAMES[NAVIGATION_ROUTE.PRODUCTS_LISTING][DEFAULT_LOCALE].includes(
        slug,
      ) || PATHNAMES[NAVIGATION_ROUTE.BRANDS][DEFAULT_LOCALE].includes(slug);

    if (!page && !isProductsOrBrandsPage) {
      return notFound();
    }

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

const cachedGetPageContentRequest = unstable_cache(
  async (slug: string, paramsCacheKey: string) =>
    getPageContent(slug, JSON.parse(paramsCacheKey) as IGetPagesParams),
  ['page-content'],
  {
    revalidate: CMS_DATA_REVALIDATE,
    tags: ['pages'],
  },
);

export const cachedGetPageContent = async (
  slug: string,
  params: IGetPagesParams = {},
): Promise<IGetPageContentResponse> => {
  return await cachedGetPageContentRequest(slug, createStableCacheKey(params));
};
