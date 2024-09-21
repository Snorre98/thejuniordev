import styles from "./LockDisplay.module.scss";
import { Notification } from "../../Components/Notification";
import { Watch } from "../../Components/Watch";
import { Screen, ScreenProps } from "../../Components";

interface LockDisplayProps extends ScreenProps {
  dummyProp?: string;
}

export function LockDisplay({ onUnlock, ...props }: LockDisplayProps) {
  return (
    <Screen onUnlock={onUnlock}>
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
