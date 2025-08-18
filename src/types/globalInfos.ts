export interface Icon {
  type: string;
  value: string;
}

export interface Social {
  title: string;
  href: string;
  icon: Icon;
  type: 'facebook' | 'telegram' | 'whatsapp';
}

export interface ContactInfo {
  title: string;
  href: string;
  label: string;
  icon: Icon;
  type: 'address' | 'mail' | 'phone';
}

export interface GlobalInfos {
  socials: Social[];
  contact_infos: ContactInfo[];
}

export interface SocialsLayout {
  acf_fc_layout: 'socials';
  socials: Social[];
}

export interface ContactInfosLayout {
  acf_fc_layout: 'contact_infos';
  contact_infos: ContactInfo[];
}

export type LayoutData = SocialsLayout | ContactInfosLayout;

export interface GlobalInfosACF {
  data: LayoutData[];
}

export interface GlobalInfosResponse {
  acf: GlobalInfosACF;
}
