import clsx from 'clsx';

import { ArrowIcon } from '@/components/_icons/ArrowIcon';
import { Link } from '@/components/Link';
import { MenuItem } from '@/types/menus';

interface INavItemProps {
  item: MenuItem;
  isScrolling: boolean;

  handleHoverItem: (item: string | null) => void;
  hoveredItem: string | null;
}

export const NavItem = ({
  item,
  isScrolling,
  // headerRef,
  handleHoverItem,
  hoveredItem,
}: INavItemProps) => {
  const { ID, child_items, title, slug, url } = item || {};
  const href = slug ? `/${slug}` : url;

  const areChildItems = !!child_items;
  const isHovered = hoveredItem === href;

  // const headerRefHeight = headerRef.current?.offsetHeight;

  const onMouseEvent = (href: string | null) => {
    if (areChildItems) {
      handleHoverItem(href);
    }
  };

  return (
    <li
      key={ID}
      onMouseEnter={() => onMouseEvent(href)}
      // onMouseLeave={() => onMouseEvent(null)}
      className='flex justify-start self-stretch'
    >
      <Link
        size={isScrolling ? 'medium' : 'large'}
        href={href}
        className={clsx('uppercase', 'transition-all', 'justify-start')}
        trailingIcon={
          areChildItems && (
            <ArrowIcon
              className={clsx(
                {
                  'rotate-120': !isHovered,
                  'rotate-180': isHovered,
                },
                'ml-0',
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
