import clsx from 'clsx';
import parseHTML from 'html-react-parser';

import styles from './styles.module.scss';

interface IContentHTMLProps {
  content?: string;
  className?: string;
}

export const ContentHTML = ({ content, className }: IContentHTMLProps) => {
  if (!content) return null;
  return (
    <div className={clsx(styles['content-html'], className)}>
      {parseHTML(content)}
    </div>
  );
};
