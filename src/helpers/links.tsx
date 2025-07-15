import { FacebookIcon } from '@/components/_icons/FacebookIcon';
import { TelegramIcon } from '@/components/_icons/TelegramIcon';
import { WhatsAppIcon } from '@/components/_icons/WhatsAppIcon';
import { TLinkHref } from '@/types/footer';

const linksHrefsTypes: Record<TLinkHref, string> = {
  phone: 'tel:',
  mail: 'mailto:',
  address: 'maps:?q=',
};

export const getLinkHref = (href: TLinkHref, type: TLinkHref) => {
  const hrefType = linksHrefsTypes[type];

  return hrefType ? `${hrefType}${href}` : href;
};

export const getLinkIcon = (type: TLinkHref) => {
  const linkIcons: Record<TLinkHref, React.ReactNode> = {
    facebook: <FacebookIcon />,
    telegram: <TelegramIcon />,
    whatsapp: <WhatsAppIcon />,
  };

  return linkIcons[type];
};
