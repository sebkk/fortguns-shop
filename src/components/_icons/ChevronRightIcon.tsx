interface IChevronRightIconProps {
  className?: string;
  size?: number;
}

export const ChevronRightIcon = ({
  className,
  size = 16,
}: IChevronRightIconProps) => (
  <svg
    width={size}
    height={size}
    viewBox='0 0 24 24'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
    className={className}
  >
    <path
      d='M9 18L15 12L9 6'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  </svg>
);
