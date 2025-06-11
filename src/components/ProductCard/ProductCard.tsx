'use client';

import Image from 'next/image';

import { Button } from '@/components/Button';
import { IProduct } from '@/types/product';

import { Link, useRouter } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';

import { NAVIGATION_ROUTE } from '@/constants/navigation';
import { ProductPrice } from '../ProductPrice/ProductPrice';
import styles from './styles.module.scss';

interface ProductCardProps {
  product: IProduct;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const t = useTranslations();
  const { push } = useRouter();

  const { images, price, sale_price, categories, name, slug, stock_status } =
    product || {};

  const firstImage = images?.[0];
  const categoryName = categories?.[1]?.name || categories?.[0]?.name || '';

  const navigationObj = {
    //@ts-ignore
    pathname: NAVIGATION_ROUTE.PRODUCT_DETAILS,
    params: { productSlug: slug },
  };

  const handleNavigate = () => push(navigationObj);

  return (
    <article className={styles['product-card']}>
      {firstImage && (
        <div className={styles['image-wrapper']}>
          <Image
            src={firstImage.src}
            alt={firstImage.alt || name || 'Product image'}
            width={300}
            height={300}
            className={styles['product-image']}
          />
        </div>
      )}
      <div className={styles['content-wrapper']}>
        <div className={styles['info-section']}>
          <Link href={navigationObj} className={styles['product-name-link']}>
            {name}
          </Link>
          {categoryName && (
            <p className={styles['product-category']}>{categoryName}</p>
          )}
        </div>

        <div className={styles['actions-section']}>
          <ProductPrice
            price={price}
            salePrice={sale_price}
            stockStatus={stock_status}
          />
          <Button
            onClick={handleNavigate}
            className={styles['product-button']}
            size='small'
          >
            {t('showProduct')}
          </Button>
        </div>
      </div>
    </article>
  );
};
