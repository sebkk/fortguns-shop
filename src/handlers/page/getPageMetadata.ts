// @ts-expect-error Importing HTMLToJSON from html-to-json-parser
import { HTMLToJSON } from 'html-to-json-parser';

import pagesApi from '@/api/pages';
import rankMath from '@/api/rankmath';
import { fieldsMetadata } from '@/constants/pages';
import { buildLog } from '@/helpers/build/buildLog';
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
  // Clean HTML entities before parsing
  const cleanedHead = metadataResponse.head
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");

  const parsedMetadata = await HTMLToJSON(`<head>${cleanedHead}</head>`);

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
  buildLog({
    type: 'info',
    message: `START - ${slug}`,
    functionName: 'getPageMetadata',
  });

  try {
    const [page] =
      (await pagesApi.getPageBySlug<IWordPressPageSeoStandard>(slug, {
        _fields: fieldsMetadata.join(),
        status: 'publish',
        ...params,
      })) || [];

    const { link, rank_math_seo } = page || ({} as IWordPressPageSeoStandard);

    let metadata: TMetadataTransformResult = {} as TMetadataTransformResult;

    const rank_math_focus_keyword = rank_math_seo || '';

    const metadataResponse = await rankMath.getMetadata(link || '');

    if (metadataResponse.success) {
      const metadataObjects = await parseMetadata(metadataResponse);

      buildLog({
        type: 'info',
        message: 'rank_math_focus_keyword',
        functionName: 'getPageMetadata',
        additionalLog: rank_math_focus_keyword,
      });

      const transformedMetadata =
        (await transformToMetadata(metadataObjects, {
          slug,
          type,
        })) || {};

      metadata = {
        ...transformedMetadata,
        keywords: rank_math_focus_keyword?.split(',') || [],
      };
    }

    buildLog({
      type: 'success',
      message: slug,
      functionName: 'getPageMetadata',
    });

    return {
      metadata,
    };
  } catch (error) {
    buildLog({
      type: 'error',
      message: slug,
      functionName: 'getPageMetadata',
      additionalLog: error,
    });

    return {
      metadata: {} as TMetadataTransformResult,
    };
  }
};
