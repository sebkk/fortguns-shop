import { notFound } from 'next/navigation';

import products from '@/api/woocommerce/products';
import { Spacer } from '@/components/Spacer';
import { ProductDescriptionSection } from '@/features/product/ProductDescriptionSection';
import { ProductMainSection } from '@/features/product/ProductMainSection';
import { ProductRelatedItems } from '@/features/product/ProductRelatedItems';

export const dynamic = 'force-static';

export const revalidate = 3600;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; productSlug: string }>;
}) {
  try {
    const { productSlug } = await params;
    const product = await fetchProduct(productSlug);

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

const fetchProduct = async (productSlug: string) => {
  try {
    const response = await products.getProductDetails(productSlug);

    if (response.data) return response.data[0];

    return null;
  } catch (err) {
    console.error(err);
    return null;
  }
};

interface IProductPageProps {
  params: Promise<{
    locale: string;
    productSlug: string;
  }>;
}

const ProductPage = async ({ params }: IProductPageProps) => {
  try {
    const { productSlug } = await params;
    const product = await fetchProduct(productSlug);

    if (!product) {
      notFound();
    }

    const { related_ids } = product;

    return (
      <>
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
