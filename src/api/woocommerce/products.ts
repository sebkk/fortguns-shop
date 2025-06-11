import { IProduct } from '@/types/product';
import { AxiosResponse } from 'axios';
import baseAPI from '..';

const consumerKey = process.env.NEXT_PUBLIC_CONSUMER_KEY;
const consumerSecret = process.env.NEXT_PUBLIC_CONSUMER_SECRET;

interface IGetProductsParams {
  orderby?:
    | 'date'
    | 'id'
    | 'include'
    | 'title'
    | 'slug'
    | 'price'
    | 'popularity'
    | 'rating';
  order?: 'asc' | 'desc';
  per_page?: number;
  stock_status?: IProduct['stock_status'];
  include?: string;
}

class Products {
  private readonly basePath = '/wp-json/wc/v3/products';

  public async getProducts(
    params?: IGetProductsParams,
  ): Promise<AxiosResponse<IProduct[]>> {
    return await baseAPI.get(this.basePath, {
      auth: {
        username: consumerKey as string,
        password: consumerSecret as string,
      },
      params: {
        ...params,
      },
    });
  }

  public async getProductDetails(
    slug: string,
  ): Promise<AxiosResponse<IProduct[]>> {
    return await baseAPI.get(`${this.basePath}?slug=${slug}`, {
      auth: {
        username: consumerKey as string,
        password: consumerSecret as string,
      },
    });
  }
}

const products = new Products();

export default products;
