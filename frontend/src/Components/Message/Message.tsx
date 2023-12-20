import styles from "./Message.module.scss";
import photo from "../../assets/messenger_placeholder.png";

export function Message() {
  return (
    <>
      <div className={styles.messageContainer}>
        <img className={styles.senderPhoto} src={photo} />
        <div className={styles.messageContent}>
          <div className={styles.messageHead}>
            <span className={styles.messageSender}>Snorre</span>
            <span className={styles.messageDay}>Lørdag</span>
          </div>
          <p className={styles.message}>
            This is a message. This is a message. This is a mess This is a
            message. This is a message. This is a mess This is a message. This
            is a message. This is a mess
          </p>
        </div>
      </div>
    </>
  );
}
