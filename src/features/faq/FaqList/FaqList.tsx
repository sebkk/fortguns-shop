'use client';

import { Accordion } from '@/components/Accordion';

import styles from './styles.module.scss';

interface FaqItem {
  question: string;
  answer: string;
}

interface FaqListProps {
  items: FaqItem[];
}

export const FaqList = ({ items }: FaqListProps) => {
  return (
    <div className={styles['accordion-list-container']}>
      {items.map((item, index) => (
        <Accordion key={index} title={item.question} content={item.answer} />
      ))}
    </div>
  );
};
