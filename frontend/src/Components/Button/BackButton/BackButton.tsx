import styles from "./BackButton.module.scss";

export function BackButton() {
	return (
		// biome-ignore lint/a11y/useButtonType: <explanation>
		<button className={styles.backButton}>test</button>
	);
}
