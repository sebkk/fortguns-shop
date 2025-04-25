import { TButtonColor, TButtonSize, TButtonVariant } from './types';

export const insertButtonSize = (size: TButtonSize) =>
  ({
    large: 'px-5 py-3 text-2xl',
    medium: 'px-3 py-2 text-xl',
    small: 'px-2 py-1 text-lg',
  })[size];

export const createButtonVariantWithColor = (
  variant: TButtonVariant,
  color: TButtonColor,
) => {
  let classes = '';
  let hover = '';
  let active = '';

  if (variant === 'filled') {
    if (color === 'primary') {
      hover = `hover:bg-primary-dark`;
      active = `active:bg-primary-light`;

      classes = `bg-primary text-white border border-primary-dark`;
    }

    if (color === 'secondary') {
      hover = `hover:bg-secondary-dark`;
      active = `active:bg-secondary-light`;

      classes = `bg-secondary text-white border border-secondary-dark`;
    }
  }

  if (variant === 'outlined') {
    if (color === 'primary') {
      hover = `hover:border-primary-dark hover:text-primary-dark`;
      active = `active:border-primary active:text-primary-light`;

      classes = `border-2 border-primary-light text-white`;
    }

    if (color === 'secondary') {
      hover = `hover:border-secondary-dark hover:text-secondary-dark`;
      active = `active:border-secondary active:text-secondary-light`;

      classes = `border-2 border-secondary-light text-white`;
    }
  }

  if (variant === 'blank') {
    if (color === 'primary') {
      hover = `hover:text-primary-dark`;
      active = `active:text-primary-light`;

      classes = `text-white`;
    }

    if (color === 'secondary') {
      hover = `hover:text-secondary-dark`;
      active = `active:text-secondary-light`;

      classes = `text-white`;
    }
  }

  return `${classes} ${hover} ${active}`;
};

export const insertButtonVariantWithColor = ['primary', 'secondary'].reduce(
  (acc, color) => {
    ['filled', 'outlined', 'blank'].forEach((variant) => {
      acc[`${variant}-${color}`] = createButtonVariantWithColor(
        variant as TButtonVariant,
        color as TButtonColor,
      );
    });

    return acc;
  },
  {} as { [key: string]: string },
);

export const buttonVariants = {
  'filled-primary': createButtonVariantWithColor('filled', 'primary'),
  'filled-secondary': createButtonVariantWithColor('filled', 'secondary'),
  'outlined-primary': createButtonVariantWithColor('outlined', 'primary'),
  'outlined-secondary': createButtonVariantWithColor('filled', 'secondary'),
  'blank-primary': createButtonVariantWithColor('blank', 'primary'),
  'blank-secondary': createButtonVariantWithColor('filled', 'secondary'),
};
