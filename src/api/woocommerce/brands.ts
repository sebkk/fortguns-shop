import { AxiosResponse } from 'axios';

import { BRANDS_FIELDS, BRANDS_PER_PAGE } from '@/constants/brands';
import { IBrand, IGetBrandsParams } from '@/types/brands';

import baseAPI from '..';

const consumerKey = process.env.NEXT_PUBLIC_CONSUMER_KEY;
const consumerSecret = process.env.NEXT_PUBLIC_CONSUMER_SECRET;

class Brands {
  private readonly basePath = '/wp-json/wc/v3/products/brands';

  public async getBrands(
    params: IGetBrandsParams = {},
  ): Promise<AxiosResponse<IBrand[]>> {
    return await baseAPI.get(this.basePath, {
      auth: {
        username: consumerKey as string,
        password: consumerSecret as string,
      },
      params: {
        fields: BRANDS_FIELDS.join(','),
        per_page: BRANDS_PER_PAGE,
        ...params,
      },
    });
  }
}

const brands = new Brands();

export default brands;
