import productsApi from '@/api/woocommerce/products';
import { PER_PAGE_DEFAULT } from '@/constants/products';
import {
  IGetProductsParams,
  IProduct,
  PRODUCTS_ORDER,
  PRODUCTS_ORDER_BY,
} from '@/types/product';

export const fetchProducts = async ({
  params,
}: {
  params: IGetProductsParams;
}): Promise<{
  products: IProduct[];
  totalPages: number;
  totalProducts: number;
}> => {
  try {
    const res = await productsApi.getProducts({
      per_page: PER_PAGE_DEFAULT,
      orderby: PRODUCTS_ORDER_BY.DATE,
      order: PRODUCTS_ORDER.ASC,
      ...params,
      page: params.page ? +params.page : 1,
    });

    return {
      products: res.data,
      totalPages: res.headers['x-wp-totalpages'],
      totalProducts: res.headers['x-wp-total'],
    };
  } catch (error) {
    console.error(error);

    return {
      products: [],
      totalPages: 0,
      totalProducts: 0,
    };
  }
};
