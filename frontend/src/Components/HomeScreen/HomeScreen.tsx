import { Children } from "../../types";
import styles from "./HomeScreen.module.scss";
type HomeScreenProps = {
  app1?: Children;
  app2?: Children;
  app3?: Children;
  app4?: Children;
  app5?: Children;
  app6?: Children;
  app7?: Children;
  app8?: Children;
  app9?: Children;
  app10?: Children;
  app11?: Children;
};
export function HomeScreen({
  app1,
  app2,
  app3,
  app4,
  app5,
  app6,
  app7,
  app8,
  app9,
  app10,
  app11,
}: HomeScreenProps) {
  return (
    <>
      <div className={styles.homeScreenContainer}>
        <div className={styles.appsContainer}>
          <div className={styles.appIconContainer}>{app1}</div>
          <div className={styles.appIconContainer}>{app2}</div>
          <div className={styles.appIconContainer}>{app3}</div>
          <div className={styles.appIconContainer}>{app4}</div>
          <div className={styles.appIconContainer}>{app5}</div>
          <div className={styles.appIconContainer}>{app6}</div>
          <div className={styles.appIconContainer}>{app7}</div>
          <div className={styles.appIconContainer}>{app8}</div>
          <div className={styles.appIconContainer}>{app9}</div>
          <div className={styles.appIconContainer}>{app10}</div>
          <div className={styles.appIconContainer}>{app11}</div>
          <div className={styles.appIconContainer}>{app1}</div>
          <div className={styles.appIconContainer}>{app2}</div>
          <div className={styles.appIconContainer}>{app3}</div>
          <div className={styles.appIconContainer}>{app4}</div>
          <div className={styles.appIconContainer}>{app5}</div>
          <div className={styles.appIconContainer}>{app6}</div>
          <div className={styles.appIconContainer}>{app7}</div>
          <div className={styles.appIconContainer}>{app8}</div>

          {/* <div className={styles.appIconContainer}>{app10}</div>
        <div className={styles.appIconContainer}>{app11}</div> */}
        </div>
        <div className={styles.favoriteApps}>
          <div className={styles.appIconContainer}>{app9}</div>
          <div className={styles.appIconContainer}>{app10}</div>
          <div className={styles.appIconContainer}>{app11}</div>
        </div>
      </div>
    </>
  );
}
