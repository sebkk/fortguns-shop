import { Accordion } from '@/components/Accordion';
import { Typography } from '@/components/Typography';
import { ISectionAccordion } from '@/types/sections';

import styles from './SectionAccordion.styles.module.scss';

interface ISectionAccordionProps {
  section: ISectionAccordion;
}

export const SectionAccordion = ({ section }: ISectionAccordionProps) => {
  const { list } = section || {};

  return (
    <ul>
      {list.map((item, index) => (
        <li className={styles['section-accordion-item']} key={item.typeId}>
          <Typography
            className={styles['section-accordion-item-title']}
            fontSize='2xl'
            fontWeight='semibold'
            tag='h3'
          >
            {index + 1}. {item.title}
          </Typography>
          <ul className={styles['section-accordion-item-list']}>
            {item.list.map((accordionItem, index) => (
              <li key={index}>
                <Accordion
                  title={accordionItem.title}
                  content={accordionItem.description}
                />
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ul>
  );
};
