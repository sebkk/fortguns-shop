import clsx from 'clsx';

interface ArrowIconProps {
  className?: string;
  strokeWidth?: number;
}

export const ArrowIcon = ({ className, strokeWidth = 2 }: ArrowIconProps) => {
  return (
    <svg
      className={clsx(
        'ml-2 h-6 w-6 transform transition-transform duration-300',
        className,
      )}
      xmlns='http://www.w3.org/2000/svg'
      fill='none'
      viewBox='0 0 24 24'
      stroke='currentColor'
    >
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth={strokeWidth}
        d='M19 9l-7 7-7-7'
      />
    </svg>
  );
};
