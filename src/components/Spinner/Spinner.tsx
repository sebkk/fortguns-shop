import { useTranslations } from 'next-intl';

import styles from './Spinner.module.scss';

interface ISpinnerProps {
  showText?: boolean;
  text?: string;
}

export const Spinner = ({ showText = false, text }: ISpinnerProps) => {
  const t = useTranslations();

  return (
    <div className={styles['spinner-wrapper']}>
      <div className={styles['spinner']}></div>
      {showText && <span>{text || t('searching')}</span>}
    </div>
  );
};
