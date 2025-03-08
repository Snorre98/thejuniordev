import { useEffect } from 'react';
import { Page } from './Components';
import { Screen } from './Components/Screen';
import { Line } from './Components/Screen/components';
import DEFAULT_BG from './assets/background-two.jpg';
import { useRoutes } from './routes';
import { useStore } from './store/store';

const App = () => {
  const { setBackground, setDefaultBackground, backgrounds, defaultBackground } = useStore();
  const { CurrentComponent, getComponentProps, currentScreen, handlePullUp } = useRoutes();

  useEffect(() => {
    setDefaultBackground(DEFAULT_BG);
    setBackground('messages', 'NONE');
    setBackground('chat', 'NONE');
  }, [setBackground, setDefaultBackground]);

  const background = backgrounds[currentScreen] || defaultBackground;
  const showLine = currentScreen !== 'home';

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
          {CurrentComponent && <CurrentComponent {...getComponentProps()} />}
          {showLine && <Line onPullUp={handlePullUp} />}
        </div>
      </Screen>
    </Page>
  );
};

export default App;
