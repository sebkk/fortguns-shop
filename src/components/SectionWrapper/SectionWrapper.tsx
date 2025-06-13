import { ReactNode } from 'react';

import clsx from 'clsx';

import { ITitleWithDescProps, TitleWithDesc } from '@/components/TitleWithDesc';

import styles from './styles.module.scss';

interface ISectionWrapperProps {
  sectionHeadingProps?: ITitleWithDescProps;
  sectionClassName?: string;
  children: ReactNode;
  withPadding?: boolean;
  background?: 'light';
  hidePaddingOnSection?: boolean;
}

export const SectionWrapper = ({
  sectionHeadingProps = {},
  sectionClassName,
  children,
  withPadding,
  background,
  hidePaddingOnSection,
}: ISectionWrapperProps) => {
  return (
    <div
      className={clsx(
        styles['section-container'],
        background && styles[`section-container--bg-${background}`],
        withPadding && styles['section-container--with-padding'],
      )}
    >
      <section
        className={clsx(
          styles['section'],
          sectionClassName,
          !hidePaddingOnSection && styles['section--hide-padding'],
        )}
      >
        <TitleWithDesc
          {...sectionHeadingProps}
          wrapperClassName={clsx(
            styles['section-wrapper-title-desc-wrapper'],
            sectionHeadingProps?.wrapperClassName,
          )}
        />
        {children}
      </section>
    </div>
  );
};
