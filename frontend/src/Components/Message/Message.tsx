import styles from './Message.module.scss';

type MessageProps = {
  onClick?: () => void;
  message: string;
  avatar: string;
  sender: string;
  thread: string;
};

const truncateText = (text: string, maxLength: number) => {
  if (text.length <= maxLength) return text;

  // Find the last space within the maxLength
  const lastSpaceIndex = text.lastIndexOf(' ', maxLength - 3);

  if (lastSpaceIndex === -1) {
    // If there's no space, just cut at maxLength
    return `${text.slice(0, maxLength - 3)}...`;
    // biome-ignore lint/style/noUselessElse: <explanation>
  } else {
    // Cut at the last space and add ellipsis
    return `${text.slice(0, lastSpaceIndex)}...`;
  }
};

export function Message({ ...props }: MessageProps) {
  const truncatedContent = truncateText(props.message, 100);
  return (
    <>
      <div className={styles.messageContainer} {...props}>
        <img className={styles.senderPhoto} src={props.avatar} alt="avatar" />
        <div className={styles.messageContent}>
          <div className={styles.messageHead}>
            <span className={styles.messageSender}>{props.sender}</span>
            <span className={styles.messageDay}>Lørdag</span>
          </div>
          <p className={styles.message}>{truncatedContent}</p>
        </div>
      </div>
    </>
  );
}
