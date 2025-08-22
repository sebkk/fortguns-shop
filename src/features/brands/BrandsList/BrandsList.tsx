import Link from 'next/link';

import parseHTML from 'html-react-parser';

import { Card } from '@/components/Card';
import { Typography } from '@/components/Typography';
import { IBrand } from '@/types/brands';

import styles from './BrandsList.module.scss';

interface IBrandsListProps {
  brands: IBrand[];
}

export const BrandsList = ({ brands }: IBrandsListProps) => {
  return (
    <div className='container'>
      <ul className={styles['brands-list']}>
        {brands.map(({ id, slug, name, count }) => (
          <Card
            tag='li'
            isRounded
            withShadow
            key={id}
            className={styles['brands-list__item']}
          >
            <Link
              className={styles['brands-list__item-link']}
              href={`/brands/${slug}`}
            >
              {parseHTML(name)}
              <Typography
                tag='span'
                variant='caption'
                className={styles['brands-list__item-count']}
                color='text-medium_dark'
              >
                {count}
              </Typography>
            </Link>
          </Card>
        ))}
      </ul>
    </div>
  );
};
