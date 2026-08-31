import headerMenu from '@/constants/api/header-menu';
import { MenuItem } from '@/types/menus';

import { HeaderInner } from './HeaderInner';

const PRODUCTS_MENU_URL = '/produkty';
const ACCESSORIES_CATEGORY_URL = '/produkty/kategoria/akcesoria';

const withAccessoriesCategory = (items: MenuItem[]): MenuItem[] =>
  items.map((item) => {
    if (item.url !== PRODUCTS_MENU_URL || !item.child_items?.length) {
      return item;
    }

    if (item.child_items.some(({ url }) => url === ACCESSORIES_CATEGORY_URL)) {
      return item;
    }

    // The header menu is generated from WordPress during prebuild. Until the
    // category is added to that CMS menu, clone a leaf item so the existing
    // menu renderers receive the complete WordPress shape they expect.
    const templateItem = item.child_items[item.child_items.length - 1];
    const accessoriesItem: MenuItem = {
      ...templateItem,
      ID: -224,
      db_id: -224,
      object_id: '224',
      object: 'product_cat',
      post_name: 'akcesoria',
      post_title: 'Akcesoria',
      menu_order: templateItem.menu_order + 1,
      title: 'Akcesoria',
      type: 'taxonomy',
      type_label: 'Kategoria produktu',
      url: ACCESSORIES_CATEGORY_URL,
      slug: undefined,
      child_items: undefined,
    };

    return {
      ...item,
      child_items: [...item.child_items, accessoriesItem],
    };
  });

export const Header = async () => {
  if (!headerMenu) return null;

  return (
    <HeaderInner
      navHeaderMenuItems={withAccessoriesCategory(headerMenu.items)}
    />
  );
};
