// @ts-expect-error Importing HTMLToJSON from html-to-json-parser
import { HTMLToJSON } from 'html-to-json-parser';

import pagesApi from '@/api/pages';
import rankMath from '@/api/rankmath';
import { fieldsMetadata } from '@/constants/pages';
import {
  filterMetadata,
  mapMetadata,
  transformToMetadata,
} from '@/helpers/metadata/transformMetadata';
import {
  THeadContentItem,
  TMetadataTransformResult,
  TMetadataType,
} from '@/types/metadata';
import { IGetPagesParams, IWordPressPageSeoStandard } from '@/types/pages';

export const parseMetadata = async (metadataResponse: { head: string }) => {
  const parsedMetadata = await HTMLToJSON(
    `<head>${metadataResponse.head}</head>`,
  );

  const metadataContent = parsedMetadata.content as THeadContentItem[];

  const metadataObjects = metadataContent
    .filter(filterMetadata)
    .map(mapMetadata);

  return metadataObjects;
};

export const getPageMetadata = async (
  slug: string = '',
  params: IGetPagesParams = {},
  type: TMetadataType = TMetadataType.DEFAULT_PAGE,
): Promise<{ metadata: TMetadataTransformResult }> => {
  try {
    const [page] =
      (await pagesApi.getPageBySlug<IWordPressPageSeoStandard>(slug, {
        _fields: fieldsMetadata.join(),
        status: 'publish',
        ...params,
      })) || [];

    const { link, rank_math_seo } = page || ({} as IWordPressPageSeoStandard);

    let metadata: TMetadataTransformResult = {} as TMetadataTransformResult;

    const rank_math_focus_keyword =
      rank_math_seo?.rank_math_focus_keyword?.[0] || '';

    const metadataResponse = await rankMath.getMetadata(link || '');

    if (metadataResponse.success) {
      const metadataObjects = await parseMetadata(metadataResponse);

      const transformedMetadataWithoutScript =
        (await transformToMetadata(metadataObjects, {
          slug,
          type,
        })) || {};

      metadata = {
        ...transformedMetadataWithoutScript,
        keywords: rank_math_focus_keyword?.split(',') || [],
      };
    }

    return {
      metadata,
    };
  } catch (error) {
    console.error(error);

    return {
      metadata: {} as TMetadataTransformResult,
    };
  }
};
