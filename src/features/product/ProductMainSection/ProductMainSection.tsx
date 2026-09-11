'use client';

import clsx from 'clsx';
import { useTranslations } from 'next-intl';

import { Card } from '@/components/Card';
import { GalleryWithModal } from '@/components/GalleryWithModal';
import { Link } from '@/components/Link';
import ObfuscatedEmail from '@/components/ObfuscatedEmail';
import { ProductCategories } from '@/components/ProductCategories';
import { ProductPrice } from '@/components/ProductPrice';
import { TitleWithDesc } from '@/components/TitleWithDesc';
import { Typography } from '@/components/Typography';
import globalInfos from '@/constants/api/global-infos';
import { NAVIGATION_ROUTE } from '@/constants/navigation';
import { getContactInfoIcon, getLinkHref } from '@/helpers/links';
import { TLinkHref } from '@/types/footer';
import { IProductDetails } from '@/types/product';

import styles from './styles.module.scss';

interface IProductMainSectionProps {
  product: IProductDetails;
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
    brands,
    id,
  } = product || {};

  const brand = brands?.[0];

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
        <GalleryWithModal
          galleryCarouselProps={{
            images: images.map(({ id, src, alt, srcset }, index) => ({
              id,
              url: src,
              srcset,
              // Galeria pokazuje ten sam egzemplarz z kilku stron, ale opis ma
              // w WordPressie zwykle tylko pierwsze zdjęcie — pozostałe szły do
              // przeglądarki z pustym alt, czyli bez żadnej informacji dla
              // czytnika ekranu i dla Grafiki Google. Prawdziwy opis, jeśli
              // istnieje, zawsze wygrywa.
              alt:
                alt?.trim() ||
                `${name} — zdjęcie ${index + 1} z ${images.length}`,
            })),
            swiperWrapperClassName: styles['product-gallery'],
            swiperThumbsConfig: {
              breakpoints: {
                550: {
                  slidesPerView: 4,
                  slidesPerGroup: 4,
                },
                860: {
                  slidesPerView: 5,
                  slidesPerGroup: 5,
                },
                1024: {
                  slidesPerView: 3,
                  slidesPerGroup: 3,
                },
                1200: {
                  slidesPerView: 5,
                  slidesPerGroup: 5,
                },
              },
            },
          }}
          modalProps={{
            modalTitle: name,
          }}
          showModalWithGallery
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
        {brand && (
          <p className={styles['product-brand']}>
            {t('productBrand')}:{' '}
            <Link
              href={{
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                pathname: NAVIGATION_ROUTE.BRAND_LISTING,
                params: { brandSlug: brand.slug },
              }}
            >
              {brand.name}
            </Link>
          </p>
        )}
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
          variant='primary'
        >
          <Typography fontSize='xl'>{t('contactForWeapon')}</Typography>
          <div className={styles['product-contact-wrapper_links']}>
            <ObfuscatedEmail
              className={styles['product-contact-wrapper_link']}
              // Goły adres, nie gotowy odnośnik: mailto składa sam komponent,
              // doklejając temat z nazwą i numerem egzemplarza. Podanie mu
              // gotowego mailto dawało adres zaczynający się od "mailto:mailto:",
              // którego program pocztowy nie otwierał.
              email={email?.href as string}
              productName={name}
              productId={id.toString()}
            >
              {getContactInfoIcon(email?.type as string)}
              {email?.label}
            </ObfuscatedEmail>
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
