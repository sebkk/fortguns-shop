import { notFound } from 'next/navigation';

import { Breadcrumbs } from '@/components/Breadcrumbs';
import { JsonLd } from '@/components/JsonLd';
import { Spacer } from '@/components/Spacer';
import { ProductDescriptionSection } from '@/features/product/ProductDescriptionSection';
import { ProductMainSection } from '@/features/product/ProductMainSection';
import { ProductRelatedItems } from '@/features/product/ProductRelatedItems';
import { cachedFetchProductDetails } from '@/handlers/products/fetchProductDetails';
import { cachedGetProductMetadata } from '@/handlers/products/getProductMetadata';
import { createProductDetailsBreadcrumbs } from '@/helpers/breadcrumbs/createProductDetailsBreadcrumbs';
import { IProductDetails } from '@/types/product';

export const dynamic = 'force-static';
export const revalidate = 7200;
export const dynamicParams = true;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; productSlug: string }>;
}) {
  try {
    const { productSlug } = await params;

    const { metadata } = await cachedGetProductMetadata(productSlug);

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
  const product = await cachedFetchProductDetails<IProductDetails>(productSlug);

  if (!product) {
    notFound();
  }

  const { related_ids, categories, name } = product;

  const breadcrumbs = createProductDetailsBreadcrumbs(name, categories);

  const { metadata } = await cachedGetProductMetadata(productSlug);

  return (
    <>
      <JsonLd scripts={metadata.scripts} />
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
