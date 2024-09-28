import styles from "./Message.module.scss";

type MessageProps = {
	onClick?: () => void;
	message: string;
	avatar: string;
	sender: string;
	thread: string;
};

export function Message({ ...props }: MessageProps) {
	return (
		<>
			<div className={styles.messageContainer} {...props}>
				<img className={styles.senderPhoto} src={props.avatar} />
				<div className={styles.messageContent}>
					<div className={styles.messageHead}>
						<span className={styles.messageSender}>{props.sender}</span>
						<span className={styles.messageDay}>Lørdag</span>
					</div>
					<p className={styles.message}>{props.message}</p>
				</div>
			</div>
		</>
	);
}
