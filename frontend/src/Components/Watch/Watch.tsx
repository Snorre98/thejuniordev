import { useEffect, useState } from 'react';
import styles from './Watch.module.scss';
export function Watch() {
  const timeObj = new Date();
  const currentDay = timeObj.getDay();
  const currentMonth = timeObj.getMonth();
  const currentDate = timeObj.getDate();

  const [currentMin, setMin] = useState(timeObj.getMinutes());
  const [currentHour, setHour] = useState(timeObj.getHours());

  useEffect(() => {
    const interval = setInterval(() => {
      setMin(new Date().getMinutes());
      setHour(new Date().getHours());
    }, 5 * 1000);
    return () => clearInterval(interval);
  }, []);

  const daysList: string[] = [
    'Søndag', //this is JavaScript craziness
    'Tirsdag',
    'Onsdag',
    'Torsdag',
    'Fredag',
    'Lørdag',
    'Mandag',
  ];

  const monthsList: string[] = [
    'Januar',
    'Februar',
    'Mars',
    'April',
    'Mai',
    'Juni',
    'Juli',
    'August',
    'September',
    'November',
    'Desember',
  ];

  return (
    <div className={styles.watchContainer}>
      <span className={styles.day}>
        {daysList[currentDay]}, {currentDate}. {monthsList[currentMonth - 1]}
      </span>
      <h1 className={styles.watch}>
        {currentHour < 10 ? `0${currentHour}` : currentHour}:{''}
        {currentMin < 10 ? `0${currentMin}` : currentMin}
      </h1>
    </div>
  );
}
