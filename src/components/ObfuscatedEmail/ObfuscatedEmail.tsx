'use client';

import { useEffect, useState } from 'react';

import { createMailToQuery } from '@/helpers/createMailToQuery';
import { deobfuscateEmail, obfuscateEmail } from '@/helpers/emailObfuscation';

import { ILinkProps, Link } from '../Link';
import styles from './styles.module.scss';

interface IObfuscatedEmailProps {
  email: string;
  className?: string;
  productName?: string;
  productId?: string;
  linkProps?: Omit<ILinkProps, 'href' | 'children'>;
  children: React.ReactNode;
}

export const ObfuscatedEmail = ({
  email,
  children,
  className,
  productName,
  productId,
  linkProps,
}: IObfuscatedEmailProps) => {
  const [decodedEmail, setDecodedEmail] = useState<string>('');
  const [isDecoded, setIsDecoded] = useState(false);

  useEffect(() => {
    // Decode the email on client side to hide it from bots
    const decodeEmail = (encodedEmail: string) => {
      try {
        const decoded = deobfuscateEmail(encodedEmail);
        setDecodedEmail(decoded);
        setIsDecoded(true);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
      } catch (error: any) {
        // Fallback to simple base64
        const decoded = atob(encodedEmail);
        setDecodedEmail(decoded);
        setIsDecoded(true);
      }
    };

    // Obfuscate the email by encoding it
    const obfuscatedEmail = obfuscateEmail(email);
    decodeEmail(obfuscatedEmail);
  }, [email]);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();

    if (isDecoded && decodedEmail) {
      let mailtoLink: string;

      if (productName && productId) {
        mailtoLink = createMailToQuery(decodedEmail, productName, productId);
      } else {
        mailtoLink = `mailto:${decodedEmail}`;
      }

      window.location.href = mailtoLink;
    }
  };

  return (
    <Link
      href='#'
      anchorProps={{ onClick: handleClick }}
      className={`${styles['obfuscated-email']} ${className || ''}`}
      nativeLink
      {...linkProps}
    >
      {children}
    </Link>
  );
};

export default ObfuscatedEmail;
