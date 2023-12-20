import { Message } from "..";
import styles from "./MessagesScreen.module.scss";

export function MessagesScreen() {
  return (
    <>
      <div className={styles.messagesContainer}>
        <div className={styles.msgScreenTitle}>
          <span>Rediger</span>
          <h5 className={styles.messageScreenTitle}>Meldinger</h5>
          <span>Ny</span>
        </div>
        <input className={styles.searchBar} placeholder="søk" type="text" />
        <Message />
        <Message />
        <Message />
        <Message />
      </div>
    </>
  );
}
