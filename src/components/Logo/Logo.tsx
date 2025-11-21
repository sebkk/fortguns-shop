import Image, { ImageProps } from 'next/image';

import fortGunsLogo from '../../../public/pictures/fortguns-logo.png';

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
      src={fortGunsLogo}
      alt='Fortguns'
      title='Fortguns'
      width={600}
      height={200}
      className={className}
      blurDataURL={fortGunsLogo.src}
      placeholder='blur'
      quality={100}
      unoptimized
      {...imageProps}
    />
  );
};
