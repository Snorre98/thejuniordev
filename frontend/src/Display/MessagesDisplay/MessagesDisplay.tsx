import { Screen, ScreenProps } from '../../Components';
import { Message } from '../../Components';
import styles from './MessagesDisplay.module.scss';
import photo from '../../assets/Photos.png';
import { useStore } from '../../store';

interface MessagesDisplayProps extends ScreenProps {
  messages?: Array<{
    id: string;
    message: string;
    sender: string;
    photoURL: string;
  }>;
}

export function MessagesDisplay({ onBack, ...props }: MessagesDisplayProps) {
  const { setScreen } = useStore();

  const handleUnlock = () => {
    setScreen('home');
  };

  const defaultMessages = [
    {
      id: '1',
      message: `test image, test image, test image. This is a test.
        Tests. test image, test image, test image. This is a test. Tests.`,
      sender: 'Snorre',
      photoURL: photo,
    },
    {
      id: '2',
      message: `test image, test image, test image. This is a test.
        Tests. test image, test image, test image. This is a test. Tests.`,
      sender: 'Snorre',
      photoURL: photo,
    },
    {
      id: '3',
      message: `test image, test image, test image. This is a test.
        Tests. test image, test image, test image. This is a test. Tests.`,
      sender: 'Snorre',
      photoURL: photo,
    },
    {
      id: '4',
      message: `test image, test image, test image. This is a test.
        Tests. test image, test image, test image. This is a test. Tests.`,
      sender: 'Snorre',
      photoURL: photo,
    },
  ];

  const messages = props.messages || defaultMessages;

  return (
    <Screen onBack={onBack} onUnlock={handleUnlock} onPullUp={handleUnlock}
    //  onOpenApp={onOpenApp} 
     {...props}>
      <div className={styles.messagesContainer}>
        <div className={styles.msgScreenTitle}>
          <span onClick={onBack}>Back</span>
          <h5 className={styles.messageScreenTitle}>Meldinger</h5>
          {/* <span onClick={() => onOpenApp && onOpenApp('newMessage')}>Ny</span> */}
        </div>
        <input className={styles.searchBar} placeholder="søk" type="text" />
        {messages.map((msg) => (
          <Message
            key={msg.id}
            message={msg.message}
            photoURL={msg.photoURL}
            sender={msg.sender}
            onClick={()=> setScreen('chat')}
          />
        ))}
      </div>
    </Screen>
  );
}