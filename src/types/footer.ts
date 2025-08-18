export type TLinkHref =
  | 'phone'
  | 'mail'
  | 'address'
  | 'facebook'
  | 'telegram'
  | 'whatsapp'
  | string;

interface NavLink {
  title: string;
  icon?: string;
  href: string;
  type?: TLinkHref;
}

interface NavColumn {
  title: string;
  links: NavLink[];
}

interface NavAboutUs {
  title: string;
}

interface FollowUs {
  title: string;
}

export interface FooterElement {
  nav_column: NavColumn;
  nav_about_us: NavAboutUs;
  follow_us: FollowUs;
}

interface FooterItem {
  acf: FooterElement;
}

export type FooterData = FooterItem[];
