import { useEffect, useState } from "react";
import { Page } from "./Components";
import {
	ChatDisplay,
	HomeDisplay,
	LockDisplay,
	MessagesDisplay,
	ProjectDisplay,
} from "./Display";
import type { Thread } from "./api/chatApi";
import DEFAULT_BG from "./assets/background-two.jpg";
import { useStore } from "./store";

const App = () => {
	const { currentScreen, setScreen, setBackground, setDefaultBackground } =
		useStore();
	const [selectedThread, setSelectedThread] = useState<Thread | null>(null);

	useEffect(() => {
		setDefaultBackground(DEFAULT_BG);
		setBackground("messages", "NONE");
		setBackground("chat", "NONE"); // No background for messages screen
	}, [setDefaultBackground, setBackground]);

	const handleOpenApp = (opens: string) => {
		if (opens.startsWith("http")) {
			window.open(opens, "_blank");
		} else {
			setScreen(opens as string); // Cast to any as setScreen might not accept all string values
		}
	};

	const handleSelectThread = (thread: Thread) => {
		setSelectedThread(thread);
		setScreen("chat");
	};

	const handleNotificationClick = () => {
		setScreen("messages");
	};

	return (
		<Page>
			{currentScreen === "lock" && (
				<LockDisplay
					onPullUp={() => setScreen("home")}
					onNotificationClick={handleNotificationClick}
				/>
			)}
			{currentScreen === "home" && <HomeDisplay onOpenApp={handleOpenApp} />}
			{currentScreen === "messages" && (
				<MessagesDisplay
					onSelectThread={handleSelectThread}
					onPullUp={() => setScreen("home")}
				/>
			)}
			{currentScreen === "chat" && selectedThread && (
				<ChatDisplay
					thread={selectedThread}
					onBack={() => setScreen("messages")}
					onPullUp={() => setScreen("home")}
				/>
			)}
			{currentScreen === "project" && <ProjectDisplay />}
		</Page>
	);
};

export default App;
