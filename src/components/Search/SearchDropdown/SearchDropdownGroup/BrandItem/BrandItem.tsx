import parseHTML from 'html-react-parser';

import { Card } from '@/components/Card';
import { Link } from '@/components/Link';
import { Typography } from '@/components/Typography';
import { NAVIGATION_ROUTE } from '@/constants/navigation';
import { IBrand } from '@/types/brands';

import styles from './BrandItem.module.scss';

interface BrandItemProps {
  brand: IBrand;
}

export const BrandItem = ({ brand }: BrandItemProps) => {
  const { name, slug, count } = brand || {};

  return (
    <Card
      tag='li'
      withShadow
      withBorder
      isRounded
      className={styles['brand-item-card']}
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
