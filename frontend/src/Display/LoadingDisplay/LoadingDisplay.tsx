import { Icon } from "@iconify/react/dist/iconify.js";
import styles from "./LoadingDisplay.module.scss";

export function LoadingDisplay() {
	return (
		<div className={styles.loadingContainer}>
			<Icon icon={"line-md:loading-alt-loop"} width={"3rem"} height={"3rem"} />
		</div>
	);
}
