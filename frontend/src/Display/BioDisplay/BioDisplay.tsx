import { Icon } from "@iconify/react/dist/iconify.js";
import React, { useState } from "react";
import { CommingSoon, Screen } from "../../Components";
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
						dates: "September 2022 - nå",
					},
					{
						completed: true,
						title: "NTNU - jobb",
						description: "På Samfundet",
						dates: "September 2022 - nå",
					},
				],
				Utdanning: [
					{
						completed: false,
						title: "NTNU - Informatikk",
						description: "Bachelorgrad",
						dates: "August 2022 - nå",
					},
					{
						completed: true,
						title: "NTNU - Kjemi",
						description: "Bachelorgrad",
						dates: "August 2022 - nå",
					},
				],
			},
		},
	],
};

export function BioDisplay() {
	const [showComingSoon, setShowComingSoon] = useState(false);

	const handleBackClick = () => {
		setShowComingSoon(true);
		setTimeout(() => setShowComingSoon(false), 1500);
	};
	return (
		<Screen>
			{showComingSoon && (
				<CommingSoon
					message="The 'back' feature is coming soon!"
					duration={1500}
				/>
			)}
			<div className={styles.bioDisplayContainer}>
				<div className={styles.notesActionRack}>
					<button type="button" onClick={handleBackClick}>
						back - Notater
					</button>
					<Icon
						icon={"ion:share-outline"}
						width={"2rem"}
						height={"2rem"}
						color="white"
					/>
					<Icon
						icon={"system-uicons:circle-menu"}
						width={"2rem"}
						height={"2rem"}
					/>
				</div>
				<div className={styles.noteContent}>
					{MOCK_DATA.NOTES_MOCK.map((note) => (
						<React.Fragment>
							<h1 className={styles.noteHeader}>{note.NOTE_TITLE}</h1>
							{note.NOTE_SUBTITLES.map((subtitle) => (
								<div className={styles.noteTextWrapper}>
									<h4 className={styles.noteSubtitle}>{subtitle}</h4>
									<div className={styles.noteSections}>
										{note.NOTE_CONTENTS[subtitle].map((item) => (
											<div className={styles.noteSection}>
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
												<p className={styles.noteItemTitle}>{item.title}</p>
												<p className={styles.noteItemDescription}>
													{item.description}
												</p>
												<p className={styles.noteItemDates}>{item.dates}</p>
											</div>
										))}
									</div>
								</div>
							))}
						</React.Fragment>
					))}
				</div>
			</div>
		</Screen>
	);
}
