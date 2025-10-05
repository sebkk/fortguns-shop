'use client';

import { useGoogleAnalytics } from '@/hooks/useGoogleAnalytics';

interface EventTrackerProps {
  action: string;
  category: string;
  label?: string;
  value?: number;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

const EventTracker = ({
  action,
  category,
  label,
  value,
  children,
  className,
  onClick,
}: EventTrackerProps) => {
  const { trackEvent } = useGoogleAnalytics();

  const handleClick = () => {
    trackEvent(action, category, label, value);
    onClick?.();
  };

  return (
    <div className={className} onClick={handleClick}>
      {children}
    </div>
  );
};

export default EventTracker;
