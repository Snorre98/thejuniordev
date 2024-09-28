import { useEffect, useState } from "react";
import { Screen, type ScreenProps } from "../../Components";
import { Notification } from "../../Components/Notification";
import type { NotificationProps } from "../../Components/Notification/Notification";
import { Watch } from "../../Components/Watch";
import { useStore } from "../../store";
import styles from "./LockDisplay.module.scss";

type LockDisplayProps = Omit<ScreenProps, "onUnlock" | "onPullUp"> & {
	notification: NotificationProps;
};

const mock_notification: NotificationProps = {
	notificationTitle: "Melding fra: Snorre",
	notificationContent:
		"Hei, dette er min portofolie side. Trykk på denne for å se en kort bio og viktige linker, eller utforsk selv....",
};

export function LockDisplay({ notification, ...props }: LockDisplayProps) {
	const { setScreen } = useStore();
	const [thisNotification, setNotification] = useState<NotificationProps>();

	useEffect(() => {
		setNotification(mock_notification);
		[];
	});

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
