import styles from "./AppIcon.module.scss";
type AppIconProps = {
  onclick?: () => void;
  iconURL: string;
  appTitle?: string;
};

export function AppIcon({ onclick, appTitle, iconURL }: AppIconProps) {
  return (
    <div className={styles.appContainer}>
      <div
        className={styles.appIcon}
        style={{ backgroundImage: `url(${iconURL})` }}
        onClick={onclick}
      />
      <span className={styles.appTitle}>{appTitle}</span>
    </div>
  );
}
