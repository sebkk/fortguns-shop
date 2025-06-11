import products from '@/api/woocommerce/products';
import { Spacer } from '@/components/Spacer';
import { ProductDescriptionSection } from '@/features/product/ProductDescriptionSection';
import { ProductMainSection } from '@/features/product/ProductMainSection';
import { ProductRelatedItems } from '@/features/product/ProductRelatedItems';
import { IProduct } from '@/types/product';

const fetchProduct = async (productSlug: string) => {
  try {
    const response = await products.getProductDetails(productSlug);

    if (response.data) return response.data[0];

    return null;
  } catch (err) {
    console.log(err);

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

  const { related_ids } = product as IProduct;

  return (
    <>
      <Spacer size='lg' />
      <div className='container'>
        <ProductMainSection product={product as IProduct} />
        <ProductDescriptionSection product={product as IProduct} />
        {related_ids.length && <ProductRelatedItems relatedIds={related_ids} />}
        <Spacer size='lg' />
      </div>
    </>
  );
};

export default ProductPage;
