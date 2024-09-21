import { LockScreen, Screen, HomeScreen, AppButton } from "../../Components";
import map from "../../assets/Map.png";
import appstore from "../../assets/AppStore.png";
import safari from "../../assets/Safari.png";
import photos from "../../assets/Photos.png";

// Placeholder data for apps
const appData = [
  { title: "Bio", icon: appstore },
  { title: "Portfolio", icon: safari },
  { title: "CV", icon: photos },
  { title: "LinkedIn", icon: map },
  { title: "GitHub", icon: appstore },
  { title: "Studies", icon: safari },
  { title: "LinkedIn", icon: map },
  { title: "GitHub", icon: appstore },
  { title: "Studies", icon: safari },
  { title: "LinkedIn", icon: map },
  { title: "GitHub", icon: appstore },
  { title: "Studies", icon: safari },
  { title: "LinkedIn", icon: map },
  { title: "GitHub", icon: appstore },
  { title: "Studies", icon: safari },
  // Add more apps as needed
];

// Placeholder data for favorite apps
const favoriteAppData = [
  { icon: photos },
  { icon: photos },
  { icon: photos },
];

export function HomePage() {
  const apps = appData.map((app, index) => (
    <AppButton key={index} appTitle={app.title} iconURL={app.icon} />
  ));

  const favoriteApps = favoriteAppData.map((app, index) => (
    <AppButton key={index} iconURL={app.icon} />
  ));

  return (
    <Screen
      animated={true}
      topScreen={<LockScreen />}
      bottomScreen={
        <HomeScreen
          apps={apps}
          favoriteApps={favoriteApps}
        />
      }
    />
  );
}