import { Icon } from "@iconify/react/dist/iconify.js";
import React, { useEffect, useState } from "react";
import { getFullIconUrl, getProjectByAppId } from "../../api/appApi";
import { useStore } from "../../store/store";
import { ErrorDisplay } from "../ErrorDisplay";
import { LoadingDisplay } from "../LoadingDisplay";
import styles from "./ProjectDisplay.module.scss";

interface ProjectData {
	app: {
		id: number;
		app_title: string;
		icon_url: string;
		opens: string;
	};
	project: {
		id: number;
		title: string;
		icon: string;
		participants: { data: string[] };
		category: string;
		repo: string;
		description: string;
		technology: string;
		techlist: { data: string[] };
	};
}

export function ProjectDisplay() {
	const [projectData, setProjectData] = useState<ProjectData | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const { currentAppId } = useStore();

	useEffect(() => {
		if (currentAppId != null) {
			async function fetchProjectData() {
				try {
					setIsLoading(true);
					const data = await getProjectByAppId(currentAppId as number);
					setProjectData(data);
				} catch (err) {
					setError("Failed to fetch project data");
					console.error(err);
				} finally {
					setIsLoading(false);
				}
			}
			fetchProjectData();
		}
	}, [currentAppId]);

	const handleOpen = () => {
		if (projectData?.project.repo) {
			window.open(projectData.project.repo, "_blank", "noopener,noreferrer");
		}
	};

	const renderContributors = (contributors: { data: string[] }) => {
		return contributors.data.map((contributor, index) => (
			<React.Fragment key={index}>
				{index > 0 && index === contributors.data.length - 1 && (
					<span> and </span>
				)}
				{index > 0 && index < contributors.data.length - 1 && <span>, </span>}
				<span>{contributor}</span>
				{index === contributors.data.length - 1 && "."}
			</React.Fragment>
		));
	};

	if (isLoading) return <LoadingDisplay />;
	if (error) return <ErrorDisplay error={"No page"} />;
	if (!projectData) return <ErrorDisplay error={"No page data"} />;

	const { project, app } = projectData;

	return (
		<div className={styles.projectContainer}>
			<div className={styles.projectHeader}>
				<div className={styles.projectIconWrapper}>
					<img
						src={getFullIconUrl(app.icon_url)}
						alt="project-icon"
						className={styles.projectIcon}
					/>
				</div>
				<h2 className={styles.projectTitle}>{project.title}</h2>
				<div className={styles.projectParticipants}>
					<h5>Participants</h5>
					<p>{renderContributors(project.participants)}</p>
				</div>
				<div className={styles.projectCategory}>
					<h5>Kategori</h5>
					<p>{project.category}</p>
				</div>
				<button
					type="button"
					className={styles.ghBtn}
					onClick={handleOpen}
					aria-label={`Open GitHub repository for ${project.title} project`}
				>
					<Icon icon={"mdi:github"} width={"1.25rem"} height={"1.25rem"} />
					GitHub repo
				</button>
			</div>
			<div className={styles.projectContent}>
				<section className={styles.projectDescription}>
					<h3>Beskrivelse</h3>
					<p>{project.description}</p>
				</section>
				<section className={styles.projectDescription}>
					<h3>Teknisk oppsummering</h3>
					<ul>
						{project.techlist.data.map((tech, index) => (
							<li key={index}>{tech}</li>
						))}
					</ul>
				</section>
				<section className={styles.projectDescription}>
					<h3>Teknisk beskrivelse</h3>
					<p>{project.technology}</p>
				</section>
			</div>
		</div>
	);
}
