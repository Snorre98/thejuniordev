import { useEffect, useState } from 'react';
import { LoadingOverlay } from '../../Components';
import { Notification } from '../../Components/Notification';
import type { NotificationProps } from '../../Components/Notification/Notification';
import { Watch } from '../../Components/Watch';
import { useLatestMessage, useUser } from '../../hooks/useChatQueries';
import styles from './LockDisplay.module.scss';

interface LockDisplayProps {
  onNotificationClick: () => void;
}

export function LockDisplay({ onNotificationClick }: LockDisplayProps) {
  const [latestNotification, setLatestNotification] = useState<NotificationProps | null>(null);

  // Use the custom hooks for fetching data
  const { data: latestMessage, isLoading: messageLoading } = useLatestMessage();
  const { data: sender, isLoading: userLoading } = useUser(latestMessage?.sender || null);

  const isLoading = messageLoading || userLoading;

  useEffect(() => {
    // When both the latest message and sender data are available, create the notification
    if (latestMessage && sender) {
      setLatestNotification({
        notificationTitle: `Melding fra: ${sender.user_name}`,
        notificationContent: latestMessage.message_text,
      });
    }
  }, [latestMessage, sender]);

  return (
    <LoadingOverlay isLoading={isLoading}>
      <div className={styles.lockScreenContainer}>
        <div className={styles.watchWrapper}>
          <Watch />
        </div>
        <div className={styles.notificationWrapper}>
          {latestNotification && (
            <Notification
              notificationTitle={latestNotification.notificationTitle}
              notificationContent={latestNotification.notificationContent}
              onClick={onNotificationClick}
            />
          )}
        </div>
      </div>
    </LoadingOverlay>
  );
}
