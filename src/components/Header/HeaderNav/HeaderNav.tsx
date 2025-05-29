'use client';

import clsx from 'clsx';
import { useState } from 'react';

import { Link } from '@/components/Link';
import { MenuItem } from '@/types/menus';

import { NavItem } from './NavItem';
import styles from './styles.module.scss';

interface IHeaderNavProps {
  navHeaderMenuItems: MenuItem[];
  isScrolling: boolean;
  // headerRef: RefObject<HTMLElement | null>;
  // headerHeight: number;
}

export const HeaderNav = ({
  navHeaderMenuItems,
  isScrolling,
}: IHeaderNavProps) => {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  const handleHoverItem = (item: string | null) => setHoveredItem(item);

  const hoveredMenuItem = navHeaderMenuItems.find(
    ({ slug, url }) => (slug ? `/${slug}` : url) === hoveredItem,
  );
  const { child_items } = hoveredMenuItem || {};

  return (
    <nav
      className={styles['header-nav']}
      onMouseLeave={() => handleHoverItem(null)}
    >
      <ul className={styles['nav-list']}>
        {navHeaderMenuItems.map((item) => (
          <NavItem
            isScrolling={isScrolling}
            item={item}
            key={item.ID}
            handleHoverItem={handleHoverItem}
            hoveredItem={hoveredItem}
          />
        ))}
      </ul>
      <div
        className={clsx(
          styles['submenu-container'],
          hoveredItem && child_items && styles['submenu-container-visible'],
        )}
      >
        <ul className={styles['submenu-list']}>
          <div className={styles['submenu-items-wrapper']}>
            <div className={styles['submenu-items-content']}>
              {child_items?.map((childItem: MenuItem) => (
                <li className={styles['submenu-item']} key={childItem?.ID}>
                  <Link
                    href={childItem.slug || childItem.url}
                    className={styles['submenu-link']}
                  >
                    {childItem?.title}
                  </Link>
                </li>
              ))}
            </div>
          </div>
          <div className={styles['submenu-decorator']}></div>
        </ul>
      </div>
    </nav>
  );
};
