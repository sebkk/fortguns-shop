import clsx from 'clsx';

interface ISpacerProps {
  size?: 'sm' | 'md' | 'default' | 'lg' | 'xl';
}

const sizes = {
  sm: 'my-2',
  md: 'my-4',
  default: 'my-6',
  lg: 'my-10',
  xl: 'my-12',
};

export const Spacer = ({ size = 'default' }: ISpacerProps) => (
  <hr className={clsx(sizes[size as keyof typeof sizes], 'border-none')} />
);
