import api from '@/api';
import { GLOBAL_INFOS_FIELDS } from '@/constants/globalInfos';
import { GlobalInfosResponse } from '@/types/globalInfos';

class GlobalInfos {
  private readonly globalInfosPath = '/wp-json/wp/v2/global_infos';

  async getGlobalInfos() {
    const res = await api.get<GlobalInfosResponse[]>(this.globalInfosPath, {
      params: { _fields: GLOBAL_INFOS_FIELDS.join(',') },
    });

    return res.data;
  }

  async getGlobalInfosById(id: string) {
    const res = await api.get<GlobalInfosResponse>(
      `${this.globalInfosPath}/${id}`,
      {
        params: { _fields: GLOBAL_INFOS_FIELDS.join(',') },
      },
    );

    return res.data;
  }
}

const globalInfos = new GlobalInfos();

export default globalInfos;
