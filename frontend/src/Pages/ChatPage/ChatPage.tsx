import styles from "./ChatPage.module.scss";
import { ChatScreen, Screen } from "../../Components";

export function ChatPage() {
  return (
    <Screen
      animated={true}
      topScreen={<ChatScreen />}
      bottomScreen={<h1>bottom</h1>}
      defaultScreen={"top"}></Screen>
  );
}
