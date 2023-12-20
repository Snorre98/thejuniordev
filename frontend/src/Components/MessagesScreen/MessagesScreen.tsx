import { Message } from "..";
import styles from "./MessagesScreen.module.scss";
import photo from "../../assets/Photos.png";

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
        <Message
          message={`test image, test image, test image. This is a test. 
            Tests. test image, test image, test image. This is a test. Tests.`}
          photoURL={photo}
          sender={"Snorre"}
        />
        <Message
          message={`test image, test image, test image. This is a test. 
            Tests. test image, test image, test image. This is a test. Tests.`}
          photoURL={photo}
          sender={"Snorre"}
        />
        <Message
          message={`test image, test image, test image. This is a test. 
            Tests. test image, test image, test image. This is a test. Tests.`}
          photoURL={photo}
          sender={"Snorre"}
        />
        <Message
          message={`test image, test image, test image. This is a test. 
            Tests. test image, test image, test image. This is a test. Tests.`}
          photoURL={photo}
          sender={"Snorre"}
        />
      </div>
    </>
  );
}
