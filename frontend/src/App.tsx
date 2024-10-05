import { useEffect } from 'react';
import { Page } from './Components';
import { Screen } from './Components/Screen';
import { Line } from './Components/Screen/components';
import DEFAULT_BG from './assets/background-two.jpg';
import { useNavigation } from './hooks/useNavigation';
import { useStore } from './store';

const App = () => {
  const { setBackground, setDefaultBackground } = useStore();
  const { getCurrentRoute, navigate, params } = useNavigation();

  useEffect(() => {
    setDefaultBackground(DEFAULT_BG);
    setBackground('messages', 'NONE');
    setBackground('chat', 'NONE');
  }, [setDefaultBackground, setBackground]);

  const handleOpenApp = (opens: string) => {
    if (opens.startsWith('http')) {
      window.open(opens, '_blank');
    } else {
      navigate(`/${opens}`);
    }
  };

  const handlePullUp = () => {
    navigate('/home');
  };

  const { backgrounds, defaultBackground, currentScreen } = useStore();
  const background = backgrounds[currentScreen] || defaultBackground;
  const showLine = currentScreen !== 'home';

  const CurrentComponent = getCurrentRoute()?.component;

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
          {CurrentComponent && (
            <CurrentComponent
              //   onNotificationClick={function (): void {
              // 			  throw new Error('Function not implemented.');
              // 		  } } onBack={undefined} onSelectThread={function (thread: Thread): void {
              // 			  throw new Error('Function not implemented.');
              // 		  } } thread={undefined} onOpenApp={handleOpenApp}

              {...params}
            />
          )}
          {showLine && <Line onPullUp={handlePullUp} />}
        </div>
      </Screen>
    </Page>
  );
};

export default App;
