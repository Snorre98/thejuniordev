import styles from "./AppButton.module.scss";

type AppButtonProps = {
  onOpenApp: () => void;
  iconURL: string;
  appTitle?: string;
};

export function AppButton({ onOpenApp, appTitle, iconURL }: AppButtonProps) {
  return (
    <div className={styles.appContainer}>
      <div
        className={styles.appIcon}
        style={{ backgroundImage: `url(${iconURL})` }}
        onClick={onOpenApp}
      />
      <span className={styles.appTitle}>{appTitle}</span>
    </div>
  );
}
