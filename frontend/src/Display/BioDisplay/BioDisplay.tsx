import { Icon } from "@iconify/react/dist/iconify.js";
import type React from "react";
import { useState } from "react";
import { ComingSoon } from "../../Components";
import { ErrorDisplay } from "../ErrorDisplay";
import { LoadingDisplay } from "../LoadingDisplay";
import styles from "./BioDisplay.module.scss";
import { useBioData } from "../../hooks/useBioQueries";
import { LoadingOverlay } from "../../Components";

export function BioDisplay() {
	const [showComingSoon, setShowComingSoon] = useState(false);
	const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
	
	// Use the custom hook instead of direct API calls
	const { data: bioData = [], isLoading, error } = useBioData();

	const handleBackClick = (event: React.MouseEvent) => {
		setCursorPos({ x: event.clientX, y: event.clientY });
		setShowComingSoon(true);
		setTimeout(() => setShowComingSoon(false), 1500);
	};

	const formatTime = (startTime: string, endTime: string | null) => {
		if (!endTime) {
			return `${new Date(startTime).toLocaleDateString()} - nå`;
		}
		return `${new Date(startTime).toLocaleDateString()} - ${new Date(endTime).toLocaleDateString()}`;
	};

	if (isLoading) {
		return <LoadingDisplay />;
	}

	if (error) {
		return <ErrorDisplay error={"Failed to load bio data. Please try again later."} />;
	}

	return (
		<LoadingOverlay isLoading={isLoading}>
			{showComingSoon && (
				<ComingSoon duration={1500} x={cursorPos.x} y={cursorPos.y + 20} />
			)}
			<div className={styles.bioDisplayContainer}>
				<div className={styles.notesActionRack}>
					<button
						type="button"
						onClick={handleBackClick}
						className={styles.backBtn}
					>
						<Icon
							icon="mdi:arrow-left-drop-circle"
							width="1.2rem"
							height="1.2rem"
						/>
						<span>Notater</span>
					</button>
					<div>
						<Icon
							icon={"ion:share-outline"}
							width={"2rem"}
							height={"2rem"}
							onClick={handleBackClick}
						/>
						<Icon
							icon={"system-uicons:circle-menu"}
							width={"2rem"}
							height={"2rem"}
							onClick={handleBackClick}
						/>
					</div>
				</div>
				<div className={styles.noteContent}>
					<h1 className={styles.notesHeader}>Bio</h1>
					{bioData.map((category) => (
						<div key={category.category} className={styles.noteTextWrapper}>
							<h2 className={styles.noteSubtitle}>{category.category}</h2>
							<div className={styles.noteSections}>
								{category.items.map((item) => (
									<div key={item.id} className={styles.noteSection}>
										<div className={styles.noteHeader}>
											<Icon
												icon={
													item.completed
														? "mdi:checkbox-marked-circle-outline"
														: "mdi:checkbox-blank-circle-outline"
												}
												width={"1.25rem"}
												height={"1.25rem"}
												style={{ minWidth: "1.25rem", minHeight: "1.25rem" }}
											/>

											<h4 className={styles.noteItemTitle}>{item.title}</h4>
										</div>
										<span className={styles.noteItemDates}>
											{formatTime(item.start, item.end)}
										</span>
										<p className={styles.noteItemDescription}>
											{item.description}
										</p>
									</div>
								))}
							</div>
							<hr className={styles.itemsDivider} />
						</div>
					))}
				</div>
				<div className={styles.actionFooter}>
					<Icon
						icon={"ph:list-checks-light"}
						width={"2rem"}
						height={"2rem"}
						onClick={handleBackClick}
					/>
					<Icon
						icon={"ph:camera-light"}
						width={"2rem"}
						height={"2rem"}
						onClick={handleBackClick}
					/>
					<Icon
						icon={"ph:pencil-circle-light"}
						width={"2rem"}
						height={"2rem"}
						onClick={handleBackClick}
					/>
					<Icon
						icon={"ph:note-pencil-light"}
						width={"2rem"}
						height={"2rem"}
						onClick={handleBackClick}
					/>
				</div>
			</div>
		</LoadingOverlay>
	);
}
