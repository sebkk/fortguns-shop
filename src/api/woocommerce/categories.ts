import { AxiosResponse } from 'axios';

import { wait } from '@/helpers/wait';
import { ICategory, IGetCategoriesParams } from '@/types/categories';

import baseAPI from '..';

const consumerKey = process.env.NEXT_PUBLIC_CONSUMER_KEY;
const consumerSecret = process.env.NEXT_PUBLIC_CONSUMER_SECRET;

class Categories {
  private readonly basePath = '/wp-json/wc/v3/products/categories';

  public async getCategories(
    params?: IGetCategoriesParams,
  ): Promise<AxiosResponse<ICategory[]>> {
    await wait({
      name: params?.slug ? `Categories ${params.slug}` : 'Categories',
    });

    return await baseAPI.get(this.basePath, {
      auth: {
        username: consumerKey as string,
        password: consumerSecret as string,
      },
      params,
    });
  }

  public async getCategoryById(
    id: number,
    params?: IGetCategoriesParams,
  ): Promise<AxiosResponse<ICategory>> {
    await wait({ name: `CategoryById ${id}` });

    return await baseAPI.get(`${this.basePath}/${id}`, {
      auth: {
        username: consumerKey as string,
        password: consumerSecret as string,
      },
      params,
    });
  }
}

const categories = new Categories();

export default categories;
