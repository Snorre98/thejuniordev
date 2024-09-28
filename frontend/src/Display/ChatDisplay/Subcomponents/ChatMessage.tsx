import styles from './ChatMessage.module.scss';

type ChatMessageProps = {
  messageText: string;
  isSender: boolean;
};

export function ChatMessage({ messageText, isSender }: ChatMessageProps) {
  return (
    <div className={styles.chatMessageWrapper}>
      <p className={isSender ? styles.chatMessageOut : styles.chatMessageIn}>{messageText}</p>
    </div>
  );
}
