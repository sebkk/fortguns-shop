import products from '@/api/woocommerce/products';

export const fetchProductDetails = async (productSlug: string) => {
  try {
    const response = await products.getProductDetails(productSlug);

    if (response.data) return response.data[0];

    return null;
  } catch (err) {
    console.error(err);
    return null;
  }
};
