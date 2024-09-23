import styles from './Notification.module.scss';
import icon from '../../assets/messenger_placeholder.png';

type NotificationProps = {
  onClick?: () => void;
};

export function Notification({ onClick }: NotificationProps) {
  return (
    <>
      <div className={styles.notificationContainer} onClick={onClick}>
        <img src={icon} alt="app icon" className={styles.icon} />
        <div className={styles.notificationText}>
          <h5 className={styles.notificationHeader}>Snorre</h5>
          <p className={styles.notificationContent}>Snorre har sendt deg en melding.</p>
        </div>
      </div>
    </>
  );
}
