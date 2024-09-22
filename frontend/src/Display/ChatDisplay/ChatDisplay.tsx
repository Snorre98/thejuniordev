import styles from "./ChatDisplay.module.scss";
import avatar from "../../assets/Map.png";
import {ChatMessage} from "./Subcomponents";
import { Screen, ScreenProps } from '../../Components';
import { Icon } from '@iconify/react';
import { ReactNode } from "react";
interface ChatDisplayProps extends ScreenProps {
  children?: ReactNode;
}
export function ChatDisplay({onBack, ...props}: ChatDisplayProps) {
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
    <Screen onBack={onBack} {...props}>
    <div className={styles.chatContainer}>
      <div className={styles.chatHead}>
        <button className={styles.backBtn} onClick={onBack}><Icon icon="mdi:arrow-left-drop-circle" width="1.2rem" height="1.2rem" /></button>
        <div className={styles.personaWrapper}>
          <img src={avatar} className={styles.avatar} />
          <h5 className={styles.chatTitle}>Snorre</h5>
        </div>
      </div>
        <div className={styles.chatMessagesWrapper}>
            <ChatMessage messageText={"lorem ipsumas dasd sd asclsdkfølasd føksjdø. lorem ipsumas dasd sd asclsdkfølasd føksjdø. lorem ipsumas dasd sd asclsdkfølasd føksjdø"} isSender={true}/>
            <ChatMessage messageText={"lorem ipsumas dasd sd asclsdkfølasd føksjdø"} isSender={false}/>
            <ChatMessage messageText={"lorem ipsumas dasd sd asclsdkfølasd føksjdø"} isSender={true}/>
            <ChatMessage messageText={"lorem ipsumas dasd sd asclsdkfølasd føksjdø"} isSender={false}/>
            <ChatMessage messageText={"lorem ipsumas dasd sd asclsdkfølasd føksjdø"} isSender={true}/>
            <ChatMessage messageText={"lorem ipsumas dasd sd asclsdkfølasd føksjdø"} isSender={false}/>
            <ChatMessage messageText={"lorem ipsumas dasd sd asclsdkfølasd føksjdø"} isSender={true}/>
            <ChatMessage messageText={"lorem ipsumas dasd sd asclsdkfølasd føksjdø"} isSender={false}/>
            <ChatMessage messageText={"lorem ipsumas dasd sd asclsdkfølasd føksjdø"} isSender={true}/>
            <ChatMessage messageText={"lorem ipsumas dasd sd asclsdkfølasd SISTE"} isSender={false}/>
        </div>
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
    </Screen>
  );
}