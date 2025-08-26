'use client';

import dynamic from 'next/dynamic';
import Image, { ImageProps } from 'next/image';

import { useTranslations } from 'next-intl';

import { Button } from '@/components/Button';
import { Link } from '@/components/Link';
import { ProductCategories } from '@/components/ProductCategories';
import { ProductPrice } from '@/components/ProductPrice';
import { NAVIGATION_ROUTE } from '@/constants/navigation';
import { useAppRouter } from '@/hooks/useAppRouter';
import { IProduct, STOCK_STATUS } from '@/types/product';

import styles from './styles.module.scss';

const Label = dynamic(() =>
  import('@/components/Label').then((mod) => mod.Label),
);

interface IProductCardProps {
  product: IProduct;
  imageProps?: Omit<ImageProps, 'src' | 'alt' | 'width' | 'height'>;
}

export const ProductCard = ({
  product,
  imageProps = {},
}: IProductCardProps) => {
  const t = useTranslations();
  const { push } = useAppRouter();

  const {
    images,
    regular_price,
    sale_price,
    categories,
    name,
    slug,
    stock_status,
  } = product || {};

  const isPromotion =
    sale_price &&
    stock_status === STOCK_STATUS.INSTOCK &&
    sale_price < regular_price;

  const firstImage = images?.[0];

  const navigationObj = {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    pathname: NAVIGATION_ROUTE.PRODUCT_DETAILS,
    params: { productSlug: slug },
  };

  const handleNavigate = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();

    push(navigationObj);
  };

  return (
    <article className={styles['product-card']}>
      <Link className={styles['product-card-link']} href={navigationObj}>
        {isPromotion && (
          <div className={styles['product-card-promotion']}>
            <Label color='error'>{t('promotion')}</Label>
          </div>
        )}
        {firstImage && (
          <div className={styles['image-wrapper']}>
            <Image
              src={firstImage.src}
              alt={firstImage.alt || name || 'Product image'}
              width={300}
              height={300}
              className={styles['product-image']}
              placeholder='blur'
              blurDataURL={firstImage.src}
              {...imageProps}
            />
          </div>
        )}
        <div className={styles['content-wrapper']}>
          <div className={styles['info-section']}>
            <h5 className={styles['product-name-link']}>{name}</h5>
            <ProductCategories
              categories={categories}
              size='small'
              classNameWrapper={styles['product-categories']}
            />
          </div>

          <div className={styles['actions-section']}>
            <ProductPrice
              price={regular_price}
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
      </Link>
    </article>
  );
};
