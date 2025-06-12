import clsx from 'clsx';
import { useEffect, useState } from 'react';

import { ArrowIcon } from '@/components/_icons/ArrowIcon';
import { LinkBtnNav } from '@/components/LinkBtnNav';
import { MenuItem } from '@/types/menus';

import { Typography } from '@/components/Typography';
import styles from './styles.module.scss';

export const HeaderNavDropdown = ({
  child_items,
  hoveredItem,
  open,
}: {
  child_items: MenuItem[];
  hoveredItem: boolean;
  open: boolean;
}) => {
  const [hoveredCategory, setHoveredCategory] = useState<{
    id: number;
    title: string;
    child_items: MenuItem[] | undefined;
  } | null>(null);

  useEffect(() => {
    if (hoveredItem) {
      setHoveredCategory({
        id: child_items[0].ID,
        title: child_items[0].title,
        child_items: child_items[0].child_items,
      });
    }
  }, [hoveredItem]);

  return (
    <div
      className={clsx(
        styles['submenu-container'],
        open &&
          hoveredItem &&
          child_items &&
          styles['submenu-container-visible'],
      )}
    >
      <ul className={styles['submenu-list']}>
        <div className={styles['submenu-items-wrapper']}>
          <div className={styles['submenu-items-content']}>
            {child_items?.map(
              ({ ID, title, slug, url, child_items }: MenuItem) => (
                <LinkBtnNav
                  key={ID}
                  href={slug || url}
                  className={clsx(
                    styles['link-btn-nav'],
                    hoveredCategory?.id === ID &&
                      styles['link-btn-nav--selected'],
                  )}
                  linkProps={{
                    anchorProps: {
                      onMouseEnter: () =>
                        child_items &&
                        setHoveredCategory({
                          id: ID,
                          title,
                          child_items,
                        }),
                    },
                  }}
                >
                  {title}
                  {child_items && <ArrowIcon />}
                </LinkBtnNav>
              ),
            )}
          </div>
        </div>
        <div className={styles['submenu-decorator']}>
          <Typography tag='h6'>{hoveredCategory?.title}</Typography>
          <ul className={styles['submenu-decorator-list']}>
            {hoveredCategory?.child_items?.map(({ ID, title, slug, url }) => {
              const href = slug || url;

              return (
                <li key={ID}>
                  <LinkBtnNav href={href} className={styles['link-btn-nav']}>
                    {title}
                  </LinkBtnNav>
                </li>
              );
            })}
          </ul>
        </div>
      </ul>
    </div>
  );
};
