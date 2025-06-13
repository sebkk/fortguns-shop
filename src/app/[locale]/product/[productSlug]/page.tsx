import { notFound } from 'next/navigation';

import products from '@/api/woocommerce/products';
import { Spacer } from '@/components/Spacer';
import { ProductDescriptionSection } from '@/features/product/ProductDescriptionSection';
import { ProductMainSection } from '@/features/product/ProductMainSection';
import { ProductRelatedItems } from '@/features/product/ProductRelatedItems';

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
    productSlug: string;
  }>;
}

const ProductPage = async ({ params }: IProductPageProps) => {
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
};

export default ProductPage;
