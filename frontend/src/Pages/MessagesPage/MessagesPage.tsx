// import { Bezel } from "../../Components/Bezel";
import { Screen } from "../../Components";
import styles from "./MessagesPage.module.scss";

export function MessagesPage() {
  return (
    <>
      <Screen
        topScreen={
          <div className={styles.messagePageContainer}>
            <h1>MESSAGES PAGE</h1>
          </div>
        }></Screen>
    </>
  );
}
