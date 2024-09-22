import styles from "./ChatDisplay.module.scss";
import avatar from "../../assets/Map.png";
import {ChatMessage} from "./Subcomponents";
import { Screen, ScreenProps } from '../../Components';
import { Icon } from '@iconify/react';
import { ReactNode, useEffect, useRef } from "react";
interface ChatDisplayProps extends ScreenProps {
  children?: ReactNode;
}
export function ChatDisplay({onBack, onPullUp, ...props}: ChatDisplayProps) {
  const sendBtn = document.getElementById("sendBtn");
  const chatMessagesRef = useRef<HTMLDivElement>(null);
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
  
  useEffect(() => {
    if (chatMessagesRef.current) {
      chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight;
    }
  }, []);
 
  return (
    <Screen onBack={onBack} {...props} onPullUp={onPullUp}>
    <div className={styles.chatContainer}>
      <div className={styles.chatHead}>
        <button className={styles.backBtn} onClick={onBack}><Icon icon="mdi:arrow-left-drop-circle" width="1.2rem" height="1.2rem" /></button>
        <div className={styles.personaWrapper}>
          <img src={avatar} className={styles.avatar} />
          <h5 className={styles.chatTitle}>Snorre</h5>
        </div>
      </div>
        <div className={styles.chatMessagesWrapper} ref={chatMessagesRef}>
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
  <div className={styles.inputWrapper}>
    <input
      type="text"
      className={styles.chatInput}
      onFocusCapture={showBtn}
      onBlur={hideButton}
    />
    <button className={styles.sendBtn} id="sendBtn">
      <Icon icon="mdi:send" width="0.5rem" height="0.5rem" />
    </button>
  </div>
</div>
    </div>
    </Screen>
  );
}