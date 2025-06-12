import styles from './icons.module.scss';

export const HamburgerIcon = () => (
  <svg
    width='24'
    height='24'
    viewBox='0 0 24 24'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
    className={styles['hamburger-icon__svg']}
  >
    <path
      className={styles['hamburger-icon__line']}
      d='M3 12H21'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
    <path
      className={styles['hamburger-icon__line']}
      d='M3 6H21'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
    <path
      className={styles['hamburger-icon__line']}
      d='M3 18H21'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  </svg>
);
