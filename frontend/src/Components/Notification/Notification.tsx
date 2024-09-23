import iconPlaceholder from "../../assets/messenger_placeholder.png";
import styles from "./Notification.module.scss";

export type NotificationProps = {
	onClick?: () => void;
	appIcon?: string;
	notificationTitle?: string;
	notificationContent?: string;
};

export function Notification({
	onClick,
	appIcon = iconPlaceholder,
	notificationTitle = "TitlePlaceholder",
	notificationContent = "MessagePlaceholder",
}: NotificationProps) {
	return (
		<div className={styles.notificationContainer} onClick={onClick}>
			<img src={appIcon} alt="app icon" className={styles.icon} />
			<div className={styles.notificationText}>
				<h5 className={styles.notificationHeader}>{notificationTitle}</h5>
				<p className={styles.notificationContent}>{notificationContent}</p>
			</div>
		</div>
	);
}
