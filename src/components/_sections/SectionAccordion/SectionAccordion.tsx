import { Accordion } from '@/components/Accordion';
import { Typography } from '@/components/Typography';
import { globalinfos } from '@/constants/api/global-infos';
import { ISectionAccordion } from '@/types/sections';

import styles from './SectionAccordion.styles.module.scss';

interface ISectionAccordionProps {
  section: ISectionAccordion;
}

const getQuestionsLabel = (count: number) => {
  if (count === 1) return '1 pytanie';

  const lastDigit = count % 10;
  const lastTwo = count % 100;
  const isFew =
    lastDigit >= 2 && lastDigit <= 4 && !(lastTwo >= 12 && lastTwo <= 14);

  return `${count} ${isFew ? 'pytania' : 'pytań'}`;
};

export const SectionAccordion = ({ section }: ISectionAccordionProps) => {
  const { list } = section || {};

  const phone = globalinfos.contact_infos.find(({ type }) => type === 'phone');

  return (
    <>
      {list.length > 1 && (
        <ul className={styles['faq-nav']}>
          {list.map((item) => (
            <li key={item.typeId}>
              <a className={styles['faq-nav-link']} href={`#${item.typeId}`}>
                {item.title}
                <span className={styles['faq-nav-count']}>
                  {item.list.length}
                </span>
              </a>
            </li>
          ))}
        </ul>
      )}

      <ul>
        {list.map((item) => (
          <li
            className={styles['section-accordion-item']}
            id={item.typeId}
            key={item.typeId}
          >
            <div className={styles['section-accordion-item-head']}>
              <Typography
                className={styles['section-accordion-item-title']}
                fontSize='2xl'
                fontWeight='semibold'
                tag='h3'
              >
                {item.title}
              </Typography>
              <span className={styles['section-accordion-item-count']}>
                {getQuestionsLabel(item.list.length)}
              </span>
            </div>
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

      {phone && (
        <div className={styles['faq-cta']}>
          <div className={styles['faq-cta-copy']}>
            <Typography
              className={styles['faq-cta-title']}
              fontSize='xl'
              fontWeight='semibold'
              tag='h3'
            >
              Nie znalazłeś odpowiedzi?
            </Typography>
            <Typography className={styles['faq-cta-text']} tag='p'>
              Zadzwoń — doradzimy przy wyborze, sprawdzimy dostępność i umówimy
              przestrzelanie.
            </Typography>
          </div>
          <a
            className={styles['faq-cta-link']}
            href={`tel:${phone.href.replace(/\s/g, '')}`}
          >
            {phone.label}
          </a>
        </div>
      )}
    </>
  );
};
