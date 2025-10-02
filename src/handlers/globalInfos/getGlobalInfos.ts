import globalInfosApi from '@/api/global_infos';
import { GLOBAL_INFOS_CONTACT_INFOS_ID } from '@/constants/globalInfos';
import { GlobalInfos } from '@/types/globalInfos';

export const getGlobalInfos = async (): Promise<GlobalInfos | null> => {
  try {
    const response = await globalInfosApi.getGlobalInfosById(
      GLOBAL_INFOS_CONTACT_INFOS_ID,
    );

    const globalInfosData: GlobalInfos = response.acf.data.reduce(
      (prev, item) => {
        return {
          ...prev,
          [item.acf_fc_layout]:
            item.acf_fc_layout === 'socials'
              ? item.socials
              : item.contact_infos,
        };
      },
      {} as GlobalInfos,
    );

    return globalInfosData;
  } catch (err) {
    console.error('ERROR', err);

    return null;
  }
};
