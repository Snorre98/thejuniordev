import { useEffect } from "react";
import { AppButton, Page } from "./Components";
import {
	ChatDisplay,
	HomeDisplay,
	LockDisplay,
	MessagesDisplay,
} from "./Display";
import appstore from "./assets/AppStore.png";
import map from "./assets/Map.png";
import photos from "./assets/Photos.png";
import safari from "./assets/Safari.png";
import imessage from "./assets/imessage.png";
import DEFAULT_BG from "./assets/placeholder-background.jpg";
import { useStore } from "./store";

const App = () => {
	const { currentScreen, setScreen, setBackground, setDefaultBackground } =
		useStore();

	useEffect(() => {
		setDefaultBackground(DEFAULT_BG);
		setBackground("messages", "NONE");
		setBackground("chat", "NONE"); // No background for messages screen
	}, [setDefaultBackground, setBackground]);

	// Placeholder data for apps
	const appData = [
		{
			title: "Bio",
			icon: appstore,
			onOpenApp: () => window.open("https://linkedin.com", "_blank"),
		},
		{
			title: "Portfolio",
			icon: safari,
			onOpenApp: () => window.open("https://linkedin.com", "_blank"),
		},
		{
			title: "CV",
			icon: photos,
			onOpenApp: () => window.open("https://linkedin.com", "_blank"),
		},
		{
			title: "LinkedIn",
			icon: map,
			onOpenApp: () => window.open("https://linkedin.com", "_blank"),
		},
		{
			title: "GitHub",
			icon: appstore,
			onOpenApp: () => window.open("https://github.com", "_blank"),
		},
		{ title: "imessage", icon: safari, onOpenApp: () => setScreen("messages") },
		// Add more apps as needed
	];

	// Placeholder data for favorite apps
	const favoriteAppData = [
		{ icon: imessage, onOpenApp: () => setScreen("messages") },
		{ icon: imessage, onOpenApp: () => setScreen("messages") },
		{ icon: imessage, onOpenApp: () => setScreen("messages") },
	];

	const apps = appData.map((app, index) => (
		<AppButton
			key={index}
			appTitle={app.title}
			iconURL={app.icon}
			onOpenApp={app.onOpenApp}
		/>
	));

	const favoriteApps = favoriteAppData.map((app, index) => (
		<AppButton key={index} iconURL={app.icon} onOpenApp={app.onOpenApp} />
	));

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
			{currentScreen === "home" && (
				<HomeDisplay apps={apps} favoriteApps={favoriteApps} />
			)}
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
