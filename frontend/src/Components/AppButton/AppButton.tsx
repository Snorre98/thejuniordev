import styles from "./AppButton.module.scss";

type AppButtonProps = {
	onOpenApp: () => void;
	iconURL: string;
	appTitle?: string;
	isFavorit: boolean;
};

export function AppButton({
	onOpenApp,
	appTitle,
	iconURL,
	isFavorit = false,
}: AppButtonProps) {
	return (
		<div className={styles.appContainer}>
			{/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
			<div className={styles.appIconContainer} onClick={onOpenApp}>
				{/* biome-ignore lint/a11y/useAltText: <explanation> */}
				<img src={iconURL} className={styles.appIcon} />
			</div>
			{!isFavorit && <span className={styles.appTitle}>{appTitle}</span>}
		</div>
	);
}
