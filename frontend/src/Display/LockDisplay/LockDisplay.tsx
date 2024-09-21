import styles from "./LockDisplay.module.scss";
import { Notification } from "../../Components/Notification";
import { Watch } from "../../Components/Watch";
import { Screen, ScreenProps } from "../../Components";
import { useStore } from '../../store'

type LockDisplayProps = Omit<ScreenProps, 'onUnlock' | 'onPullUp'> & {
  dummyProp?: string;
};

export function LockDisplay({ ...props }: LockDisplayProps) {
  const { setScreen } = useStore();

  const handleUnlock = () => {
    setScreen('home');
  };

  return (
    <Screen onUnlock={handleUnlock} onPullUp={handleUnlock}>
      <div className={styles.lockScreenContainer}>
        <div className={styles.item1}>
          <Watch />
        </div>
        <div className={styles.item2}>
          <Notification />
        </div>
        <div className={styles.item3}>
          <p>{props.dummyProp}</p>
        </div>
        <div className={styles.item4}></div>
      </div>
    </Screen>
  );
}