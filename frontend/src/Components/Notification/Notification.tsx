import iconPlaceholder from "../../assets/messenger_placeholder.png";
import styles from "./Notification.module.scss";

export type NotificationProps = {
	onClick?: () => void;
	appIcon?: string;
	notificationTitle?: string;
	notificationContent?: string;
};

const truncateText = (text: string, maxLength: number) => {
	if (text.length <= maxLength) return text;

	// Find the last space within the maxLength
	const lastSpaceIndex = text.lastIndexOf(" ", maxLength - 3);

	if (lastSpaceIndex === -1) {
		// If there's no space, just cut at maxLength
		return `${text.slice(0, maxLength - 3)}...`;
		// biome-ignore lint/style/noUselessElse: <explanation>
	} else {
		// Cut at the last space and add ellipsis
		return `${text.slice(0, lastSpaceIndex)}...`;
	}
};

export function Notification({
	onClick,
	appIcon = iconPlaceholder,
	notificationTitle = "TitlePlaceholder",
	notificationContent = "MessagePlaceholder",
}: NotificationProps) {
	const truncatedContent = truncateText(notificationContent, 100); // Adjust 100 to your desired max length
	return (
		// biome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
		<div className={styles.notificationContainer} onClick={onClick}>
			<img src={appIcon} alt="app icon" className={styles.icon} />
			<div className={styles.notificationText}>
				<h5 className={styles.notificationHeader}>{notificationTitle}</h5>
				<p className={styles.notificationContent}>{truncatedContent}</p>
			</div>
		</div>
	);
}
