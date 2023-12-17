import styles from "./LockScreen.module.scss";
import { Notification } from "../Notification";

export function LockScreen() {
  return (
    <>
      <div className={styles.lockScreenContainer}>
        <div className={styles.item1}>
          <h3>ITEM 1</h3>
        </div>
        <div className={styles.item2}>
          <h3>ITEM 2</h3>
        </div>
        <div className={styles.item3}>
          <Notification />
        </div>
        <div className={styles.item4}>
          <h3>ITEM 4</h3>
        </div>
      </div>
    </>
  );
}
