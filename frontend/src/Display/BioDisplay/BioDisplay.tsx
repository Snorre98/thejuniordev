import { Icon } from "@iconify/react/dist/iconify.js";
import type React from "react";
import { useEffect, useState } from "react";
import { ComingSoon } from "../../Components";
import { type BioCategory, fetchBioData } from "../../api/bioApi";
import styles from "./BioDisplay.module.scss";

export function BioDisplay() {
	const [showComingSoon, setShowComingSoon] = useState(false);
	const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
	const [bioData, setBioData] = useState<BioCategory[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		async function loadBioData() {
			try {
				setIsLoading(true);
				const data = await fetchBioData();
				setBioData(data);
				setError(null);
			} catch (err) {
				setError("Failed to load bio data. Please try again later.");
				console.error("Error loading bio data:", err);
			} finally {
				setIsLoading(false);
			}
		}

		loadBioData();
	}, []);

	const handleBackClick = (event: React.MouseEvent) => {
		setCursorPos({ x: event.clientX, y: event.clientY });
		setShowComingSoon(true);
		setTimeout(() => setShowComingSoon(false), 1500);
	};

	if (isLoading) {
		return <div>Loading...</div>;
	}

	if (error) {
		return <div>Error: {error}</div>;
	}

	return (
		<>
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
											{item.completed ? (
												<Icon
													icon={"mdi:checkbox-marked-circle-outline"}
													width={"1.25rem"}
													height={"1.25rem"}
												/>
											) : (
												<Icon
													icon={"mdi:checkbox-blank-circle-outline"}
													width={"1.25rem"}
													height={"1.25rem"}
												/>
											)}
											<h4 className={styles.noteItemTitle}>{item.title}</h4>
										</div>
										<span className={styles.noteItemDates}>
											{item.start && item.end
												? `${new Date(item.start).toLocaleDateString()} - ${item.end ? new Date(item.end).toLocaleDateString() : "nå"}`
												: "Dates not specified"}
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
		</>
	);
}
