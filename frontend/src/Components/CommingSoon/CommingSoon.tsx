import { Icon } from "@iconify/react/dist/iconify.js";
import { useEffect, useState } from "react";
import styles from "./CommingSoon.module.scss";
type CommingSoonProps = {
	message: string;
	duration: number;
};
export function CommingSoon({
	message = "Kommer snart",
	duration = 1000,
}: CommingSoonProps) {
	const [isVisible, setIsVisible] = useState(true);

	useEffect(() => {
		const timer = setTimeout(() => {
			setIsVisible(false);
		}, duration);

		return () => clearTimeout(timer);
	}, [duration]);

	if (!isVisible) return null;

	return (
		<div className={styles.commingSoonAlert}>
			<div className={styles.comminSoonHeader}>
				<Icon icon={"mdi:information"} className={styles.commingSoonIcon} />
				<h3 className={styles.commingSoonTitle}>Coming Soon</h3>
			</div>
			<p className={styles.commingSoonMessage}>{message}</p>
		</div>
	);
}
