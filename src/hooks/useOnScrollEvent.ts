import { useEffect, useRef, useState } from 'react';

import { useMounted } from './useMounted';

interface IOnScrollEventHookParam<TScrollingRef> {
  callback?: (_e: Event, _element: TScrollingRef) => void;
  elementId: string;
}

export const useOnScrollEvent = <TScrollingRef extends HTMLElement | null>({
  callback,
  elementId,
}: IOnScrollEventHookParam<TScrollingRef>) => {
  const [isScrolling, setIsScrolling] = useState<boolean>(false);

  const isMounted = useMounted();
  const scrollingRef = useRef<TScrollingRef>(null);

  useEffect(() => {
    const onScroll: (_e: Event) => void = (_e: Event) => {
      const scrollTop: number =
        window.scrollY || document.documentElement.scrollTop;

      const element = document.getElementById(elementId) as TScrollingRef;

      if (callback) callback(_e, element);

      if (element) {
        scrollingRef.current = element;
      }

      if (scrollTop === 0) {
        setIsScrolling(false);
      } else if (scrollTop > 0) {
        setIsScrolling(true);
      }
    };

    window.addEventListener('scroll', onScroll);

    return () => {
      window.removeEventListener('scroll', onScroll);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMounted]);

  return { scrollingRef, isScrolling };
};
