'use client';

import { useCallback, useEffect, useState } from 'react';

import axios from 'axios';
import clsx from 'clsx';
import { useTranslations } from 'next-intl';

import {
  GLOBAL_INFOS_FIELDS,
  GLOBAL_INFOS_INFO_BAR_ID,
} from '@/constants/globalInfos';
import {
  INFO_BAR_HEIGHT_PX,
  INFO_BAR_SESSION_STORAGE_KEY,
} from '@/constants/infoBar';
import { parseInfoBarMessages } from '@/helpers/parseInfoBarMessages';
import { InfoBarMessage } from '@/types/infoBar';

import { InfoBarTicker } from './InfoBarTicker';
import styles from './styles.module.scss';

interface IInfoBarProps {
  initialMessages?: InfoBarMessage[];
  className?: string;
}

const setInfoBarCssHeight = (heightPx: number) => {
  document.documentElement.style.setProperty(
    '--info-bar-height',
    `${heightPx}px`,
  );
};

export const InfoBar = ({ initialMessages = [], className }: IInfoBarProps) => {
  const t = useTranslations();
  const [messages, setMessages] = useState<InfoBarMessage[]>(initialMessages);
  const [isVisible, setIsVisible] = useState(false);

  const handleDismiss = useCallback(() => {
    sessionStorage.setItem(INFO_BAR_SESSION_STORAGE_KEY, '1');
    setIsVisible(false);
    setInfoBarCssHeight(0);
  }, []);

  useEffect(() => {
    const controller = new AbortController();

    (async () => {
      try {
        const { data } = await axios.get('/api/fetch-global-infos', {
          params: {
            id: GLOBAL_INFOS_INFO_BAR_ID,
            fields: GLOBAL_INFOS_FIELDS.join(','),
          },
          signal: controller.signal,
        });

        const parsed = parseInfoBarMessages(data);

        if (parsed.length > 0) {
          setMessages(parsed);
        }
      } catch (error) {
        if (axios.isCancel(error)) return;
        console.error('Failed to fetch info bar messages:', error);
      }
    })();

    return () => controller.abort();
  }, []);

  useEffect(() => {
    if (!messages.length) {
      setInfoBarCssHeight(0);
      setIsVisible(false);

      return;
    }

    const isDismissed =
      sessionStorage.getItem(INFO_BAR_SESSION_STORAGE_KEY) === '1';

    if (isDismissed) {
      setInfoBarCssHeight(0);
      setIsVisible(false);

      return;
    }

    setIsVisible(true);
    setInfoBarCssHeight(INFO_BAR_HEIGHT_PX);

    return () => {
      setInfoBarCssHeight(0);
    };
  }, [messages.length]);

  if (!isVisible || !messages.length) {
    return null;
  }

  return (
    <div
      className={clsx(styles['info-bar'], className)}
      role='region'
      aria-label={t('infoBarAriaLabel')}
    >
      <div className={styles['info-bar-inner']}>
        <InfoBarTicker messages={messages} />
        <button
          type='button'
          className={styles['info-bar-close-button']}
          onClick={handleDismiss}
          aria-label={t('closeInfoBar')}
        >
          ×
        </button>
      </div>
    </div>
  );
};
