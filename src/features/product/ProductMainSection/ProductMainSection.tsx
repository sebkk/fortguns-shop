'use client';

import clsx from 'clsx';
import { useTranslations } from 'next-intl';

import { GalleryCarousel } from '@/components/_carousels/GalleryCarousel';
import { Card } from '@/components/Card';
import { ProductCategories } from '@/components/ProductCategories';
import { ProductPrice } from '@/components/ProductPrice';
import { TitleWithDesc } from '@/components/TitleWithDesc';
import { Typography } from '@/components/Typography';
import globalInfos from '@/constants/api/global-infos';
import { createMailToQuery } from '@/helpers/createMailToQuery';
import { getContactInfoIcon, getLinkHref } from '@/helpers/links';
import { TLinkHref } from '@/types/footer';
import { IProduct } from '@/types/product';

import styles from './styles.module.scss';

interface IProductMainSectionProps {
  product: IProduct;
}

export const ProductMainSection = ({ product }: IProductMainSectionProps) => {
  const t = useTranslations();

  const {
    name,
    regular_price,
    sale_price,
    images,
    stock_status,
    categories,
    id,
  } = product || {};

  const phone = globalInfos.contact_infos.find(({ type }) => type === 'phone');
  const email = globalInfos.contact_infos.find(({ type }) => type === 'mail');

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
        <GalleryCarousel
          images={images.map(({ id, src, alt }) => ({ id, url: src, alt }))}
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
          wrapperClassName={styles['product-details-price']}
          salePrice={sale_price}
          price={regular_price}
          stockStatus={stock_status}
          size='large'
        />
        <Card
          className={styles['product-contact-wrapper']}
          withBorder
          isRounded
          variant='secondary'
        >
          <Typography fontSize='xl'>{t('contactForWeapon')}</Typography>
          <div className={styles['product-contact-wrapper_links']}>
            <a
              className={styles['product-contact-wrapper_link']}
              href={createMailToQuery(
                email?.href as string,
                name,
                id.toString(),
              )}
            >
              {getContactInfoIcon(email?.type as string)}
              {email?.label}
            </a>
            <a
              className={styles['product-contact-wrapper_link']}
              href={getLinkHref(
                phone?.href as string,
                phone?.type as TLinkHref,
              )}
            >
              {getContactInfoIcon(phone?.type as string)}
              {phone?.label}
            </a>
          </div>
        </Card>
      </div>
    </div>
  );
};
