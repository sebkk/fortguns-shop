import Image from 'next/image';

import clsx from 'clsx';

import { Link } from '@/components/Link';
import { ProductCategories } from '@/components/ProductCategories';
import { ProductPrice } from '@/components/ProductPrice';
import { Typography } from '@/components/Typography';
import { NAVIGATION_ROUTE } from '@/constants/navigation';
import { IProductSearch } from '@/types/product';

import styles from './ProductItem.module.scss';

interface ProductItemProps {
  product: IProductSearch;
  optionIndex?: number;
  isActive?: boolean;
}

export const ProductItem = ({
  product,
  optionIndex,
  isActive = false,
}: ProductItemProps) => {
  const {
    slug,
    images,
    name,
    categories,
    regular_price,
    sale_price,
    stock_status,
  } = product || {};

  const [picture] = images || [];

  return (
    <li
      className={clsx(
        styles['product-item'],
        isActive && styles['product-item--active'],
      )}
      id={
        optionIndex === undefined ? undefined : `search-option-${optionIndex}`
      }
      role='option'
      aria-selected={isActive}
    >
      <Link
        href={{
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          pathname: NAVIGATION_ROUTE.PRODUCT_DETAILS,
          params: {
            productSlug: slug,
          },
        }}
        className={styles['product-item-link']}
      >
        <Image
          src={picture.src}
          alt={picture.alt}
          width={70}
          height={50}
          className={styles['product-item-image']}
          unoptimized
          placeholder='blur'
          blurDataURL={picture.src}
        />
        <div className={styles['product-item-content']}>
          <Typography
            tag='h5'
            fontSize='xs'
            className={styles['product-item-content-title']}
          >
            {name}
          </Typography>
          <ProductCategories
            showFirstCategory
            categories={categories}
            size='x-small'
          />
        </div>
        <ProductPrice
          price={regular_price}
          salePrice={sale_price}
          stockStatus={stock_status}
          size='x-small'
          wrapperClassName={styles['product-item-price']}
        />
      </Link>
    </li>
  );
};
