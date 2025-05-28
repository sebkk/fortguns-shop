import { getHeaderNavigation } from '@/handlers/header/getHeaderNavigation';

import { HeaderInner } from './HeaderInner';

export const Header = async () => {
  const headerMenu = await getHeaderNavigation();

  if (!headerMenu) return null;

  return <HeaderInner navHeaderMenuItems={headerMenu.items} />;
};
