import { ReactNode } from 'react';

import { ArrowIcon } from '@/components/_icons/ArrowIcon';
import { Link } from '@/components/Link';
import { Typography } from '@/components/Typography';

import styles from './SearchDropdownGroup.module.scss';

interface SearchDropdownGroupProps {
  title: string;
  itemsLength?: number;
  href: string;
  children: ReactNode;
}

export const SearchDropdownGroup = ({
  title,
  itemsLength,
  href,
  children,
}: SearchDropdownGroupProps) => {
  return (
    <div className={styles['search-dropdown-group']}>
      <Link href={href} className={styles['search-dropdown-group__header']}>
        <Typography
          fontSize='sm'
          className={styles['search-dropdown-group__title']}
        >
          {title}
          {/* @ts-expect-error - itemsLength is optional */}
          {itemsLength >= 0 && (
            <span className={styles['search-dropdown-group__title-count']}>
              ({itemsLength})
            </span>
          )}
        </Typography>
        <ArrowIcon className={styles['search-dropdown-group__arrow-icon']} />
      </Link>
      <div className={styles['search-dropdown-group__items']}>{children}</div>
    </div>
  );
};
