import { ReactNode } from "react";
import styles from "./HomeDisplay.module.scss";

type HomeDisplayProps = {
  apps: ReactNode[];
  favoriteApps: ReactNode[];
};

export function HomeDisplay({ apps, favoriteApps }: HomeDisplayProps) {
  return (
    <div className={styles.homeScreenContainer}>
      <div className={styles.appsContainer}>
        {apps.map((app, index) => (
          <div key={index} className={styles.appIconContainer}>
            {app}
          </div>
        ))}
      </div>
      <div className={styles.favoriteApps}>
        {favoriteApps.map((app, index) => (
          <div key={index} className={styles.appIconContainer}>
            {app}
          </div>
        ))}
      </div>
    </div>
  );
}