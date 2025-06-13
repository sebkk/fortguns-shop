'use client';

import { useState } from 'react';

import { MenuItem } from '@/types/menus';

import { HeaderNavDropdown } from './HeaderNavDropdown';
import { NavItem } from './NavItem';
import styles from './styles.module.scss';

interface IHeaderNavProps {
  navHeaderMenuItems: MenuItem[];
  isScrolling: boolean;
}

export const HeaderNav = ({
  navHeaderMenuItems,
  isScrolling,
}: IHeaderNavProps) => {
  const [open, setOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  const handleHoverItem = (item: string | null) => setHoveredItem(item);

  const hoveredMenuItem = navHeaderMenuItems.find(
    ({ slug, url }) => (slug ? `/${slug}` : url) === hoveredItem,
  );
  const { child_items } = hoveredMenuItem || {};

  return (
    <nav className={styles['header-nav']} onMouseLeave={() => setOpen(false)}>
      <ul className={styles['nav-list']}>
        {navHeaderMenuItems.map((item) => (
          <NavItem
            isScrolling={isScrolling}
            item={item}
            key={item.ID}
            handleHoverItem={handleHoverItem}
            handleOpen={() => setOpen((prev) => !prev)}
            open={open}
          />
        ))}
      </ul>
      <HeaderNavDropdown
        child_items={child_items as MenuItem[]}
        hoveredItem={!!hoveredItem}
        open={open}
      />
    </nav>
  );
};
