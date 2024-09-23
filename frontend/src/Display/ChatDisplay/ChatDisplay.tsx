import styles from "./ChatDisplay.module.scss";
import avatar from "../../assets/Map.png";
import { ChatMessage } from "./Subcomponents";
import { Screen, ScreenProps } from '../../Components';
import { Icon } from '@iconify/react';
import { useEffect, useRef, useState } from "react";
import { supabase } from '../../../supabaseClient';

interface Message {
  id: number;
  created_at: string;
  message_text: string;
  is_sender: boolean;
  sender: string;
}

interface ChatDisplayProps extends ScreenProps {
  message: Message;
}

export function ChatDisplay({onBack, onPullUp, ...props}: ChatDisplayProps) {
  const [messages, setMessages] = useState<Message[]>([]);
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
    fetchMessages();
  }, []);

  async function fetchMessages() {
    try {
      let { data, error } = await supabase
        .from('chat_messages')
        .select('*');
     
      if (error) {
        console.error('Error fetching messages:', error);
      } else {
        setMessages(data || []);
      }
    } catch (err) {
      console.error('Exception while fetching messages:', err);
    }
  }
 
  return (
    <Screen onBack={onBack} {...props} onPullUp={onPullUp}>
      <div className={styles.chatContainer}>
        <div className={styles.chatHead}>
          <button className={styles.backBtn} onClick={onBack}>
            <Icon icon="mdi:arrow-left-drop-circle" width="1.2rem" height="1.2rem" />
          </button>
          <div className={styles.personaWrapper}>
            <img src={avatar} className={styles.avatar} alt="Avatar" />
            <h5 className={styles.chatTitle}>Snorre</h5>
          </div>
        </div>
        <div className={styles.chatMessagesWrapper} ref={chatMessagesRef}>
          {messages.map((msg) => (
            <ChatMessage
              key={msg.id}
              messageText={msg.message_text}
              isSender={msg.is_sender}
            />
          ))}
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