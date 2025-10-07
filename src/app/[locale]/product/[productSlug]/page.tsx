import { notFound } from 'next/navigation';

import rankMath from '@/api/rankmath';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { Spacer } from '@/components/Spacer';
import { PRODUCT_DETAILS_FIELDS_FOR_METADATA } from '@/constants/products';
import { ProductDescriptionSection } from '@/features/product/ProductDescriptionSection';
import { ProductMainSection } from '@/features/product/ProductMainSection';
import { ProductRelatedItems } from '@/features/product/ProductRelatedItems';
import { parseMetadata } from '@/handlers/page/getPageMetadata';
import { fetchProductDetails } from '@/handlers/products/fetchProductDetails';
import { createProductDetailsBreadcrumbs } from '@/helpers/breadcrumbs/createProductDetailsBreadcrumbs';
import { transformToMetadata } from '@/helpers/metadata/transformMetadata';
import { TMetadataTransformResult, TMetadataType } from '@/types/metadata';
import { IProductDetails, IProductDetailsMetadata } from '@/types/product';

export const dynamic = 'force-dynamic';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; productSlug: string }>;
}) {
  try {
    const { productSlug } = await params;
    const product = await fetchProductDetails<IProductDetailsMetadata>(
      productSlug,
      { _fields: PRODUCT_DETAILS_FIELDS_FOR_METADATA.join(',') },
    );

    const rankMathResponse = await rankMath.getMetadata(
      product?.permalink as string,
    );

    let metadata = {} as TMetadataTransformResult;

    if (rankMathResponse.success) {
      const metadataObjects = await parseMetadata(rankMathResponse);

      const transformedMetadata = await transformToMetadata(metadataObjects, {
        slug: productSlug,
        type: TMetadataType.PRODUCT_PAGE,
      });

      metadata = transformedMetadata;
    }

    return metadata;
  } catch (error) {
    console.error('Error generating metadata:', error);
    return {
      title: 'Product',
    };
  }
}

interface IProductPageProps {
  params: Promise<{
    locale: string;
    productSlug: string;
  }>;
}

const ProductPage = async ({ params }: IProductPageProps) => {
  const { productSlug } = await params;
  const product = await fetchProductDetails<IProductDetails>(productSlug);

  if (!product) {
    notFound();
  }

  const { related_ids, categories, name } = product;

  const breadcrumbs = createProductDetailsBreadcrumbs(name, categories);

  return (
    <>
      <Breadcrumbs items={breadcrumbs} size='large' />
      <Spacer size='lg' />
      <div className='container'>
        <ProductMainSection product={product} />
        <ProductDescriptionSection product={product} />
        {related_ids?.length > 0 && (
          <ProductRelatedItems relatedIds={related_ids} />
        )}
        <Spacer size='lg' />
      </div>
    </>
  );
};

export default ProductPage;
