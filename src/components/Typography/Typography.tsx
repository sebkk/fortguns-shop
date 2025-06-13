'use client';

import { HTMLAttributes, ReactNode } from 'react';

import clsx from 'clsx';
import parseHTML from 'html-react-parser';

import styles from './styles.module.scss';

type TTag =
  | 'p'
  | 'span'
  | 'div'
  | 'strong'
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6';

type TVariant =
  | 'main-heading'
  | 'section-heading'
  | 'subheading'
  | 'c-heading'
  | 'body'
  | 'caption'
  | 'subtitle';

type TFontWeight = 'normal' | 'medium' | 'semibold' | 'bold';

type TFontSize =
  | 'xs'
  | 'sm'
  | 'base'
  | 'xl'
  | '2xl'
  | '3xl'
  | '4xl'
  | '5xl'
  | '6xl';

type TColor = 'primary' | 'secondary' | 'text-dark' | 'text-medium_dark';

type TLineHeight = 'none' | 'tight' | 'normal' | 'loose';

const variantMap: { [_key in TVariant]: string } = {
  'main-heading': styles['variant-main-heading'],
  subheading: styles['variant-subheading'],
  'c-heading': styles['variant-c-heading'],
  body: styles['variant-body'],
  caption: styles['variant-caption'],
  'section-heading': styles['variant-section-heading'],
  subtitle: styles['variant-subtitle'],
};

const colorMap: { [_key in TColor]: string } = {
  primary: styles['color-primary'],
  secondary: styles['color-secondary'],
  'text-dark': styles['color-text-dark'],
  'text-medium_dark': styles['color-text-medium-dark'],
};

const fontSizeMap: { [_key in TFontSize]: string } = {
  xs: styles['font-size-xs'],
  sm: styles['font-size-sm'],
  base: styles['font-size-base'],
  xl: styles['font-size-xl'],
  '2xl': styles['font-size-2xl'],
  '3xl': styles['font-size-3xl'],
  '4xl': styles['font-size-4xl'],
  '5xl': styles['font-size-5xl'],
  '6xl': styles['font-size-6xl'],
};

const fontWeightMap: { [_key in TFontWeight]: string } = {
  normal: styles['font-weight-normal'],
  medium: styles['font-weight-medium'],
  semibold: styles['font-weight-semibold'],
  bold: styles['font-weight-bold'],
};

const lineHeightMap: { [_key in TLineHeight]: string } = {
  none: styles['line-height-none'],
  tight: styles['line-height-tight'],
  normal: styles['line-height-normal'],
  loose: styles['line-height-loose'],
};

export interface ITypographyProps {
  children?: ReactNode;
  tag?: TTag;
  htmlContent?: string;
  fontWeight?: TFontWeight;
  fontSize?: TFontSize;
  color?: TColor;
  lineHeight?: TLineHeight;
  variant?: TVariant;
  className?: string;
  whitespacePreLine?: boolean;
  typographyAdditionalProps?: HTMLAttributes<HTMLDivElement>;
}

export const Typography = ({
  children,
  tag = 'div',
  htmlContent,
  color,
  variant = 'body',
  fontSize,
  fontWeight,
  lineHeight = 'tight',
  className,
  whitespacePreLine,
  typographyAdditionalProps = {},
}: ITypographyProps) => {
  const Tag = tag;

  const classNames = clsx(
    variantMap[variant],
    color && colorMap[color],
    fontSize && fontSizeMap[fontSize],
    fontWeight && fontWeightMap[fontWeight],
    lineHeight && lineHeightMap[lineHeight],
    whitespacePreLine && styles['whitespace-pre-line'],
    className,
  );

  if (htmlContent) {
    return (
      <Tag className={classNames} {...typographyAdditionalProps}>
        {parseHTML(htmlContent)}
      </Tag>
    );
  }
  return (
    <Tag className={classNames} {...typographyAdditionalProps}>
      {children}
    </Tag>
  );
};
