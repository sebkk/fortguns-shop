import { AxiosError } from 'axios';

import { wait } from '@/helpers/wait';
import { IGetPagesParams } from '@/types/pages';

import baseAPI from '.';

class Pages {
  private readonly pagesPath = '/wp-json/wp/v2/pages';

  public async getPages<T>(params?: IGetPagesParams) {
    await wait({ name: 'Pages' });

    const res = await baseAPI.get<T[]>(this.pagesPath, { params });

    return res.data;
  }

  public async getPageBySlug<T>(
    slug: string,
    params?: IGetPagesParams,
  ): Promise<T[] | null> {
    try {
      await wait({ name: `PageBySlug ${slug}` });

      const res = await baseAPI.get<T[]>(`${this.pagesPath}`, {
        params: { slug, acf_format: 'standard', ...params },
      });

      return res.data;
    } catch (error) {
      console.error((error as AxiosError).response?.data);

      return error as null;
    }
  }
}

const pages = new Pages();

export default pages;
