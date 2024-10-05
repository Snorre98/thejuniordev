import { Icon } from "@iconify/react/dist/iconify.js";
import React from "react";
import { Screen } from "../../Components/Screen";
import SoundsGood from "../../assets/sounds-good.jpg";
import styles from "./ProjectDisplay.module.scss";
const mockProps = {
	projectTitle: "Sounds Good",
	projectIcon: SoundsGood,
	projectParticipants: [
		"Sander",
		"Benjamin",
		"Snorre",
		"Sander",
		"Benjamin",
		"Snorre",
		"Benjamin",
		"Snorre",
	],
	projectCategory: "Student project",
	projectRepo: "https://github.com/Snorre98/sounds-good",
	projectDescription:
		"Sounds Good is a web application that allows you to search for different artists, albums, and songs and view details about them. On every song, you can comment and view other users' comments.",
	projectTechnology:
		"The frontend, built with React and TypeScript, uses Redux for state management and Material-UI for components. It interfaces with a GraphQL API backend, which connects to a Neo4j graph database containing a rich dataset of artists, albums, and songs. The application features powerful search and filter capabilities, pagination for performance, and adheres to accessibility guidelines. Testing is implemented using Cypress for E2E tests and Vitest for component testing. The project emphasizes code quality, performance optimization, and sustainable development practices.",
	projectTechList: [
		"Frontend: React, TypeScript, Redux Toolkit, Material-UI, SCSS",
		"Routing: React Router",
		"Backend: Node.js, GraphQL, Neo4j",
		"Testing: Cypress, Vitest, React Testing Library",
		//"Build Tools: Vite, npm",
		//"Version Control: Git",
		"Data Processing: Python (for dataset generation)",
		//"Code Quality: ESLint",
		//"Deployment: Supports local and server deployment",
	],
};

export function ProjectDisplay() {
	const handleOpen = () => {
		window.open(mockProps.projectRepo, "_blank", "noopener,noreferrer");
	};

	const renderContributors = (contributors: string[]) => {
		return contributors.map((contributor, index) => (
			<React.Fragment key={index}>
				{index > 0 && index === contributors.length - 1 && <span> and </span>}
				{index > 0 && index < contributors.length - 1 && <span>, </span>}
				<span>{contributor}</span>
				{index === contributors.length - 1 && "."}
			</React.Fragment>
		));
	};

	return (
		<Screen>
			<div className={styles.projectContainer}>
				<div className={styles.projectHeader}>
					<div className={styles.projectIconWrapper}>
						<img
							src={mockProps.projectIcon}
							alt="project-icon"
							className={styles.projectIcon}
						/>
					</div>
					<h2 className={styles.projectTitle}>{mockProps.projectTitle}</h2>
					<div className={styles.projectParticipants}>
						<h5>Participants</h5>
						<p>{renderContributors(mockProps.projectParticipants)}</p>
					</div>
					<div className={styles.projectCategory}>
						<h5>Kategori</h5>
						<p>{mockProps.projectCategory}</p>
					</div>
					<button
						type="button"
						className={styles.ghBtn}
						onClick={handleOpen}
						aria-label="Open GitHub repository for Sounds Good project"
					>
						<Icon icon={"mdi:github"} width={"1.25rem"} height={"1.25rem"} />
						GitHub repo
					</button>
				</div>
				<div className={styles.projectContent}>
					<section className={styles.projectDescription}>
						<h3>Beskrivelse</h3>
						<p>{mockProps.projectDescription}</p>
					</section>
					<section className={styles.projectDescription}>
						<h3>Teknisk oppsummering</h3>
						<ul>
							{mockProps.projectTechList.map((tech, index) => {
								// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
								return <li key={index}>{tech}</li>;
							})}
						</ul>
					</section>

					<section className={styles.projectDescription}>
						<h3>Teknisk beskrivelse</h3>
						<p>{mockProps.projectTechnology}</p>
					</section>
				</div>
			</div>
		</Screen>
	);
}
