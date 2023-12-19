//import styles from "./HomePage.module.scss";
import { LockScreen, Screen, HomeScreen, AppIcon } from "../../Components";
import map from "../../assets/Map.png";
import appstore from "../../assets/AppStore.png";
import safari from "../../assets/Safari.png";
import photos from "../../assets/Photos.png";
export function HomePage() {
  return (
    <Screen
      topScreen={<LockScreen />}
      bottomScreen={
        <HomeScreen
          app1={<AppIcon appTitle="Safari" iconURL={appstore} />}
          app2={<AppIcon appTitle="Safari" iconURL={safari} />}
          app3={<AppIcon appTitle="Safari" iconURL={photos} />}
          app4={<AppIcon appTitle="Safari" iconURL={safari} />}
          app5={<AppIcon appTitle="Safari" iconURL={appstore} />}
          app6={<AppIcon appTitle="Safari" iconURL={safari} />}
          app7={<AppIcon appTitle="Safari" iconURL={photos} />}
          app8={<AppIcon appTitle="Safari" iconURL={safari} />}
          app9={<AppIcon appTitle="Safari" iconURL={safari} />}
          app10={<AppIcon appTitle="Bio" iconURL={map} />}
          app11={<AppIcon appTitle="Safari" iconURL={photos} />}
          fApp1={<AppIcon iconURL={photos} />}
          fApp2={<AppIcon iconURL={photos} />}
          fApp3={<AppIcon iconURL={photos} />}
        />
      }
    />
  );
}
