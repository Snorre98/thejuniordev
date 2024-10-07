import { Icon } from "@iconify/react/dist/iconify.js";
import React, { useState } from "react";
import { ComingSoon } from "../../Components";
import styles from "./BioDisplay.module.scss";

const MOCK_DATA = {
	NOTES_MOCK: [
		{
			NOTE_TITLE: "Snorres Bio",
			NOTE_SUBTITLES: ["Erfaring", "Utdanning"],
			NOTE_CONTENTS: {
				Erfaring: [
					{
						completed: false,
						title: "Webutvikler",
						description: "På Samfundet",
						dates: "Sep. 2022 - nå",
					},
					{
						completed: true,
						title: "NTNU - jobb NTNU - jobb NTNU - jobb",
						description: "På Samfundet",
						dates: "Sep. 2022 - nå",
					},
				],
				Utdanning: [
					{
						completed: false,
						title: "NTNU - Informatikk",
						description: "Bachelorgrad",
						dates: "Aug. 2022 - nå",
					},
					{
						completed: true,
						title: "NTNU - Kjemi",
						description: "Bachelorgrad",
						dates: "Aug. 2022 - nå",
					},
				],
			},
		},
	],
};

export function BioDisplay() {
	const [showComingSoon, setShowComingSoon] = useState(false);
	const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });

	const handleBackClick = (event: React.MouseEvent) => {
		setCursorPos({ x: event.clientX, y: event.clientY });
		setShowComingSoon(true);
		setTimeout(() => setShowComingSoon(false), 1500);
	};

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
					{MOCK_DATA.NOTES_MOCK.map((note) => (
						<React.Fragment>
							<h1 className={styles.notesHeader}>{note.NOTE_TITLE}</h1>
							{note.NOTE_SUBTITLES.map((subtitle) => (
								<div className={styles.noteTextWrapper}>
									<h2 className={styles.noteSubtitle}>{subtitle}</h2>
									<div className={styles.noteSections}>
										{note.NOTE_CONTENTS[subtitle].map((item) => (
											<div className={styles.noteSection}>
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
													{item.dates}
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
						</React.Fragment>
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
