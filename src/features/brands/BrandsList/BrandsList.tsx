import clsx from 'clsx';
import parseHTML from 'html-react-parser';

import { Card } from '@/components/Card';
import { Link } from '@/components/Link';
import { Typography } from '@/components/Typography';
import { NAVIGATION_ROUTE } from '@/constants/navigation';
import { IGroupedBrands } from '@/types/brands';

import styles from './BrandsList.module.scss';

interface IBrandsListProps {
  groupedBrands: IGroupedBrands[];
}

export const BrandsList = ({ groupedBrands }: IBrandsListProps) => {
  return (
    <div className='container'>
      <ul>
        {groupedBrands.map(({ letter, brands }) => (
          <li key={letter} className={styles['brands-group']}>
            <Typography
              tag='h2'
              variant='subheading'
              className={styles['brands-group__letter']}
            >
              {letter}
            </Typography>
            <ul className={styles['brands-list']}>
              {brands.map(({ id, slug, name, count }) => (
                <Card
                  tag='li'
                  isRounded
                  withShadow
                  key={id}
                  className={clsx(
                    styles['brands-list__item'],
                    !(count > 0) && styles['brands-list__item--disabled'],
                  )}
                  withBorder={count > 0}
                >
                  <Link
                    className={clsx(styles['brands-list__item-link'])}
                    href={{
                      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                      // @ts-ignore
                      pathname: NAVIGATION_ROUTE.BRAND_LISTING,
                      params: { brandSlug: parseHTML(slug) },
                    }}
                  >
                    {parseHTML(name)}
                    {/* <Typography
                      tag='span'
                      variant='caption'
                      className={styles['brands-list__item-count']}
                      color='text-medium_dark'
                    >
                      {count}
                    </Typography> */}
                  </Link>
                </Card>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};
