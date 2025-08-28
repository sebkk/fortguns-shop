import { AxiosResponse } from 'axios';

import { PRODUCT_DETAILS_FIELDS, PRODUCTS_FIELDS } from '@/constants/products';
import {
  IGetProductsParams,
  IProductDetails,
  STOCK_STATUS,
} from '@/types/product';

import baseAPI from '..';

const consumerKey = process.env.NEXT_PUBLIC_CONSUMER_KEY;
const consumerSecret = process.env.NEXT_PUBLIC_CONSUMER_SECRET;

class Products {
  private readonly basePath = '/wp-json/wc/v3/products';

  public async getProducts<T>(
    params?: IGetProductsParams,
  ): Promise<AxiosResponse<T[]>> {
    return await baseAPI.get(this.basePath, {
      auth: {
        username: consumerKey as string,
        password: consumerSecret as string,
      },
      params: {
        _fields: PRODUCTS_FIELDS.join(','),
        stock_status: STOCK_STATUS.INSTOCK,
        ...params,
      },
    });
  }

  public async getProductDetails(
    slug: string,
  ): Promise<AxiosResponse<IProductDetails[]>> {
    return await baseAPI.get(`${this.basePath}?slug=${slug}`, {
      auth: {
        username: consumerKey as string,
        password: consumerSecret as string,
      },
      params: {
        _fields: PRODUCT_DETAILS_FIELDS.join(','),
      },
    });
  }
}

const products = new Products();

export default products;
