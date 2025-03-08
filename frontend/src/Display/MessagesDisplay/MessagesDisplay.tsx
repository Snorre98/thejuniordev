import { Message } from '../../Components';
import { LoadingOverlay } from '../../Components';
import { useThreads } from '../../hooks/useChatQueries';
import { useStore } from '../../store/store';
import styles from './MessagesDisplay.module.scss';

interface MessagesDisplayProps {
  onSelectThread: (threadId: string) => void;
}

export function MessagesDisplay({ onSelectThread }: MessagesDisplayProps) {
  const { setCurrentThreadId } = useStore();

  // Use the custom hook instead of direct API calls
  const { data: threads = [], isLoading } = useThreads();

  const handleThreadClick = (threadId: string) => {
    setCurrentThreadId(threadId);
    onSelectThread(threadId);
  };

  return (
    <LoadingOverlay isLoading={isLoading}>
      <div className={styles.messagesContainer}>
        <div className={styles.msgScreenTitle}>
          <h5 className={styles.messageScreenTitle}>Meldinger</h5>
        </div>
        <input className={styles.searchBar} placeholder="søk" type="text" />
        {threads.map((thread) => (
          <Message
            key={thread.id}
            message={thread.last_message?.message_text || ''}
            avatar={thread.user_2?.avatar || ''}
            sender={thread.user_2?.user_name || ''}
            onClick={() => handleThreadClick(thread.id)}
            thread={thread.id}
          />
        ))}
      </div>
    </LoadingOverlay>
  );
}
