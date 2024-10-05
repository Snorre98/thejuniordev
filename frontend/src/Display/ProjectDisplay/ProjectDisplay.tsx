import { Screen } from "../../Components/Screen";
import SoundsGood from "../../assets/sounds-good.jpg";
import styles from "./ProjectDisplay.module.scss";

const mockProps = {
	projectTitle: "Sounds Good",
	projectIcon: SoundsGood,
};

export function ProjectDisplay() {
	return (
		<Screen>
			<div className={styles.projectContainer}>
				<div className={styles.projectHeader}>
					<div className={styles.blurredBackground}>
						<img
							src={mockProps.projectIcon}
							alt="project-icon"
							className={styles.blurredIcon}
						/>{" "}
						<div className={styles.projectIconWrapper}>
							<img
								src={mockProps.projectIcon}
								alt="project-icon"
								className={styles.projectIcon}
							/>
						</div>
					</div>

					<h2 className={styles.projectTitle}>{mockProps.projectTitle}</h2>
				</div>
			</div>
		</Screen>
	);
}
