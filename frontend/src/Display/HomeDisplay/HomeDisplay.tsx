import { type ReactNode, useEffect, useRef } from 'react';
import { Screen, type ScreenProps } from '../../Components';
import styles from './HomeDisplay.module.scss';

interface HomeDisplayProps extends ScreenProps {
  apps: ReactNode[];
  favoriteApps: ReactNode[];
}

export function HomeDisplay({ onBack, ...props }: HomeDisplayProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.style.transform = 'scale(0.5)';
      container.style.opacity = '0';
      container.offsetHeight;
      container.style.transform = 'scale(1)';
      container.style.opacity = '1';
    }
  }, []);

  return (
    <Screen onBack={onBack} {...props}>
      <div className={styles.homeScreenContainer}>
        <div className={styles.appsContainer} ref={containerRef}>
          {props.apps.map((app, index) => (
            <div key={index} className={styles.appIconContainer}>
              {app}
            </div>
          ))}
        </div>
        <div className={styles.favoriteApps}>
          {props.favoriteApps.map((app, index) => (
            <div key={index} className={styles.appIconContainer}>
              {app}
            </div>
          ))}
        </div>
      </div>
    </Screen>
  );
}
