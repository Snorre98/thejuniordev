import { Icon } from '@iconify/react/dist/iconify.js';
import { useEffect, useState } from 'react';
import styles from './ComingSoon.module.scss';

type CommingSoonProps = {
  duration: number;
  x: number;
  y: number;
};

export function ComingSoon({ duration = 1000, x, y }: CommingSoonProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, duration);
    return () => clearTimeout(timer);
  }, [duration]);

  if (!isVisible) return null;

  return (
    <div
      className={styles.comingSoonAlert}
      style={{
        left: `${x}px`,
        top: `${y}px`,
      }}
    >
      <div className={styles.comingSoonHeader}>
        <Icon icon={'mdi:information'} className={styles.comingSoonIcon} />
        <h6 className={styles.comingSoonTitle}>Coming Soon</h6>
      </div>
    </div>
  );
}
