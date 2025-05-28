import clsx from 'clsx';
import { RefObject, useState } from 'react';

import { Link } from '@/components/Link';
import { MenuItem } from '@/types/menus';

import { NavItem } from './NavItem';

interface IHeaderNavProps {
  navHeaderMenuItems: MenuItem[];
  isScrolling: boolean;
  headerRef: RefObject<HTMLElement | null>;
  headerHeight: number;
}

export const HeaderNav = ({
  navHeaderMenuItems,
  isScrolling,
  // headerRef,
  // headerHeight,
}: IHeaderNavProps) => {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  const handleHoverItem = (item: string | null) => setHoveredItem(item);

  const hoveredMenuItem = navHeaderMenuItems.find(
    ({ slug, url }) => (slug ? `/${slug}` : url) === hoveredItem,
  );
  const { child_items } = hoveredMenuItem || {};

  console.log(hoveredItem);

  return (
    <nav className='relative flex items-center self-stretch'>
      <ul className='flex items-center gap-3 self-stretch'>
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
          `absolute`,
          'top-14',
          'left-1/2',
          '-translate-x-1/2',
          'grid',
          'transition-all duration-300 ease-in-out',
          'overflow-hidden',
          hoveredItem ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]',
          'w-150',
          'rounded-5',
        )}
      >
        <ul
          className={clsx('flex', 'bg-background-light px-2 py-2', 'min-h-0')}
        >
          <div className='flex overflow-hidden'>
            <div className='pr-2'>
              {child_items?.map((childItem: MenuItem) => (
                <li key={childItem?.ID}>
                  <Link
                    className='w-full justify-start px-2 py-4 text-left'
                    href={childItem.slug || childItem.url}
                  >
                    {childItem?.title}
                  </Link>
                </li>
              ))}
            </div>
          </div>
          <div className='flex-1 rounded-2.5 bg-background-dark'></div>
        </ul>
      </div>
    </nav>
  );
};
