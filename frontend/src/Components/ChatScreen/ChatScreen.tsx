import styles from "./ChatScreen.module.scss";
import avatar from "../../assets/Map.png";
export function ChatScreen() {
  const sendBtn = document.getElementById("sendBtn");
  const showBtn = () => {
    if (sendBtn) {
      sendBtn.style.display = "block";
    }
  };
  const hideButton = () => {
    if (sendBtn) {
      sendBtn.style.display = "none";
    }
  };
  return (
    <div className={styles.chatContainer}>
      <div className={styles.chatHead}>
        <button className={styles.backBtn}></button>
        <div>
          <img src={avatar} className={styles.avatar} />
          <h5 className={styles.chatTitle}>Snorre</h5>
        </div>
      </div>
      <p className={styles.chatMessage}>
        Hei! Loerer asdad asdas dasdajddals ddd asd{" "}
      </p>
      <div className={styles.chatInputContainer}>
        <input
          type="text"
          className={styles.chatInput}
          onFocusCapture={showBtn}
          onBlur={hideButton}
        />
        <button className={styles.sendBtn} id="sendBtn"></button>
      </div>
    </div>
  );
}
