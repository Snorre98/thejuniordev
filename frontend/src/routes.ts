import {
  BioDisplay,
  ChatDisplay,
  ErrorDisplay,
  HomeDisplay,
  LockDisplay,
  MessagesDisplay,
  ProjectDisplay,
} from './Display';
import { useNavigation } from './hooks/useNavigation';
import { useStore } from './store/store';
import type { Screens } from './types';

type LockDisplayProps = { onNotificationClick: () => void };
type HomeDisplayProps = { onSelectApp: (appId: number) => void };
type MessagesDisplayProps = { onSelectThread: () => void };
type ChatDisplayProps = { onBack: () => void };
type ProjectDisplayProps = Record<string, never>;
type BioDisplayProps = Record<string, never>;

// Union type of all possible props
type RouteComponentProps =
  | LockDisplayProps
  | HomeDisplayProps
  | MessagesDisplayProps
  | ChatDisplayProps
  | ProjectDisplayProps
  | BioDisplayProps;

// Define a type for your route components
export const routes: Record<Screens, React.ComponentType<RouteComponentProps>> = {
  lock: LockDisplay as React.ComponentType<RouteComponentProps>,
  home: HomeDisplay as React.ComponentType<RouteComponentProps>,
  messages: MessagesDisplay as React.ComponentType<RouteComponentProps>,
  chat: ChatDisplay as React.ComponentType<RouteComponentProps>,
  project: ProjectDisplay as React.ComponentType<RouteComponentProps>,
  bio: BioDisplay as React.ComponentType<RouteComponentProps>,
  error: ErrorDisplay as unknown as React.ComponentType<RouteComponentProps>,
  loading: LockDisplay as React.ComponentType<RouteComponentProps>,
};

export const useRoutes = () => {
  const { navigate } = useNavigation();
  const { currentScreen, clearCurrentThreadId, setCurrentAppId } = useStore();

  const handleSelectApp = (appId: number) => {
    setCurrentAppId(appId);
    navigate('project');
  };

  const handlePullUp = () => {
    clearCurrentThreadId();
    navigate('home');
  };

  const CurrentComponent = routes[currentScreen];

  const getComponentProps = (): RouteComponentProps => {
    switch (currentScreen) {
      case 'lock':
        return {
          onNotificationClick: () => navigate('messages'),
        } as LockDisplayProps;
      case 'home':
        return {
          onSelectApp: handleSelectApp,
        } as HomeDisplayProps;
      case 'messages':
        return {
          onSelectThread: () => navigate('chat'),
        } as MessagesDisplayProps;
      case 'chat':
        return {
          onBack: () => {
            clearCurrentThreadId();
            navigate('messages');
          },
        } as ChatDisplayProps;
      case 'project':
        return {} as ProjectDisplayProps;
      case 'bio':
        return {} as BioDisplayProps;
      default:
        return {} as RouteComponentProps;
    }
  };

  return {
    CurrentComponent,
    getComponentProps,
    currentScreen,
    handlePullUp,
  };
};
