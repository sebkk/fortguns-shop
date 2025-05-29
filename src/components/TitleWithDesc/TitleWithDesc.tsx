import clsx from 'clsx';
import { ReactNode } from 'react';

import type { ITypographyProps } from '@/components/Typography';
import { Typography } from '@/components/Typography';

import styles from './styles.module.scss';

export interface ITitleWithDescProps {
  title?: string;
  description?: string;
  additionalContent?: ReactNode;
  titleProps?: Omit<ITypographyProps, 'children' | 'htmlContent' | 'className'>;
  descProps?: Omit<ITypographyProps, 'children' | 'htmlContent' | 'className'>;
  titleClassName?: string;
  descriptionClassName?: string;
  wrapperClassName?: string;
}

export const TitleWithDesc = ({
  title,
  description,
  additionalContent,
  titleProps,
  descProps,
  titleClassName,
  descriptionClassName,
  wrapperClassName,
}: ITitleWithDescProps) => {
  if (!title && !description && !additionalContent) return null;

  const wrapperClassNames = clsx(
    styles['title-with-desc-wrapper'],
    wrapperClassName,
  );
  const titleClassNames = clsx(titleClassName);

  const descClassNames = clsx(
    styles['title-with-desc-description'],
    descriptionClassName,
  );

  return (
    <div className={wrapperClassNames}>
      {title && (
        <Typography
          tag='h2'
          variant='section-heading'
          fontWeight='semibold'
          {...titleProps}
          htmlContent={title}
          className={titleClassNames}
        />
      )}
      {description && (
        <Typography
          tag='p'
          variant='subtitle'
          {...descProps}
          htmlContent={description}
          className={descClassNames}
        />
      )}
      {additionalContent && additionalContent}
    </div>
  );
};
