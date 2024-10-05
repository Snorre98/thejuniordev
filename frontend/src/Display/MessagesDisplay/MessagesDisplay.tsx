import { useEffect, useState } from 'react';
import { Message } from '../../Components';
import { type Thread, fetchThreads, getFullIconUrl } from '../../api/chatApi';
import styles from './MessagesDisplay.module.scss';

interface MessagesDisplayProps {
  onSelectThread: (thread: Thread) => void;
}

export function MessagesDisplay({ onSelectThread }: MessagesDisplayProps) {
  const [threads, setThreads] = useState<Thread[]>([]);

  useEffect(() => {
    const loadThreads = async () => {
      const fetchedThreads = await fetchThreads();
      setThreads(fetchedThreads);
    };

    loadThreads();
  }, []);

  const handleThreadClick = (thread: Thread) => {
    onSelectThread(thread);
  };

  return (
    <div className={styles.messagesContainer}>
      <div className={styles.msgScreenTitle}>
        <h5 className={styles.messageScreenTitle}>Meldinger</h5>
      </div>
      <input className={styles.searchBar} placeholder="søk" type="text" />
      {threads.map((thread) => (
        <Message
          key={thread.id}
          message={thread.last_message.message_text}
          avatar={getFullIconUrl(thread.user_2.avatar)}
          sender={thread.user_2.user_name}
          onClick={() => handleThreadClick(thread)}
          thread={thread.id}
        />
      ))}
    </div>
  );
}
