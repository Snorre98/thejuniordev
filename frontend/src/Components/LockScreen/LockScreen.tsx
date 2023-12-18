import styles from "./LockScreen.module.scss";
import { Notification } from "../Notification";
import { Watch } from "../Watch";

export function LockScreen() {
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
      </div>
    </>
  );
}
