import headerMenu from '@/constants/api/header-menu';

import { HeaderInner } from './HeaderInner';

export const Header = async () => {
  if (!headerMenu) return null;

  return <HeaderInner navHeaderMenuItems={headerMenu.items} />;
};
