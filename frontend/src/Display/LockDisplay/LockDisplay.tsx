import { useState } from "react";
import { Screen, type ScreenProps } from "../../Components";
import { Notification } from "../../Components/Notification";
import type { NotificationProps } from "../../Components/Notification/Notification";
import { Watch } from "../../Components/Watch";
import { useStore } from "../../store";
import styles from "./LockDisplay.module.scss";

type LockDisplayProps = Omit<ScreenProps, "onUnlock" | "onPullUp"> & {
	notification: NotificationProps;
};

export function LockDisplay({ notification, ...props }: LockDisplayProps) {
	const { setScreen } = useStore();
	const [thisNotification, setNotification] = useState<NotificationProps>();

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
					<Notification
						appIcon={thisNotification?.appIcon}
						notificationTitle={thisNotification?.notificationTitle}
						notificationContent={thisNotification?.notificationContent}
						onClick={() => setScreen("chat")}
					/>
				</div>
			</div>
		</Screen>
	);
}
