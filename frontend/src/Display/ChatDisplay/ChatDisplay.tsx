import { Icon } from '@iconify/react';
import { useEffect, useRef, useState } from 'react';
import type { ScreenProps } from '../../Components';
import { LoadingOverlay } from '../../Components';
import { useMessages, useThreads } from '../../hooks/useChatQueries';
import { useStore } from '../../store/store';
import styles from './ChatDisplay.module.scss';
import { ChatMessage } from './Subcomponents';

interface ChatDisplayProps extends ScreenProps {
  onBack: () => void;
}

export function ChatDisplay({ onBack }: ChatDisplayProps) {
  const chatMessagesRef = useRef<HTMLDivElement>(null);
  const { currentThreadId } = useStore();

  // Use the custom hooks instead of direct API calls
  const { data: threads = [], isLoading: threadsLoading } = useThreads();
  const { data: messages = [], isLoading: messagesLoading } = useMessages(currentThreadId);

  // Find the current thread from the threads data
  const currentThread = threads.find((t) => t.id === currentThreadId) || null;

  const sendBtn = document.getElementById('sendBtn');
  const showBtn = () => {
    if (sendBtn) sendBtn.style.display = 'block';
  };
  const hideButton = () => {
    if (sendBtn) sendBtn.style.display = 'none';
  };

  useEffect(() => {
    if (chatMessagesRef.current) {
      chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight;
    }
  }, []);

  const isLoading = threadsLoading || messagesLoading || !currentThread;

  return (
    <LoadingOverlay isLoading={isLoading}>
      {currentThread ? (
        <div className={styles.chatContainer}>
          <div className={styles.chatHead}>
            <button className={styles.backBtn} onClick={onBack} type="button">
              <Icon icon="mdi:arrow-left-drop-circle" width="1.2rem" height="1.2rem" />
            </button>
            <div className={styles.personaWrapper}>
              <img src={currentThread.user_2.avatar} className={styles.avatar} alt="Avatar" />
              <h5 className={styles.chatTitle}>{currentThread.user_2.user_name}</h5>
            </div>
          </div>
          <div className={styles.chatMessagesWrapper} ref={chatMessagesRef}>
            {messages.map((msg) => (
              <ChatMessage key={msg.id} messageText={msg.message_text} isSender={msg.is_sender} />
            ))}
          </div>
          <div className={styles.chatInputContainer}>
            <div className={styles.inputWrapper}>
              <input type="text" className={styles.chatInput} onFocusCapture={showBtn} onBlur={hideButton} />
              <button className={styles.sendBtn} id="sendBtn" type="button">
                <Icon icon="mdi:send" width="0.5rem" height="0.5rem" />
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div>No thread selected</div>
      )}
    </LoadingOverlay>
  );
}
