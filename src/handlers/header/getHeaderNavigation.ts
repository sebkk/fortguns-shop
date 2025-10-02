import menus from '@/api/menus';
import { NavMenuResponse } from '@/types/menus';

const NAV_HEADER = 'header-nav';

export const getHeaderNavigation =
  async (): Promise<NavMenuResponse | null> => {
    try {
      const menu = await menus.getMenu(NAV_HEADER);

      return menu;
    } catch (err) {
      console.error('ERROR', err);

      return null;
    }
  };
