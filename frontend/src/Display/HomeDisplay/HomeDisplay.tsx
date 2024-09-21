import { ReactNode } from "react";
import styles from "./HomeDisplay.module.scss";
import { Screen, ScreenProps } from "../../Components";

interface HomeDisplayProps extends ScreenProps {
  apps: ReactNode[];
  favoriteApps: ReactNode[];
}

export function HomeDisplay({ onBack, ...props }: HomeDisplayProps) {
  return (
    <Screen onBack={onBack} {...props}>
    <div className={styles.homeScreenContainer}>
      <div className={styles.appsContainer}>
        {props.apps.map((app, index) => (
          <div key={index} className={styles.appIconContainer}>
            {app}
          </div>
        ))}
      </div>
      <div className={styles.favoriteApps}>
        {props.favoriteApps .map((app, index) => (
          <div key={index} className={styles.appIconContainer}>
            {app}
          </div>
        ))}
      </div>
    </div>
    </Screen>
  );
}