import { IGetPagesParams, IWordPressPage } from '@/types/pages';

import baseAPI from '.';

class Pages {
  private readonly pagesPath = '/wp-json/wp/v2/pages';

  public async getPages(params?: IGetPagesParams) {
    const res = await baseAPI.get<IWordPressPage[]>(this.pagesPath, { params });

    return res.data;
  }

  public async getPageBySlug(slug: string, params?: IGetPagesParams) {
    const res = await baseAPI.get<IWordPressPage[]>(`${this.pagesPath}`, {
      params: { slug, acf_format: 'standard', ...params },
    });

    return res.data;
  }
}

const pages = new Pages();

export default pages;
