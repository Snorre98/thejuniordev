import {
  AppIcon,
  HomeScreen,
  LockScreen,
  MessagesScreen,
  Screen,
} from "../../Components";
import map from "../../assets/Map.png";
import appstore from "../../assets/AppStore.png";
import safari from "../../assets/Safari.png";
import photos from "../../assets/Photos.png";
import styles from "./MessagesPage.module.scss";

export function MessagesPage() {
  return (
    <>
      {/* <Screen
        defaultScreen="bottom"
        animated={false}
        topScreen={<LockScreen />}
        bottomScreen={<MessagesScreen />}></Screen> */}
      <Screen
        //defaultScreen="bottom"
        animated={true}
        topScreen={<MessagesScreen />}
        bottomScreen={
          <HomeScreen
            app1={<AppIcon appTitle="Bio" iconURL={appstore} />}
            app2={<AppIcon appTitle="Portfolio" iconURL={safari} />}
            app3={<AppIcon appTitle="CV" iconURL={photos} />}
            app4={<AppIcon appTitle="LinkedIn" iconURL={map} />}
            app5={<AppIcon appTitle="GitHub" iconURL={appstore} />}
            app6={<AppIcon appTitle="Studies" iconURL={safari} />}
            app7={<AppIcon appTitle="Settings" iconURL={map} />}
            app8={<AppIcon appTitle="Messages" iconURL={safari} />}
            // app9={<AppIcon appTitle="Safari" iconURL={safari} />}
            // app10={<AppIcon appTitle="Bio" iconURL={map} />}
            // app11={<AppIcon appTitle="Safari" iconURL={photos} />}
            fApp1={<AppIcon iconURL={photos} />}
            fApp2={<AppIcon iconURL={photos} />}
            fApp3={<AppIcon iconURL={photos} />}
          />
        }></Screen>
    </>
  );
}
