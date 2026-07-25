import { cache } from 'react';

import { unstable_cache } from 'next/cache';

import rankMath from '@/api/rankmath';
import { PRODUCTS_DATA_REVALIDATE } from '@/constants/cache';
import { PRODUCT_DETAILS_FIELDS_FOR_METADATA } from '@/constants/products';
import { parseMetadata } from '@/handlers/page/getPageMetadata';
import { cachedFetchProductDetails } from '@/handlers/products/fetchProductDetails';
import { transformToMetadata } from '@/helpers/metadata/transformMetadata';
import { TMetadataTransformResult, TMetadataType } from '@/types/metadata';
import { IProductDetailsMetadata } from '@/types/product';

export const getProductMetadata = async (productSlug: string) => {
  const product = await cachedFetchProductDetails<IProductDetailsMetadata>(
    productSlug,
    { _fields: PRODUCT_DETAILS_FIELDS_FOR_METADATA.join(',') },
  );

  const rankMathResponse = await rankMath.getMetadata(
    product?.permalink as string,
  );

  if (!rankMathResponse.success) {
    return { metadata: {} as TMetadataTransformResult };
  }

  const metadataObjects = await parseMetadata(rankMathResponse);

  const metadata = await transformToMetadata(metadataObjects, {
    slug: productSlug,
    type: TMetadataType.PRODUCT_PAGE,
  });

  return { metadata };
};

// generateMetadata and the page render run in parallel, so they both miss the
// data cache; the React cache dedupes them within a single request.
export const cachedGetProductMetadata = cache(
  unstable_cache(getProductMetadata, ['product-metadata'], {
    revalidate: PRODUCTS_DATA_REVALIDATE,
    tags: ['products'],
  }),
);
