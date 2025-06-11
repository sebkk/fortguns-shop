import parseHTML from 'html-react-parser';
import styles from './styles.module.scss';
interface IContentHTMLProps {
  content?: string;
}

export const ContentHTML = ({ content }: IContentHTMLProps) => {
  if (!content) return null;
  return <div className={styles['content-html']}>{parseHTML(content)}</div>;
};
