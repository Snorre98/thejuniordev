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
			<div className={styles.appIconContainer} onClick={onOpenApp}>
				<img src={iconURL} className={styles.appIcon} />
			</div>
			{!isFavorit && <span className={styles.appTitle}>{appTitle}</span>}
		</div>
	);
}
