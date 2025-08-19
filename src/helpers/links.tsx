import { FacebookIcon } from '@/components/_icons/FacebookIcon';
import { LocationIcon } from '@/components/_icons/LocationIcon';
import { MailIcon } from '@/components/_icons/MailIcon';
import { PhoneIcon } from '@/components/_icons/PhoneIcon';
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

export const getContactInfoIcon = (type: string, className?: string) => {
  switch (type) {
    case 'phone':
      return <PhoneIcon className={className} />;
    case 'mail':
      return <MailIcon className={className} />;
    case 'address':
      return <LocationIcon className={className} />;
    default:
      return null;
  }
};
