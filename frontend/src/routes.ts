// routes.ts
import {
	BioDisplay,
	ChatDisplay,
	HomeDisplay,
	LockDisplay,
	MessagesDisplay,
	ProjectDisplay,
} from "./Display";
import { useNavigation } from "./hooks/useNavigation";
import { useStore } from "./store/store";
import type { Screens } from "./types";

// Define prop types for each component
type LockDisplayProps = { onNotificationClick: () => void };
type HomeDisplayProps = { onOpenApp: (opens: string) => void };
type MessagesDisplayProps = { onSelectThread: () => void };
type ChatDisplayProps = { onBack: () => void };
type ProjectDisplayProps = {};
type BioDisplayProps = {};

// Create a union type of all possible prop types
type ComponentProps =
	| LockDisplayProps
	| HomeDisplayProps
	| MessagesDisplayProps
	| ChatDisplayProps
	| ProjectDisplayProps
	| BioDisplayProps;

export const routes: Record<Screens, React.ComponentType<any>> = {
	lock: LockDisplay,
	home: HomeDisplay,
	messages: MessagesDisplay,
	chat: ChatDisplay,
	project: ProjectDisplay,
	bio: BioDisplay,
};

export const useRoutes = () => {
	const { navigate } = useNavigation();
	const { currentScreen, clearCurrentThreadId } = useStore();

	const handleOpenApp = (opens: string) => {
		if (opens.startsWith("http")) {
			window.open(opens, "_blank");
		} else {
			navigate(opens as Screens);
		}
	};

	const handlePullUp = () => {
		clearCurrentThreadId();
		navigate("home");
	};

	const CurrentComponent = routes[currentScreen];

	const getComponentProps = (): ComponentProps => {
		switch (currentScreen) {
			case "lock":
				return {
					onNotificationClick: () => navigate("messages"),
				} as LockDisplayProps;
			case "home":
				return { onOpenApp: handleOpenApp } as HomeDisplayProps;
			case "messages":
				return {
					onSelectThread: () => navigate("chat"),
				} as MessagesDisplayProps;
			case "chat":
				return {
					onBack: () => {
						clearCurrentThreadId();
						navigate("messages");
					},
				} as ChatDisplayProps;
			case "project":
				return {} as ProjectDisplayProps;
			case "bio":
				return {} as BioDisplayProps;
			default:
				return {} as ComponentProps;
		}
	};

	return {
		CurrentComponent,
		getComponentProps,
		currentScreen,
		handlePullUp,
	};
};
