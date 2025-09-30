import { notFound } from 'next/navigation';

import { BreadcrumbsServer } from '@/components/Breadcrumbs/BreadcrumbsServer';
import { Spacer } from '@/components/Spacer';
import { ProductDescriptionSection } from '@/features/product/ProductDescriptionSection';
import { ProductMainSection } from '@/features/product/ProductMainSection';
import { ProductRelatedItems } from '@/features/product/ProductRelatedItems';
import { fetchProductDetails } from '@/handlers/products/fetchProductDetails';
import { createProductDetailsBreadcrumbs } from '@/helpers/breadcrumbs/createProductDetailsBreadcrumbs';

export const dynamic = 'force-dynamic';

// export const revalidate = 3600;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; productSlug: string }>;
}) {
  try {
    const { productSlug } = await params;
    const product = await fetchProductDetails(productSlug);

    if (!product) {
      return {
        title: 'Product Not Found',
      };
    }

    return {
      title: product.name,
    };
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
  try {
    const { productSlug } = await params;
    const product = await fetchProductDetails(productSlug);

    if (!product) {
      notFound();
    }

    const { related_ids, categories, name } = product;

    const breadcrumbs = createProductDetailsBreadcrumbs(name, categories);

    return (
      <>
        <BreadcrumbsServer items={breadcrumbs} size='large' />
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
  } catch (error) {
    console.error('Error rendering product page:', error);
    notFound();
  }
};

export default ProductPage;
