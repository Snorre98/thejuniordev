import {
	BioDisplay,
	ChatDisplay,
	ErrorDisplay,
	HomeDisplay,
	LockDisplay,
	MessagesDisplay,
	ProjectDisplay,
} from "./Display";
import { useNavigation } from "./hooks/useNavigation";
import { useStore } from "./store/store";
import type { Screens } from "./types";

type LockDisplayProps = { onNotificationClick: () => void };
type HomeDisplayProps = { onSelectApp: (appId: number) => void };
type MessagesDisplayProps = { onSelectThread: () => void };
type ChatDisplayProps = { onBack: () => void };
type ProjectDisplayProps = {};
type BioDisplayProps = {};

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
	error: ErrorDisplay,
	loading: LockDisplay,
};

export const useRoutes = () => {
	const { navigate } = useNavigation();
	const { currentScreen, clearCurrentThreadId, setCurrentAppId } = useStore();

	const handleSelectApp = (appId: number) => {
		setCurrentAppId(appId);
		navigate("project");
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
				return {
					onSelectApp: handleSelectApp,
				} as HomeDisplayProps;
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
