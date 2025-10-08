import { AxiosError, AxiosResponse } from 'axios';

import { BRANDS_FIELDS, BRANDS_PER_PAGE } from '@/constants/brands';
import { wait } from '@/helpers/wait';
import { IBrand, IGetBrandsParams } from '@/types/brands';

import baseAPI from '.';

const consumerKey = process.env.NEXT_PUBLIC_CONSUMER_KEY;
const consumerSecret = process.env.NEXT_PUBLIC_CONSUMER_SECRET;

class Custom {
  private readonly customBasePath = '/wp-json/custom';

  public async getBrands(
    params: IGetBrandsParams = {},
  ): Promise<AxiosResponse<IBrand[]>> {
    try {
      await wait({ name: 'Custom' });

      const response = await baseAPI.get(
        `${this.customBasePath}/v1/available-brands`,
        {
          auth: {
            username: consumerKey as string,
            password: consumerSecret as string,
          },
          params: {
            fields: BRANDS_FIELDS.join(','),
            per_page: BRANDS_PER_PAGE,
            ...params,
          },
        },
      );

      return response;
    } catch (error) {
      console.error((error as AxiosError).response?.data);
      throw error;
    }
  }
}

const custom = new Custom();

export default custom;
