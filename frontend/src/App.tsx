import { useStore } from './store'
import { LockScreen, MessagesScreen, HomeScreen } from './Screens';
import { AppButton } from './Components';
import map from "./assets/Map.png";
import appstore from "./assets/AppStore.png";
import safari from "./assets/Safari.png";
import photos from "./assets/Photos.png";

const App = () => {
  const { currentScreen, setScreen } = useStore()

  // Placeholder data for apps
  const appData = [
    { title: "Bio", icon: appstore, onOpenApp: () => window.open('https://linkedin.com', '_blank') },
    { title: "Portfolio", icon: safari, onOpenApp: () => window.open('https://linkedin.com', '_blank') },
    { title: "CV", icon: photos, onOpenApp: () => window.open('https://linkedin.com', '_blank') },
    { title: "LinkedIn", icon: map, onOpenApp: () => window.open('https://linkedin.com', '_blank') },
    { title: "GitHub", icon: appstore, onOpenApp: () => window.open('https://github.com', '_blank') },
    { title: "Studies", icon: safari, onOpenApp: () => setScreen('messages') },
    // Add more apps as needed
  ];

  // Placeholder data for favorite apps
  const favoriteAppData = [
    { icon: photos, onOpenApp: () => setScreen('messages') },
    { icon: photos, onOpenApp: () => setScreen('messages') },
    { icon: photos, onOpenApp: () => setScreen('messages') },
  ];

  const apps = appData.map((app, index) => (
    <AppButton key={index} appTitle={app.title} iconURL={app.icon} onOpenApp={app.onOpenApp} />
  ));

  const favoriteApps = favoriteAppData.map((app, index) => (
    <AppButton key={index} iconURL={app.icon} onOpenApp={app.onOpenApp} />
  ));

  return (
    <div className="app-container">
      {currentScreen === 'lock' && <LockScreen onUnlock={() => setScreen('home')} />}
      {currentScreen === 'home' && <HomeScreen apps={apps} favoriteApps={favoriteApps} />}
      {currentScreen === 'messages' && <MessagesScreen onBack={() => setScreen('home')} />}
      {currentScreen === 'bio' && <MessagesScreen onBack={() => setScreen('home')} />}
      {currentScreen === 'portfolio' && <MessagesScreen onBack={() => setScreen('home')} />}
      {currentScreen === 'cv' && <MessagesScreen onBack={() => setScreen('home')} />}
      {/* Add more screens as needed */}
    </div>
  )
}

export default App