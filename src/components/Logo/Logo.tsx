import Image, { ImageProps } from 'next/image';

interface ILogoProps {
  className?: string;
  imageProps: Omit<ImageProps, 'src' | 'alt'>;
}

export const Logo = ({
  className,
  imageProps = {} as ILogoProps['imageProps'],
}: ILogoProps) => {
  return (
    <Image
      src='https://fortguns.pl/wp-content/uploads/2024/09/cropped-logo-transparent-600x200.png.webp'
      alt='Fortguns'
      width={600}
      height={200}
      className={className}
      {...imageProps}
    />
  );
};
