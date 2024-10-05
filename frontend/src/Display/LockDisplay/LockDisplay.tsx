import { useEffect, useState } from 'react';
import { type ScreenProps } from '../../Components';
import { Notification } from '../../Components/Notification';
import type { NotificationProps } from '../../Components/Notification/Notification';
import { Watch } from '../../Components/Watch';
import { fetchLatestMessage, fetchUser } from '../../api/chatApi';
import styles from './LockDisplay.module.scss';

interface LockDisplayProps extends ScreenProps {
  onPullUp: () => void;
  onNotificationClick: () => void;
}

export function LockDisplay({ onPullUp, onNotificationClick }: LockDisplayProps) {
  const [latestNotification, setLatestNotification] = useState<NotificationProps | null>(null);

  useEffect(() => {
    async function loadLatestMessage() {
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
    }
    loadLatestMessage();
  }, []);

  return (
    // <Screen onPullUp={onPullUp}>
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
    // </Screen>
  );
}
