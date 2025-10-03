import { AxiosResponse } from 'axios';

import { PRODUCT_DETAILS_FIELDS, PRODUCTS_FIELDS } from '@/constants/products';
import { wait } from '@/helpers/wait';
import { IGetProductsParams, STOCK_STATUS } from '@/types/product';

import baseAPI from '..';

const consumerKey = process.env.NEXT_PUBLIC_CONSUMER_KEY;
const consumerSecret = process.env.NEXT_PUBLIC_CONSUMER_SECRET;

class Products {
  private readonly basePath = '/wp-json/wc/v3/products';

  public async getProducts<T>(
    params?: IGetProductsParams,
  ): Promise<AxiosResponse<T[]>> {
    await wait({ name: 'Products' });

    return await baseAPI.get(this.basePath, {
      auth: {
        username: consumerKey as string,
        password: consumerSecret as string,
      },
      params: {
        _fields: PRODUCTS_FIELDS.join(','),
        stock_status: STOCK_STATUS.INSTOCK,
        status: 'publish',
        ...params,
      },
    });
  }

  public async getProductDetails<T>(
    slug: string,
    params: IGetProductsParams = {},
  ): Promise<AxiosResponse<T[]>> {
    await wait({ name: `ProductDetails ${slug}` });

    return await baseAPI.get(`${this.basePath}?slug=${slug}`, {
      auth: {
        username: consumerKey as string,
        password: consumerSecret as string,
      },
      params: {
        _fields: PRODUCT_DETAILS_FIELDS.join(','),
        status: 'publish',
        ...params,
      },
    });
  }
}

const products = new Products();

export default products;
