'use client';

import { useEffect, useRef } from 'react';

import { TSectionReviewsTrustIndexProps } from '@/types/handlerComponents';

// Global cache for loaded scripts to prevent multiple loads
const loadedScripts = new Set<string>();

// Global reference counter to track script usage
const scriptUsageCount = new Map<string, number>();

export const SectionReviewsTrustIndex = ({
  section,
}: TSectionReviewsTrustIndexProps) => {
  const scriptRef = useRef<HTMLScriptElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const widgetId = section.widget_id;
  const scriptUrl = `https://cdn.trustindex.io/loader.js?${widgetId}`;

  useEffect(() => {
    // Check if script is already loaded globally
    if (loadedScripts.has(scriptUrl)) {
      // Increment usage count
      scriptUsageCount.set(
        scriptUrl,
        (scriptUsageCount.get(scriptUrl) || 0) + 1,
      );
      return;
    }

    // Check if script element already exists in DOM
    const existingScript = document.querySelector(
      `script[src="${scriptUrl}"]`,
    ) as HTMLScriptElement | null;

    if (existingScript) {
      // Script already exists, mark as loaded and increment usage
      loadedScripts.add(scriptUrl);
      scriptUsageCount.set(
        scriptUrl,
        (scriptUsageCount.get(scriptUrl) || 0) + 1,
      );
      scriptRef.current = existingScript;
      return;
    }

    // Create script element
    const script = document.createElement('script');
    script.src = scriptUrl;
    script.async = true;
    script.defer = true;

    script.onload = () => {
      loadedScripts.add(scriptUrl);
      scriptUsageCount.set(scriptUrl, 1);
    };

    script.onerror = () => {
      // Remove from cache on error so it can be retried
      loadedScripts.delete(scriptUrl);
      scriptUsageCount.delete(scriptUrl);
    };

    // Append script to container
    if (containerRef.current) {
      containerRef.current.appendChild(script);
      scriptRef.current = script;
    }

    // Cleanup function - only remove script if no other instances are using it
    return () => {
      const usageCount = scriptUsageCount.get(scriptUrl) || 0;
      if (usageCount > 1) {
        // Other instances are using this script, just decrement counter
        scriptUsageCount.set(scriptUrl, usageCount - 1);
      } else {
        // Last instance, remove script and clean up
        if (scriptRef.current && scriptRef.current.parentNode) {
          scriptRef.current.remove();
        }
        loadedScripts.delete(scriptUrl);
        scriptUsageCount.delete(scriptUrl);
        scriptRef.current = null;
      }
    };
  }, [scriptUrl]);

  return (
    <div ref={containerRef} className='trustindex-widget-container'>
      <div data-widget-id={widgetId} />
    </div>
  );
};
