import type { ReactNode } from "react";
import { useStore } from "../../store";
import styles from "./Screen.module.scss";
import { Bezel, Line } from "./components";

export interface ScreenProps {
	children?: ReactNode;
	onPullUp?: () => void;
	//onUnlock?: () => void; TODO - #1
	//onBack?: () => void;
}

export function Screen({
	children,
	onPullUp,
	//	...props  TODO - #1
}: ScreenProps) {
	const { backgrounds, defaultBackground, currentScreen } = useStore();
	const background = backgrounds[currentScreen] || defaultBackground;

	return (
		<Bezel>
			<div
				className={styles.screen}
				style={{ backgroundImage: background ? `url(${background})` : "none" }}
			>
				{children}
				{onPullUp && <Line onPullUp={onPullUp} />}
			</div>
		</Bezel>
	);
}
