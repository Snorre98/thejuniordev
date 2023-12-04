import styles from "./Notification.module.scss";
import icon from "../../assets/messenger_placeholder.png";

type NotificationProps = {
  onClick?: () => void;
};

export function Notification({ onClick }: NotificationProps) {
  return (
    <>
      <div className={styles.screen}>
        <div className={styles.notificationContainer} onClick={onClick}>
          <img src={icon} alt="app icon" className={styles.icon} />
          <div className={styles.notificationText}>
            <h5 className={styles.notificationHeader}>Snorre</h5>
            <p className={styles.notificationContent}>
              Hei! Jeg heter Snorre :) Lær mer om meg her ved å trykke!
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
