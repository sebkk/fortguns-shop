import clsx from 'clsx';
import Image from 'next/image';

import { ProductPrice } from '@/components/ProductPrice';
import { TitleWithDesc } from '@/components/TitleWithDesc';
import { IProduct } from '@/types/product';

import { ProductCategories } from '@/components/ProductCategories';

import styles from './styles.module.scss';

interface IProductMainSectionProps {
  product: IProduct;
}

export const ProductMainSection = ({ product }: IProductMainSectionProps) => {
  const { name, price, sale_price, images, stock_status, categories } =
    product || {};

  console.log(product);

  return (
    <div className={styles['product-main-section']}>
      <div className={styles['product-title-image-wrapper']}>
        <TitleWithDesc
          titleClassName={clsx(
            styles['product-title-wrapper'],
            styles['product-title-wrapper--top'],
          )}
          title={name}
          titleProps={{ tag: 'h1' }}
        />
        <Image
          src={images[0].src}
          alt={images[0].src}
          width={300}
          height={300}
          className={styles['product-image']}
        />
      </div>
      <div>
        <TitleWithDesc
          titleClassName={clsx(
            styles['product-title-wrapper'],
            styles['product-title-wrapper--bottom'],
          )}
          title={name}
          titleProps={{ tag: 'h1' }}
        />
        <ProductCategories
          categories={categories}
          classNameWrapper={styles['product-categories-wrapper']}
          asLink
        />
        <ProductPrice
          className={styles['product-details-price']}
          salePrice={sale_price}
          price={price}
          stockStatus={stock_status}
        />
      </div>
    </div>
  );
};
