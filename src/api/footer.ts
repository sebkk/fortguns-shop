import api from '@/api';
import { FooterData } from '@/types/footer';

class Footer {
  private readonly footerPath = '/wp-json/wp/v2/footer';

  async fetchFooter(): Promise<FooterData> {
    const res = await api.get(this.footerPath, {
      params: { _fields: 'acf', slug: 'footer' },
    });

    return res.data;
  }
}

const footer = new Footer();

export default footer;
