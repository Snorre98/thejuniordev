import { Message } from "../../Components";
import styles from "./MessagesScreen.module.scss";
import photo from "../../assets/Photos.png";

type MessagesScreenProps = {
  onBack: () => void;
};

export function MessagesScreen({ onBack }: MessagesScreenProps) {
  return (
    <>
      <div className={styles.messagesContainer}>
        <div className={styles.msgScreenTitle}>
          <span onClick={onBack}>Back</span>
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