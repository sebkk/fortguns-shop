import { ITitleWithDescProps, TitleWithDesc } from '@/components/TitleWithDesc';
import clsx from 'clsx';
import { ReactNode } from 'react';

import styles from './styles.module.scss';

interface ISectionWrapperProps {
  sectionHeadingProps?: ITitleWithDescProps;
  sectionClassName?: string;
  children: ReactNode;
  withPadding?: boolean;
  background?: 'light';
}

export const SectionWrapper = ({
  sectionHeadingProps = {},
  sectionClassName,
  children,
  withPadding,
  background,
}: ISectionWrapperProps) => {
  return (
    <div
      className={clsx(
        styles['section-wrapper'],
        styles[`section-wrapper--bg-${background}`],
        withPadding && styles['section-wrapper--with-padding'],
        sectionClassName,
      )}
    >
      <section className={styles['section-wrapper-container']}>
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
