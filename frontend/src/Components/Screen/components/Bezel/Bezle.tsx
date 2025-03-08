import { useStore } from "../../../../store/store";
import type { Children } from "../../../../types";
import styles from "./Bezel.module.scss";

type BezelProps = {
	children?: Children;
};

export function Bezel({ children }: BezelProps) {
	const { setScreen } = useStore();

	const handleLock = () => {
		setScreen("lock");
	};

	return (
		<div className={styles.bezelWrapper}>
			<div className={styles.bezel}>
				<span className={styles.notch} />
				{children}
			</div>
			{/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
			<span className={styles.lockButton} onClick={handleLock} />
		</div>
	);
}
