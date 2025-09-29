import { BASE_URL } from '@/api';
import rankMath from '@/api/rankmath';
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
