import { type ReactNode, useEffect, useState } from 'react';
import styles from './LoadingOverlay.module.scss';

interface LoadingOverlayProps {
  children: ReactNode;
  isLoading: boolean;
  minDisplayTime?: number; // Minimum time in ms to show the loader
}

export function LoadingOverlay({ children, isLoading, minDisplayTime = 250 }: LoadingOverlayProps) {
  const [shouldRender, setShouldRender] = useState(isLoading);
  const [startTime, setStartTime] = useState<number | null>(null);

  useEffect(() => {
    // When loading starts
    if (isLoading) {
      setShouldRender(true);
      setStartTime(Date.now());
    }
    // When loading ends
    else if (startTime) {
      const elapsedTime = Date.now() - startTime;
      const remainingTime = Math.max(0, minDisplayTime - elapsedTime);

      // If minimum display time hasn't passed, wait before hiding
      const timer = setTimeout(() => {
        setShouldRender(false);
      }, remainingTime);

      return () => clearTimeout(timer);
    }
  }, [isLoading, minDisplayTime, startTime]);

  return (
    <div className={styles.container}>
      {children}

      {shouldRender && (
        <div className={styles.overlay}>
          <div className={styles.spinner}>
            {/* biome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24">
              <path
                fill="#fff"
                d="M17.05 20.28c-.98.95-2.05.8-3.08.35c-1.09-.46-2.09-.48-3.24 0c-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8c1.18-.24 2.31-.93 3.57-.84c1.51.12 2.65.72 3.4 1.8c-3.12 1.87-2.38 5.98.48 7.13c-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25c.29 2.58-2.34 4.5-3.74 4.25"
              />
            </svg>
          </div>
        </div>
      )}
    </div>
  );
}
