'use client';

import { useEffect, useState } from 'react';

import { IOpeningStatus, getOpeningStatus } from '@/constants/openingHours';

/**
 * Pages are statically generated, so "is the shop open right now" cannot be
 * answered at build time — it is worked out in the browser after mount and
 * kept fresh so a page left open does not go stale.
 */
export const useOpeningStatus = () => {
  const [status, setStatus] = useState<IOpeningStatus | null>(null);

  useEffect(() => {
    setStatus(getOpeningStatus());

    const timer = setInterval(() => setStatus(getOpeningStatus()), 60_000);

    return () => clearInterval(timer);
  }, []);

  return status;
};
