'use client';

import React from 'react';

import dynamic from 'next/dynamic';

import clsx from 'clsx';
import parseHTML from 'html-react-parser';
import { useLocale, useTranslations } from 'next-intl';

import { ChevronRightIcon } from '@/components/_icons/ChevronRightIcon';
import { Link } from '@/components/Link';
import { TLocale } from '@/constants/locales';

import styles from './Breadcrumbs.module.scss';
import { IBreadcrumbsProps } from './types';

const Spacer = dynamic(() =>
  import('@/components/Spacer').then((mod) => mod.Spacer),
);

export const Breadcrumbs = ({
  items,
  className,
  separator,
  maxItems = 5,
  showHome = true,
  homeLabel = 'breadcrumbsHomePage',
  size = 'medium',
  variant = 'default',
  hideSpacer = false,
}: IBreadcrumbsProps) => {
  const t = useTranslations();
  const currentLocale = useLocale();

  const defaultSeparator = separator || <ChevronRightIcon size={14} />;

  const allItems = showHome
    ? items
    : items.filter((item) => item.label !== homeLabel);

  const displayItems = React.useMemo(() => {
    if (allItems.length <= maxItems) {
      return allItems;
    }

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
    styles['breadcrumbs-nav'],
    styles[`breadcrumbs--${size}`],
    styles[`breadcrumbs--${variant}`],
    isTruncated && styles['breadcrumbs--truncated'],
    className,
  );

  if (!displayItems.length) return null;
  return (
    <>
      {!hideSpacer && <Spacer size='sm' />}
      <nav aria-label='Breadcrumb' className={clsx(breadcrumbClassNames)}>
        <ol className={clsx(styles.breadcrumbs, styles['breadcrumbs-wrapper'])}>
          {displayItems.map(
            ({ label, href, isActive, shouldTranslate }, index) => {
              const isLast = index === displayItems.length - 1;
              const isActiveItem = isActive || isLast;

              return (
                <li
                  key={index}
                  className={clsx(
                    styles['breadcrumb-item'],
                    index === 0 && styles['breadcrumb-item--first'],
                  )}
                >
                  {href && !isActiveItem ? (
                    <Link
                      href={href[currentLocale as TLocale]}
                      className={styles['breadcrumb-link']}
                      size={size}
                    >
                      {parseHTML(shouldTranslate ? t(label as string) : label)}
                    </Link>
                  ) : (
                    <span
                      className={styles['breadcrumb-current']}
                      aria-current={isActiveItem ? 'page' : undefined}
                    >
                      {parseHTML(shouldTranslate ? t(label as string) : label)}
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
            },
          )}
        </ol>
      </nav>
    </>
  );
};
