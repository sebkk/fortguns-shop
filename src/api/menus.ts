import { NavMenuResponse } from '@/types/menus';

import baseAPI from '.';

class Menus {
  private menusPath = '/wp-json/menus/v1/menus';

  public async getMenu(name: string) {
    const res = await baseAPI.get<NavMenuResponse>(`${this.menusPath}/${name}`);

    return res.data;
  }
}

const menus = new Menus();

export default menus;
