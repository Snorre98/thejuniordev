import styles from "./ErrorDisplay.module.scss";

interface ErrorDisplayProps {
	error: string;
}

export function ErrorDisplay({ error }: ErrorDisplayProps) {
	return (
		<div className={styles.errorContainer}>
			<h2>An error occurred</h2>
			<p>{error}</p>
		</div>
	);
}
