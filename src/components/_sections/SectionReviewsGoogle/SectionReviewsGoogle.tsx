'use client';

import { useTranslations } from 'next-intl';

import { StarIcon } from '@/components/_icons/StarIcon';
import { Link } from '@/components/Link';
import { TitleWithDesc } from '@/components/TitleWithDesc';
import { Typography } from '@/components/Typography';
import { TSectionReviewsGoogleProps } from '@/types/handlerComponents';

import styles from './SectionReviewsGoogle.module.scss';

const MAX_RATING = 5;

const clampRating = (value: number | string | undefined): number => {
  const parsed = Number(value);

  if (Number.isNaN(parsed)) return 0;

  return Math.min(Math.max(parsed, 0), MAX_RATING);
};

const Stars = ({ rating }: { rating: number }) => {
  const fillPercent = (clampRating(rating) / MAX_RATING) * 100;

  return (
    <span
      className={styles['stars']}
      role='img'
      aria-label={`${rating}/${MAX_RATING}`}
    >
      <span className={styles['stars-row']} aria-hidden='true'>
        {Array.from({ length: MAX_RATING }).map((_, index) => (
          <StarIcon key={index} className={styles['star--empty']} />
        ))}
      </span>
      <span
        className={styles['stars-row-filled']}
        style={{ width: `${fillPercent}%` }}
        aria-hidden='true'
      >
        {Array.from({ length: MAX_RATING }).map((_, index) => (
          <StarIcon key={index} className={styles['star--filled']} />
        ))}
      </span>
    </span>
  );
};

export const SectionReviewsGoogle = ({
  section,
}: TSectionReviewsGoogleProps) => {
  const t = useTranslations();

  const {
    title,
    description,
    rating_value,
    reviews_count,
    google_profile_url,
    reviews,
  } = section;

  const ratingValue = clampRating(rating_value);
  const reviewsCount = Number(reviews_count) || 0;

  if (!reviews?.length) return null;

  return (
    <div className={styles['reviews-section']}>
      <TitleWithDesc title={title} description={description} />

      <div className={styles['reviews-summary']}>
        <div className={styles['reviews-summary-rating']}>
          <Typography
            tag='span'
            className={styles['reviews-summary-rating-value']}
          >
            {ratingValue.toFixed(1).replace('.', ',')}
          </Typography>
          <div>
            <Stars rating={ratingValue} />
            {reviewsCount > 0 && (
              <Typography
                tag='p'
                className={styles['reviews-summary-rating-count']}
              >
                {t('reviewsBasedOn', { count: reviewsCount })}
              </Typography>
            )}
          </div>
        </div>

        {google_profile_url && (
          <Link
            href={google_profile_url}
            nativeLink
            className={styles['reviews-summary-link']}
            anchorProps={{ target: '_blank', rel: 'noopener noreferrer' }}
          >
            {t('reviewsSeeAllOnGoogle')}
          </Link>
        )}
      </div>

      <ul className={styles['reviews-grid']}>
        {reviews.map(({ author, rating, date_label, content }, index) => (
          <li key={`${author}-${index}`} className={styles['review-card']}>
            <div className={styles['review-card-header']}>
              <Stars rating={clampRating(rating)} />
              <Typography tag='span' className={styles['review-card-source']}>
                {t('reviewsFromGoogle')}
              </Typography>
            </div>
            <Typography tag='p' className={styles['review-card-content']}>
              {content}
            </Typography>
            <div className={styles['review-card-footer']}>
              <Typography tag='span' className={styles['review-card-author']}>
                {author}
              </Typography>
              {date_label && (
                <Typography tag='span' className={styles['review-card-date']}>
                  {date_label}
                </Typography>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
