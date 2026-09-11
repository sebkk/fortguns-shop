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
              {brands.map(({ id, slug, name, count }) => {
                const hasProducts = count > 0;

                const label = (
                  <>
                    {parseHTML(name)}
                    <Typography
                      tag='span'
                      variant='caption'
                      className={styles['brands-list__item-count']}
                      color='text-medium_dark'
                    >
                      {count}
                    </Typography>
                  </>
                );

                return (
                  <Card
                    tag='li'
                    isRounded
                    withShadow
                    key={id}
                    className={clsx(
                      styles['brands-list__item'],
                      !hasProducts && styles['brands-list__item--disabled'],
                    )}
                    withBorder={hasProducts}
                  >
                    {hasProducts ? (
                      <Link
                        className={clsx(styles['brands-list__item-link'])}
                        href={{
                          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                          // @ts-ignore
                          pathname: NAVIGATION_ROUTE.BRAND_LISTING,
                          params: { brandSlug: parseHTML(slug) },
                        }}
                      >
                        {label}
                      </Link>
                    ) : (
                      // Marka bez towaru zostaje widoczna, bo mówi klientowi, co
                      // bywa w ofercie — ale przestaje być odnośnikiem. Prowadził
                      // on na stronę z komunikatem „Brak produktów", a takich
                      // pustych stron jest tu kilkadziesiąt.
                      <span className={clsx(styles['brands-list__item-link'])}>
                        {label}
                      </span>
                    )}
                  </Card>
                );
              })}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};
