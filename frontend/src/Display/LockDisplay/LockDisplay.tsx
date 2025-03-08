import { useEffect, useState } from 'react';
import { Notification } from '../../Components/Notification';
import type { NotificationProps } from '../../Components/Notification/Notification';
import { Watch } from '../../Components/Watch';
import { fetchLatestMessage, fetchUser } from '../../api/chatApi';
import styles from './LockDisplay.module.scss';
import { LoadingOverlay } from '../../Components';

interface LockDisplayProps {
  onNotificationClick: () => void;
}

export function LockDisplay({ onNotificationClick }: LockDisplayProps) {
  const [latestNotification, setLatestNotification] = useState<NotificationProps | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadLatestMessage() {
      setIsLoading(true);
      try {
        const message = await fetchLatestMessage();
        if (message) {
          const sender = await fetchUser(message?.sender);
          if (sender) {
            setLatestNotification({
              notificationTitle: `Melding fra: ${sender.user_name}`,
              notificationContent: message.message_text,
            });
          }
        }
      } catch (error) {
        console.error("Error loading latest message:", error);
      } finally {
        setIsLoading(false);
      }
    }
    
    loadLatestMessage();
  }, []);
  
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
