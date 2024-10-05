import { useStore } from "../../../../store";
import type { Children } from "../../../../types";
import styles from "./Bezel.module.scss";

type BezelProps = {
	children?: Children;
};

export function Bezel({ children }: BezelProps) {
	const { setScreen } = useStore();

	const handleLock = () => {
		setScreen("project");
	};

	return (
		<div className={styles.bezelWrapper}>
			<div className={styles.bezel}>
				<span className={styles.notch} />
				{children}
			</div>
			<span className={styles.lockButton} onClick={handleLock} />
		</div>
	);
}
