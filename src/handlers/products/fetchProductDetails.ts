import products from '@/api/woocommerce/products';
import { IGetProductsParams } from '@/types/product';

export const fetchProductDetails = async <T>(
  productSlug: string,
  params?: IGetProductsParams,
): Promise<T | null> => {
  try {
    const response = await products.getProductDetails<T>(productSlug, params);

    const [product] = response.data;

    if (product) return product;

    return null;
  } catch (err) {
    console.error(err);
    return null;
  }
};
