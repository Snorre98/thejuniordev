// src/Components/HomeScreen.tsx
import { ReactNode } from "react";
import styles from "./HomeScreen.module.scss";

type HomeScreenProps = {
  apps: ReactNode[];
  favoriteApps: ReactNode[];
};

export function HomeScreen({ apps, favoriteApps }: HomeScreenProps) {
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