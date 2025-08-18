import { useTranslations } from 'next-intl';

import { ProductsCarousel } from '@/components/_carousels/ProductsCarousel';
import { ArrowIcon } from '@/components/_icons/ArrowIcon';
import { Link } from '@/components/Link';
import { SectionWrapper } from '@/components/SectionWrapper';
import { NAVIGATION_ROUTE } from '@/constants/navigation';
import { TSectionProductsCarouselProps } from '@/types/handlerComponents';

import styles from './SectionProductsCarousel.module.scss';

export const SectionProductsCarousel = ({
  section,
}: TSectionProductsCarouselProps) => {
  const { title, products, show_listing_link } = section;

  const t = useTranslations();

  return (
    <SectionWrapper
      sectionHeadingProps={{
        title,
        additionalContent: show_listing_link && (
          <Link
            href={NAVIGATION_ROUTE.PRODUCTS_LISTING}
            trailingIcon={
              <ArrowIcon
                className={styles['section-products-carousel_link-icon']}
              />
            }
          >
            {t('showProducts')}
          </Link>
        ),
      }}
    >
      <ProductsCarousel
        swiperConfig={{
          loop: true,
        }}
        items={products}
      />
    </SectionWrapper>
  );
};
