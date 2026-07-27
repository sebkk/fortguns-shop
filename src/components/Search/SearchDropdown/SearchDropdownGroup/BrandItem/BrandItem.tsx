import clsx from 'clsx';
import parseHTML from 'html-react-parser';

import { Card } from '@/components/Card';
import { Link } from '@/components/Link';
import { Typography } from '@/components/Typography';
import { NAVIGATION_ROUTE } from '@/constants/navigation';
import { IBrand } from '@/types/brands';

import styles from './BrandItem.module.scss';

interface BrandItemProps {
  brand: IBrand;
  optionIndex?: number;
  isActive?: boolean;
}

export const BrandItem = ({
  brand,
  optionIndex,
  isActive = false,
}: BrandItemProps) => {
  const { name, slug, count } = brand || {};

  return (
    <Card
      tag='li'
      withShadow
      withBorder
      isRounded
      className={clsx(
        styles['brand-item-card'],
        isActive && styles['brand-item-card--active'],
      )}
      elementProps={{
        id:
          optionIndex === undefined
            ? undefined
            : `search-option-${optionIndex}`,
        role: 'option',
        'aria-selected': isActive,
      }}
    >
      <Link
        href={{
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          pathname: NAVIGATION_ROUTE.BRAND_LISTING,
          params: { brandSlug: parseHTML(slug) },
        }}
        className={styles['brand-item']}
      >
        <Typography fontWeight='bold' fontSize='xxs'>
          {parseHTML(name)}
        </Typography>
        <Typography
          tag='span'
          color='text-medium_dark'
          fontWeight='medium'
          fontSize='xxs'
        >
          ({count})
        </Typography>
      </Link>
    </Card>
  );
};
