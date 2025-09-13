'use client';

import React from 'react';

import clsx from 'clsx';

import { ChevronRightIcon } from '@/components/_icons/ChevronRightIcon';
import { Link } from '@/components/Link';

import styles from './Breadcrumbs.module.scss';
import { IBreadcrumbsProps } from './types';

export const Breadcrumbs = ({
  items,
  className,
  separator,
  maxItems = 5,
  showHome = true,
  homeLabel = 'Strona główna',
  homeHref = '/',
  size = 'medium',
  variant = 'default',
}: IBreadcrumbsProps) => {
  const defaultSeparator = separator || <ChevronRightIcon size={14} />;
  // Add home item if showHome is true and it's not already the first item
  const allItems = React.useMemo(() => {
    const homeItem = {
      label: homeLabel,
      href: homeHref,
      isActive: false,
    };

    // If items is empty or first item is not home, add home item
    if (showHome && (items.length === 0 || items[0].href !== homeHref)) {
      return [homeItem, ...items];
    }

    return items;
  }, [items, showHome, homeLabel, homeHref]);

  // Truncate items if they exceed maxItems
  const displayItems = React.useMemo(() => {
    if (allItems.length <= maxItems) {
      return allItems;
    }

    // Keep first item, last item, and truncate middle items
    const firstItem = allItems[0];
    const lastItem = allItems[allItems.length - 1];
    const middleItems = allItems.slice(1, -1);

    return [
      firstItem,
      ...(middleItems.length > 0
        ? [{ ...middleItems[0], label: '...', href: undefined }]
        : []),
      lastItem,
    ];
  }, [allItems, maxItems]);

  const isTruncated = allItems.length > maxItems;

  const breadcrumbClassNames = clsx(
    styles.breadcrumbs,
    styles[`breadcrumbs--${size}`],
    styles[`breadcrumbs--${variant}`],
    isTruncated && styles['breadcrumbs--truncated'],
    className,
  );

  return (
    <nav aria-label='Breadcrumb' className={breadcrumbClassNames}>
      <ol className={styles.breadcrumbs}>
        {displayItems.map((item, index) => {
          const isLast = index === displayItems.length - 1;
          const isActive = item.isActive || isLast;

          return (
            <li key={index} className={styles['breadcrumb-item']}>
              {item.href && !isActive ? (
                <Link
                  href={item.href}
                  className={styles['breadcrumb-link']}
                  size={
                    size === 'small'
                      ? 'small'
                      : size === 'large'
                        ? 'large'
                        : 'medium'
                  }
                >
                  {item.label}
                </Link>
              ) : (
                <span
                  className={styles['breadcrumb-current']}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {item.label}
                </span>
              )}
              {!isLast && (
                <span
                  className={styles['breadcrumb-separator']}
                  aria-hidden='true'
                >
                  {defaultSeparator}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};
