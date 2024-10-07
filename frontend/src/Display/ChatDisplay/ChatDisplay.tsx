import { Icon } from "@iconify/react";
import { useEffect, useRef, useState } from "react";
import type { ScreenProps } from "../../Components";
import {
	type Message,
	type Thread,
	fetchMessages,
	fetchThreads,
	getFullIconUrl,
} from "../../api/chatApi";
import { useStore } from "../../store/store";
import styles from "./ChatDisplay.module.scss";
import { ChatMessage } from "./Subcomponents";

interface ChatDisplayProps extends ScreenProps {
	onBack: () => void;
}

export function ChatDisplay({ onBack }: ChatDisplayProps) {
	const [messages, setMessages] = useState<Message[]>([]);
	const [thread, setThread] = useState<Thread | null>(null);
	const chatMessagesRef = useRef<HTMLDivElement>(null);
	const { currentThreadId } = useStore();

	const sendBtn = document.getElementById("sendBtn");
	const showBtn = () => {
		if (sendBtn) sendBtn.style.display = "block";
	};
	const hideButton = () => {
		if (sendBtn) sendBtn.style.display = "none";
	};

	useEffect(() => {
		const loadThreadAndMessages = async () => {
			if (currentThreadId) {
				const threads = await fetchThreads();
				const currentThread = threads.find((t) => t.id === currentThreadId);
				if (currentThread) {
					setThread(currentThread);
					const fetchedMessages = await fetchMessages(currentThreadId);
					setMessages(fetchedMessages);
				}
			}
		};

		loadThreadAndMessages();
	}, [currentThreadId]);

	useEffect(() => {
		if (chatMessagesRef.current) {
			chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight;
		}
	}, [messages]);

	if (!thread) {
		return <div>Loading...</div>;
	}

	return (
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
	);
}
