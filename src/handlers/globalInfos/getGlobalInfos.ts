import { unstable_cache } from 'next/cache';

import globalInfosApi from '@/api/global_infos';
import { CMS_DATA_REVALIDATE } from '@/constants/cache';
import { GLOBAL_INFOS_CONTACT_INFOS_ID } from '@/constants/globalInfos';
import { GlobalInfos, GlobalInfosResponse } from '@/types/globalInfos';

export const cachedGetGlobalInfosById = unstable_cache(
  async (id: string): Promise<GlobalInfosResponse> =>
    await globalInfosApi.getGlobalInfosById(id),
  ['global-infos-by-id'],
  {
    revalidate: CMS_DATA_REVALIDATE,
    tags: ['global-infos'],
  },
);

export const getGlobalInfos = async (): Promise<GlobalInfos | null> => {
  try {
    const response = await cachedGetGlobalInfosById(
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

export const cachedGetGlobalInfos = unstable_cache(
  async () => await getGlobalInfos(),
  ['global-infos'],
  {
    revalidate: CMS_DATA_REVALIDATE,
    tags: ['global-infos'],
  },
);
