'use client';

import { useEffect } from 'react';

import { usePathname, useSearchParams } from 'next/navigation';

import { useGoogleAnalytics } from '@/hooks/useGoogleAnalytics';

const PageViewTracker = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { trackPageView } = useGoogleAnalytics();

  useEffect(() => {
    const url =
      pathname +
      (searchParams?.toString() ? `?${searchParams.toString()}` : '');
    trackPageView(url);
  }, [pathname, searchParams, trackPageView]);

  return null;
};

export default PageViewTracker;
