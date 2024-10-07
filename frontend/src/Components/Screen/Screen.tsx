import type { ReactNode } from "react";
import { useStore } from "../../store/store";
import styles from "./Screen.module.scss";
import { Bezel, Line } from "./components";

export interface ScreenProps {
	children?: ReactNode;
	onPullUp?: () => void;
	//onUnlock?: () => void; TODO - #1
	onBack?: () => void;
}

export function Screen({
	children,
	onPullUp,
	onBack,
	//	...props  TODO - #1
}: ScreenProps) {
	const { backgrounds, defaultBackground, currentScreen } = useStore();
	const background = backgrounds[currentScreen] || defaultBackground;
	const test = onBack; // TODO - #1

	return (
		<Bezel>
			<div
				className={styles.screen}
				style={{
					backgroundImage:
						background === "NONE"
							? "none"
							: background
								? `url(${background})`
								: "none",
				}}
			>
				{children}
				{onPullUp && <Line onPullUp={onPullUp} />}
			</div>
		</Bezel>
	);
}
