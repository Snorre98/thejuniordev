import { useState } from "react";
import styles from "./Watch.module.scss";
export function Watch() {
  const timeObj = new Date();
  const currentDay = timeObj.getDay();
  const currentMonth = timeObj.getMonth();
  const currentDate = timeObj.getDate();

  const [currentMin, setMin] = useState(timeObj.getMinutes());
  const [currentHour, setHour] = useState(timeObj.getHours());

  setInterval(() => {
    setMin(new Date().getMinutes());
    setHour(new Date().getHours());
  }, 5 * 1000);

  const daysList: string[] = [
    "Mandag",
    "Tirsdag",
    "Onsdag",
    "Torsdag",
    "Fredag",
    "Lørdag",
    "Søndag",
  ];

  const monthsList: string[] = [
    "Januar",
    "Februar",
    "Mars",
    "April",
    "Mai",
    "Juni",
    "Juli",
    "August",
    "September",
    "November",
    "Desember",
  ];

  return (
    <div className={styles.watchContainer}>
      <span className={styles.day}>
        {daysList[currentDay - 1]}, {currentDate}.{" "}
        {monthsList[currentMonth - 1]}
      </span>
      <h1 className={styles.watch}>
        {currentHour < 10 ? "0" + currentHour : currentHour}:{""}
        {currentMin < 10 ? "0" + currentMin : currentMin}
      </h1>
    </div>
  );
}
