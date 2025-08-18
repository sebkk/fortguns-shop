import api from '@/api';
import { GlobalInfosResponse } from '@/types/globalInfos';

class GlobalInfos {
  private readonly globalInfosPath = '/wp-json/wp/v2/global_infos';

  async getGlobalInfos() {
    const res = await api.get<GlobalInfosResponse[]>(this.globalInfosPath, {
      params: { _fields: 'acf' },
    });

    return res.data;
  }
}

const globalInfos = new GlobalInfos();

export default globalInfos;
