import { Icon } from "@iconify/react";
import { useEffect, useRef, useState } from "react";
import { Screen, type ScreenProps } from "../../Components";
import {
	type Message,
	type Thread,
	fetchMessages,
	getFullIconUrl,
} from "../../api/chatApi";
import styles from "./ChatDisplay.module.scss";
import { ChatMessage } from "./Subcomponents";

interface ChatDisplayProps extends ScreenProps {
	thread: Thread;
	onBack: () => void;
	onPullUp: () => void;
}

export function ChatDisplay({
	onBack,
	onPullUp,
	thread,
	...props
}: ChatDisplayProps) {
	const [messages, setMessages] = useState<Message[]>([]);
	const chatMessagesRef = useRef<HTMLDivElement>(null);

	const sendBtn = document.getElementById("sendBtn");
	const showBtn = () => {
		if (sendBtn) sendBtn.style.display = "block";
	};
	const hideButton = () => {
		if (sendBtn) sendBtn.style.display = "none";
	};

	useEffect(() => {
		loadMessages();
	}, []);

	async function loadMessages() {
		const fetchedMessages = await fetchMessages(thread.id);
		setMessages(fetchedMessages);
	}

	useEffect(() => {
		if (chatMessagesRef.current) {
			chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight;
		}
	}, []);

	return (
		<Screen onBack={onBack} {...props} onPullUp={onPullUp}>
			<div className={styles.chatContainer}>
				<div className={styles.chatHead}>
					<button className={styles.backBtn} onClick={onBack} type="button">
						<Icon
							icon="mdi:arrow-left-drop-circle"
							width="1.2rem"
							height="1.2rem"
						/>
					</button>
					<div className={styles.personaWrapper}>
						<img
							src={getFullIconUrl(thread.user_2.avatar)}
							className={styles.avatar}
							alt="Avatar"
						/>
						<h5 className={styles.chatTitle}>{thread.user_2.user_name}</h5>
					</div>
				</div>
				<div className={styles.chatMessagesWrapper} ref={chatMessagesRef}>
					{messages.map((msg) => (
						<ChatMessage
							key={msg.id}
							messageText={msg.message_text}
							isSender={msg.is_sender}
						/>
					))}
				</div>
				<div className={styles.chatInputContainer}>
					<div className={styles.inputWrapper}>
						<input
							type="text"
							className={styles.chatInput}
							onFocusCapture={showBtn}
							onBlur={hideButton}
						/>
						<button className={styles.sendBtn} id="sendBtn" type="button">
							<Icon icon="mdi:send" width="0.5rem" height="0.5rem" />
						</button>
					</div>
				</div>
			</div>
		</Screen>
	);
}
