// src/Pages/HomePage.tsx
import { AppButton, HomeScreen } from "../../Components";
import { useStore } from "../../store";
import map from "../../assets/Map.png";
import appstore from "../../assets/AppStore.png";
import safari from "../../assets/Safari.png";
import photos from "../../assets/Photos.png";

export function HomePage() {
  const { setScreen } = useStore();

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
    <HomeScreen
      apps={apps}
      favoriteApps={favoriteApps}
    />
  );
}