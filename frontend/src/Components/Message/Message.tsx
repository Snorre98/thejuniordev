import styles from './Message.module.scss';
import lemur from '../../assets/lemur-avatar.jpg';

type MessageProps = {
  onClick?: () => void;
  message: string;
  photoURL: string;
  sender: string;
};

export function Message({ onClick, message, photoURL = lemur, sender = 'N/A' }: MessageProps) {
  return (
    <>
      <div className={styles.messageContainer} onClick={onClick}>
        <img className={styles.senderPhoto} src={photoURL} />
        <div className={styles.messageContent}>
          <div className={styles.messageHead}>
            <span className={styles.messageSender}>{sender}</span>
            <span className={styles.messageDay}>Lørdag</span>
          </div>
          <p className={styles.message}>{message}</p>
        </div>
      </div>
    </>
  );
}
