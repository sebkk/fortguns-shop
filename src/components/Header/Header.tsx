import { getHeaderNavigation } from '@/handlers/header/getHeaderNavigation';

import { HeaderInner } from './HeaderInner';

export const Header = async () => {
  const headerMenu = await getHeaderNavigation();

  if (!headerMenu) return { notFound: true };

  return <HeaderInner navHeaderMenuItems={headerMenu.items} />;
};
