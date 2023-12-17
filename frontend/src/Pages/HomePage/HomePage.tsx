import styles from "./HomePage.module.scss";
import { LockScreen, Screen } from "../../Components";

export function HomePage() {
  return (
    <Screen
      topScreen={<LockScreen />}
      bottomScreen={
        <div className={styles.bottmScreen}>
          <h1>b</h1>
        </div>
      }
    />
  );
}
