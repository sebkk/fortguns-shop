'use client';

import {
  CSSProperties,
  Fragment,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';

import parseHTML from 'html-react-parser';

import { Link } from '@/components/Link';
import { InfoBarMessage } from '@/types/infoBar';

import styles from './styles.module.scss';

interface IInfoBarTickerProps {
  messages: InfoBarMessage[];
}

/** Scrolling speed in pixels per second */
const TICKER_PX_PER_SECOND = 70;
/** Minimum copies of the message group rendered inside the track */
const MIN_COPIES = 2;
/** Maximum copies — safety cap for very narrow content / wide viewports */
const MAX_COPIES = 12;

const MessageContent = ({ html }: { html: string }) => (
  <span className={styles['info-bar-message-html']}>{parseHTML(html)}</span>
);

const MessageItem = ({ message }: { message: InfoBarMessage }) => {
  if (message.href) {
    return (
      <Link href={message.href} className={styles['info-bar-message-link']}>
        <MessageContent html={message.text} />
      </Link>
    );
  }

  return <MessageContent html={message.text} />;
};

const MessageSeparator = () => (
  <span className={styles['info-bar-separator']} aria-hidden='true'>
    ·
  </span>
);

const MessageGroup = ({
  messages,
  groupRef,
  ariaHidden = false,
}: {
  messages: InfoBarMessage[];
  groupRef?: (el: HTMLDivElement | null) => void;
  ariaHidden?: boolean;
}) => (
  <div
    ref={groupRef}
    className={styles['info-bar-ticker-group']}
    aria-hidden={ariaHidden || undefined}
  >
    {messages.map((message) => (
      <Fragment key={message.id}>
        <MessageItem message={message} />
        <MessageSeparator />
      </Fragment>
    ))}
  </div>
);

export const InfoBarTicker = ({ messages }: IInfoBarTickerProps) => {
  const viewportRef = useRef<HTMLDivElement>(null);
  const groupRef = useRef<HTMLDivElement | null>(null);
  const [copies, setCopies] = useState(MIN_COPIES);
  const [copyWidthPx, setCopyWidthPx] = useState<number | null>(null);

  const measure = useCallback(() => {
    const viewport = viewportRef.current;
    const group = groupRef.current;
    if (!viewport || !group) return;

    const groupWidth = group.getBoundingClientRect().width;
    const viewportWidth = viewport.getBoundingClientRect().width;

    if (groupWidth <= 0 || viewportWidth <= 0) return;

    const requiredCopies = Math.min(
      MAX_COPIES,
      Math.max(MIN_COPIES, Math.ceil((viewportWidth * 2) / groupWidth) + 1),
    );

    setCopyWidthPx(groupWidth);
    setCopies(requiredCopies);
  }, []);

  useEffect(() => {
    measure();

    const viewport = viewportRef.current;
    if (!viewport || typeof ResizeObserver === 'undefined') return;

    const observer = new ResizeObserver(() => measure());
    observer.observe(viewport);
    if (groupRef.current) observer.observe(groupRef.current);

    return () => observer.disconnect();
  }, [measure, messages]);

  if (!messages.length) {
    return null;
  }

  const durationS = copyWidthPx
    ? Math.max(copyWidthPx / TICKER_PX_PER_SECOND, 4)
    : null;

  const trackStyle: CSSProperties = copyWidthPx
    ? {
        animationDuration: `${durationS}s`,
        ['--info-bar-ticker-shift' as string]: `-${copyWidthPx}px`,
      }
    : { animation: 'none' };

  return (
    <div ref={viewportRef} className={styles['info-bar-ticker']}>
      <div className={styles['info-bar-ticker-track']} style={trackStyle}>
        {Array.from({ length: copies }).map((_, index) => (
          <MessageGroup
            key={index}
            messages={messages}
            ariaHidden={index > 0}
            groupRef={
              index === 0
                ? (el) => {
                    groupRef.current = el;
                  }
                : undefined
            }
          />
        ))}
      </div>
    </div>
  );
};
