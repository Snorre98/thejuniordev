import { useEffect, useState } from 'react';
import { Page } from './Components';
import { Screen } from './Components/Screen';
import { Line } from './Components/Screen/components';
import { BioDisplay, ChatDisplay, HomeDisplay, LockDisplay, MessagesDisplay, ProjectDisplay } from './Display';
import type { Thread } from './api/chatApi';
import DEFAULT_BG from './assets/background-two.jpg';
import { useStore } from './store';

const App = () => {
  const { currentScreen, setScreen, setBackground, setDefaultBackground } = useStore();
  const [selectedThread, setSelectedThread] = useState<Thread | null>(null);

  useEffect(() => {
    setDefaultBackground(DEFAULT_BG);
    setBackground('messages', 'NONE');
    setBackground('chat', 'NONE');
  }, [setDefaultBackground, setBackground]);

  const handleOpenApp = (opens: string) => {
    if (opens.startsWith('http')) {
      window.open(opens, '_blank');
    } else {
      setScreen(opens as any);
    }
  };

  const pullUpBehaviors = {
    lock: () => setScreen('home'),
    chat: () => setScreen('home'),
    messages: () => setScreen('home'),
    bio: () => setScreen('home'),
    projects: () => setScreen('home'),
  };

  const handlePullUp = () => {
    const behavior = pullUpBehaviors[currentScreen as keyof typeof pullUpBehaviors];
    if (behavior) {
      behavior();
    } else {
      setScreen('home');
    }
  };

  const renderCurrentScreen = () => {
    switch (currentScreen) {
      case 'lock':
        return (
          <LockDisplay
            onNotificationClick={() => {
              setScreen('messages');
            }}
          />
        );
      case 'home':
        return <HomeDisplay onOpenApp={handleOpenApp} />;
      case 'messages':
        return (
          <MessagesDisplay
            onSelectThread={(thread: Thread) => {
              setSelectedThread(thread);
              setScreen('chat');
            }}
          />
        );
      case 'chat':
        return selectedThread ? (
          <ChatDisplay thread={selectedThread} onBack={() => setScreen('messages')} />
        ) : (
          <MessagesDisplay
            onSelectThread={(thread: Thread) => {
              setSelectedThread(thread);
              setScreen('chat');
            }}
          />
        );
      case 'project':
        return <ProjectDisplay />;
      case 'bio':
        return <BioDisplay />;
      default:
        return (
          <LockDisplay
            onNotificationClick={() => {
              setScreen('messages');
            }}
          />
        );
    }
  };

  const { backgrounds, defaultBackground } = useStore();
  const background = backgrounds[currentScreen] || defaultBackground;
  const showLine = currentScreen in pullUpBehaviors;
  return (
    <Page>
      <Screen>
        <div
          style={{
            backgroundImage: background === 'NONE' ? 'none' : background ? `url(${background})` : 'none',
            height: '100%',
            width: '100%',
            position: 'relative',
          }}
        >
          {renderCurrentScreen()}
          {showLine && <Line onPullUp={handlePullUp} />}
        </div>
      </Screen>
    </Page>
  );
};

export default App;
