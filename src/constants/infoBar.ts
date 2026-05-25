import { InfoBarMessage } from '@/types/infoBar';

export const INFO_BAR_SESSION_STORAGE_KEY = 'fortguns-info-bar-dismissed';

export const INFO_BAR_HEIGHT_PX = 36;

export const infoBarMessages: InfoBarMessage[] = [
  {
    id: 'free-shipping',
    text: 'Darmowa dostawa przy zamówieniach powyżej 500 zł',
  },
  {
    id: 'visit-store',
    text: 'Zapraszamy do salonu — profesjonalna obsługa i doradztwo',
  },
];
