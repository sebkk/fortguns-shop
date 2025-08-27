import clsx from 'clsx';
import { useTranslations } from 'next-intl';

import { Typography } from '@/components/Typography';

import styles from './Spinner.module.scss';

interface ISpinnerProps {
  showText?: boolean;
  text?: string;
  className?: string;
}

export const Spinner = ({
  showText = false,
  text,
  className,
}: ISpinnerProps) => {
  const t = useTranslations();

  return (
    <div className={clsx(styles['spinner-wrapper'], className)}>
      <div className={styles['spinner']}></div>
      {showText && <Typography>{text || t('searching')}</Typography>}
    </div>
  );
};
