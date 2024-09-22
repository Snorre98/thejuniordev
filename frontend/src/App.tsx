import { useStore } from './store'
import { LockDisplay, MessagesDisplay, HomeDisplay, ChatDisplay } from './Display';
import { AppButton, Page } from './Components';
import map from "./assets/Map.png";
import appstore from "./assets/AppStore.png";
import safari from "./assets/Safari.png";
import photos from "./assets/Photos.png";
import imessage from "./assets/imessage.png";

const App = () => {
  const { currentScreen, setScreen } = useStore();

  // Placeholder data for apps
  const appData = [
    { title: "Bio", icon: appstore, onOpenApp: () => window.open('https://linkedin.com', '_blank') },
    { title: "Portfolio", icon: safari, onOpenApp: () => window.open('https://linkedin.com', '_blank') },
    { title: "CV", icon: photos, onOpenApp: () => window.open('https://linkedin.com', '_blank') },
    { title: "LinkedIn", icon: map, onOpenApp: () => window.open('https://linkedin.com', '_blank') },
    { title: "GitHub", icon: appstore, onOpenApp: () => window.open('https://github.com', '_blank') },
    { title: "imessage", icon: safari, onOpenApp: () => setScreen('messages') },
    // Add more apps as needed
  ];

  // Placeholder data for favorite apps
  const favoriteAppData = [
    { icon: imessage, onOpenApp: () => setScreen('messages') },
    { icon: imessage, onOpenApp: () => setScreen('messages') },
    { icon: imessage, onOpenApp: () => setScreen('messages') },
  ];

  const apps = appData.map((app, index) => (
    <AppButton key={index} appTitle={app.title} iconURL={app.icon} onOpenApp={app.onOpenApp} />
  ));

  const favoriteApps = favoriteAppData.map((app, index) => (
    <AppButton key={index} iconURL={app.icon} onOpenApp={app.onOpenApp} />
  ));

  return (
    <Page>
      {currentScreen === 'lock' && <LockDisplay />}
      {currentScreen === 'home' && <HomeDisplay apps={apps} favoriteApps={favoriteApps} />}
      {currentScreen === 'messages' && <MessagesDisplay />}
      {currentScreen === 'bio' && <MessagesDisplay />}
      {currentScreen === 'portfolio' && <MessagesDisplay />}
      {currentScreen === 'cv' && <MessagesDisplay />}
      {currentScreen === 'chat' && <ChatDisplay onBack={() => setScreen('messages')}/>}
      {/* Add more screens as needed */}
    </Page>
  )
}

export default App