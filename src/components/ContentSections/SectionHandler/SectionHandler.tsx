import clsx from 'clsx';

import { THandlerComponentsProps } from '@/types/handlerComponents';
import { TFlexibleContentLayout } from '@/types/sections';

import { handlerComponents } from './handlerComponents';
import styles from './SectionHandler.module.scss';

interface ISectionHandlerProps {
  section: TFlexibleContentLayout;
}

export const SectionHandler = ({ section }: ISectionHandlerProps) => {
  const handlerComponent = handlerComponents[section.acf_fc_layout];

  if (!handlerComponent) return null;

  if (section.acf_fc_layout === 'spacer')
    return handlerComponent({ section } as THandlerComponentsProps);

  const { section_options } = section;
  const { section_layout, section_background } = section_options;

  const sectionClassName = clsx(
    styles[`section-handler_${section_background}`],
  );

  return (
    <section className={sectionClassName}>
      {section_layout === 'container' ? (
        <div
          className={clsx(
            'container',
            section_background !== 'default' &&
              styles['section-handler_full-size-wrapper'],
          )}
        >
          {handlerComponent({
            section,
          } as THandlerComponentsProps)}
        </div>
      ) : (
        handlerComponent({
          section,
        } as THandlerComponentsProps)
      )}
    </section>
  );
};
