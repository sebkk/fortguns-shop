'use client';

import { BProgress } from '@bprogress/core';
import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

export const RouteChangeProgress = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    BProgress.start();
  }, [pathname, searchParams]);

  return null;
};
