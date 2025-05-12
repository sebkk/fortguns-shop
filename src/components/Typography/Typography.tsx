import clsx from 'clsx';
import { HTMLAttributes, ReactNode } from 'react';

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
  | 'subheading'
  | 'c-heading'
  | 'body'
  | 'caption';

type TFontWeight =
  | 'normal' /* 400 */
  | 'medium' /* 500 */
  | 'semibold' /* 600 */
  | 'bold'; /* 700 */

type TFontSize =
  | 'xs' /* 12px */
  | 'sm' /* 14px */
  | 'base' /* 16px */
  | 'xl' /* 20px */
  | '2xl' /* 24px */
  | '3xl' /* 30px */
  | '4xl' /* 36px */
  | '5xl' /* 48px */
  | '6xl'; /* 60px */

type TLineHeight =
  | 'none' /* 1 */
  | 'tight' /* 1.275 */
  | 'normal' /* 1.5 */
  | 'loose' /* 2 */;

const variants: { [key in TVariant]: string } = {
  'main-heading': 'text-6xl leading-tight font-semibold',
  subheading: 'text-4xl leading-tight font-normal',
  'c-heading': 'text-3xl leading-tight font-medium ',
  body: 'text-base leading-tight',
  caption: 'text-sm leading-tight',
};

interface ITypographyProps {
  children?: ReactNode;
  tag?: TTag;
  htmlContent?: string;
  fontWeight?: TFontWeight;
  fontSize?: TFontSize;
  color?: 'primary' | 'secondary' | 'text-dark' | 'text-medium_dark';
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
  lineHeight,
  className,
  whitespacePreLine,
  typographyAdditionalProps = {},
}: ITypographyProps) => {
  const Tag = tag;

  const classNames = clsx(
    variants[variant],
    color && `text-${color}`,
    fontSize && `text-${fontSize}`,
    fontWeight && `font-${fontWeight}`,
    lineHeight && `leading-${lineHeight}`,
    whitespacePreLine && `whitespace-pre-line`,
    className && className,
  );

  if (htmlContent)
    return (
      <Tag
        className={classNames}
        dangerouslySetInnerHTML={{ __html: htmlContent }}
        {...typographyAdditionalProps}
      />
    );
  return (
    <Tag className={classNames} {...typographyAdditionalProps}>
      {children}
    </Tag>
  );
};
