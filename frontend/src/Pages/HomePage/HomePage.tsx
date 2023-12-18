//import styles from "./HomePage.module.scss";
import { LockScreen, Screen, HomeScreen } from "../../Components";

export function HomePage() {
  return <Screen topScreen={<LockScreen />} bottomScreen={<HomeScreen />} />;
}
