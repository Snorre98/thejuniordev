import { useEffect, useState } from "react";
import { Screen, type ScreenProps } from "../../Components";
import { Notification } from "../../Components/Notification";
import type { NotificationProps } from "../../Components/Notification/Notification";
import { Watch } from "../../Components/Watch";
import { fetchLatestMessage, fetchUsername } from "../../api/chatApi";
import { useStore } from "../../store";
import styles from "./LockDisplay.module.scss";

type LockDisplayProps = Omit<ScreenProps, "onUnlock" | "onPullUp"> & {
	notification: NotificationProps;
};

export function LockDisplay({ notification, ...props }: LockDisplayProps) {
	const { setScreen } = useStore();
	const [latestNotification, setLatestNotification] =
		useState<NotificationProps | null>(null);

	useEffect(() => {
		async function loadLatestMessage() {
			const message = await fetchLatestMessage();
			if (message) {
				const sender = await fetchUsername(message?.sender);
				if (sender) {
					setLatestNotification({
						notificationTitle: `Melding fra: ${sender.user_name}`,
						notificationContent: message.message_text,
					});
				}
			}
		}
		loadLatestMessage();
	}, []);

	const handleUnlock = () => {
		setScreen("home");
	};

	return (
		<Screen onUnlock={handleUnlock} onPullUp={handleUnlock} {...props}>
			<div className={styles.lockScreenContainer}>
				<div className={styles.watchWrapper}>
					<Watch />
				</div>
				<div className={styles.notificationWrapper}>
					{latestNotification && (
						<Notification
							notificationTitle={latestNotification.notificationTitle}
							notificationContent={latestNotification.notificationContent}
							onClick={() => setScreen("chat")}
						/>
					)}
				</div>
			</div>
		</Screen>
	);
}
