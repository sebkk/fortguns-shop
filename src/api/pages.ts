import { IGetPagesParams } from '@/types/pages';

import baseAPI from '.';

class Pages {
  private readonly pagesPath = '/wp-json/wp/v2/pages';

  public async getPages<T>(params?: IGetPagesParams) {
    const res = await baseAPI.get<T[]>(this.pagesPath, { params });

    return res.data;
  }

  public async getPageBySlug<T>(
    slug: string,
    params?: IGetPagesParams,
  ): Promise<T[] | null> {
    try {
      const res = await baseAPI.get<T[]>(`${this.pagesPath}`, {
        params: { slug, acf_format: 'standard', ...params },
      });

      return res.data;
    } catch (error) {
      console.error(error);

      return [];
    }
  }
}

const pages = new Pages();

export default pages;
