import { notFound } from 'next/navigation';

import parseHTML from 'html-react-parser';

import pagesApi from '@/api/pages';
import rankMath from '@/api/rankmath';
import { fields } from '@/constants/pages';
import { getMetadataScripts } from '@/helpers/metadata/transformMetadata';
import { IMetadataScripts } from '@/types/metadata';
import { IGetPagesParams, IWordPressPageStandard } from '@/types/pages';
import { TFlexibleContentLayout } from '@/types/sections';

import { parseMetadata } from './getPageMetadata';
import { mapPageSectionsData } from './mapPageSectionsData';

interface IGetPageContentResponse {
  pageTitle: string;
  sections: TFlexibleContentLayout[];
  metadataScripts: IMetadataScripts[];
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
    const { title, acf, link } = page || ({} as IWordPressPageStandard);

    const metadataResponse = await rankMath.getMetadata(link || '');

    let metadataScripts: IMetadataScripts[] = [];

    if (metadataResponse.success) {
      const metadataObjects = await parseMetadata(metadataResponse);

      metadataScripts = getMetadataScripts(metadataObjects);
    }

    const sections = await mapPageSectionsData(acf?.sections || []);

    return {
      pageTitle: parseHTML(title?.rendered || '') as string,
      sections,
      metadataScripts,
    };
  } catch (error) {
    console.error(error);

    return notFound();
  }
};
