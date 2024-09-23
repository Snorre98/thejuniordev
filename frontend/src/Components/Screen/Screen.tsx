import type { ReactNode } from "react";
import styles from "./Screen.module.scss";
import { Bezel, Line } from "./components";

export interface ScreenProps {
	children?: ReactNode;
	onPullUp?: () => void;
	onUnlock?: () => void;
	onBack?: () => void;
}

export function Screen({ children, onPullUp }: ScreenProps) {
	return (
		<Bezel>
			<div className={styles.screen}>
				{children}
				{onPullUp && <Line onPullUp={onPullUp} />}
			</div>
		</Bezel>
	);
}
