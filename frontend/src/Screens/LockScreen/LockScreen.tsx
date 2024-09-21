import styles from "./LockScreen.module.scss";
import { Notification } from "../../Components/Notification";
import { Watch } from "../../Components/Watch";

type LockScreenProps = {
  onUnlock: () => void;
};

export function LockScreen({ onUnlock }: LockScreenProps) {
  return (
    <>
      <div className={styles.lockScreenContainer}>
        <div className={styles.item1}>
          <Watch />
        </div>
        <div className={styles.item2}>
          <Notification />
        </div>
        <div className={styles.item3}></div>
        <div className={styles.item4}></div>
        <button onClick={onUnlock}>Unlock</button>
      </div>
    </>
  );
}
