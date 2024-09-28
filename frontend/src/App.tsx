import { useEffect } from "react";
import { Page } from "./Components";
import {
	ChatDisplay,
	HomeDisplay,
	LockDisplay,
	MessagesDisplay,
} from "./Display";
import DEFAULT_BG from "./assets/background-two.jpg";
import { useStore } from "./store";

const App = () => {
	const { currentScreen, setScreen, setBackground, setDefaultBackground } =
		useStore();

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

	return (
		<Page>
			{currentScreen === "lock" && (
				<LockDisplay
					notification={{
						onClick: undefined,
						appIcon: undefined,
						notificationTitle: undefined,
						notificationContent: undefined,
					}}
				/>
			)}
			{currentScreen === "home" && <HomeDisplay onOpenApp={handleOpenApp} />}
			{currentScreen === "messages" && <MessagesDisplay />}
			{currentScreen === "bio" && <MessagesDisplay />}
			{currentScreen === "portfolio" && <MessagesDisplay />}
			{currentScreen === "cv" && <MessagesDisplay />}
			{currentScreen === "chat" && (
				<ChatDisplay
					onBack={() => setScreen("messages")}
					onPullUp={() => setScreen("home")}
				/>
			)}
			{/* Add more screens as needed */}
		</Page>
	);
};

export default App;
