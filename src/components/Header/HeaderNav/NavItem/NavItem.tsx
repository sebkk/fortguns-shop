'use client';

import clsx from 'clsx';

import { ArrowIcon } from '@/components/_icons/ArrowIcon';
import { Link } from '@/components/Link';
import { MenuItem } from '@/types/menus';

import styles from './styles.module.scss';

interface INavItemProps {
  item: MenuItem;
  isScrolling: boolean;
  handleHoverItem: (item: string | null) => void;
  hoveredItem: string | null;
  handleOpen: () => void;
  open: boolean;
}

export const NavItem = ({
  item,
  isScrolling,
  handleHoverItem,
  hoveredItem,
  handleOpen,
  open,
}: INavItemProps) => {
  const { ID, child_items, title, slug, url } = item || {};
  const href = slug ? `/${slug}` : url;

  const areChildItems = !!child_items;

  const onMouseEvent = (hrefValue: string | null) => {
    if (areChildItems) {
      handleHoverItem(hrefValue);
      handleOpen();
    }
  };

  return (
    <li
      key={ID}
      onMouseEnter={() => onMouseEvent(href)}
      className={styles['nav-item']}
    >
      <Link
        size={isScrolling ? 'medium' : 'large'}
        href={href}
        className={styles['nav-link']}
        trailingIcon={
          areChildItems && (
            <ArrowIcon
              className={clsx(
                styles['nav-link-icon'],
                open
                  ? styles['icon-rotate-hovered']
                  : styles['icon-rotate-default'],
              )}
            />
          )
        }
      >
        {title}
      </Link>
    </li>
  );
};
