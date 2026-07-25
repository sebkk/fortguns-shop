import { cache } from 'react';

import { unstable_cache } from 'next/cache';

import { BASE_URL } from '@/api';
import rankMath from '@/api/rankmath';
import { PRODUCTS_DATA_REVALIDATE } from '@/constants/cache';
import { parseMetadata } from '@/handlers/page/getPageMetadata';
import { transformToMetadata } from '@/helpers/metadata/transformMetadata';
import { TMetadataTransformResult, TMetadataType } from '@/types/metadata';

export const getCategoryProductMetadata = async (slug: string) => {
  const metadataResponse = await rankMath.getMetadata(
    `${BASE_URL}/product-category/${slug}`,
  );

  if (metadataResponse.success) {
    const metadataObjects = await parseMetadata(metadataResponse);

    const transformedMetadataWithoutScript =
      (await transformToMetadata(metadataObjects, {
        slug,
        type: TMetadataType.PRODUCT_CATEGORY_PAGE,
      })) || {};

    return {
      metadata: transformedMetadataWithoutScript,
    };
  } else {
    return {
      metadata: {} as TMetadataTransformResult,
    };
  }
};

// generateMetadata and the page render run in parallel, so they both miss the
// data cache; the React cache dedupes them within a single request.
export const cachedGetCategoryProductMetadata = cache(
  unstable_cache(getCategoryProductMetadata, ['category-product-metadata'], {
    revalidate: PRODUCTS_DATA_REVALIDATE,
    tags: ['products'],
  }),
);
