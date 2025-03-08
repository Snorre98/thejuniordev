import type { ReactNode } from 'react';
import { useStore } from '../../store/store';
import styles from './Screen.module.scss';
import { Bezel, Line } from './components';

export interface ScreenProps {
  children?: ReactNode;
  onPullUp?: () => void;
  onBack?: () => void;
}

export function Screen({ children, onPullUp }: ScreenProps) {
  const { backgrounds, defaultBackground, currentScreen } = useStore();
  const background = backgrounds[currentScreen] || defaultBackground;

  return (
    <Bezel>
      <div
        className={styles.screen}
        style={{
          backgroundImage: background === 'NONE' ? 'none' : background ? `url(${background})` : 'none',
        }}
      >
        {children}
        {onPullUp && <Line onPullUp={onPullUp} />}
      </div>
    </Bezel>
  );
}
