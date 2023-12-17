import { useEffect, useState } from "react";
import { Children } from "../../types";
import styles from "./Screen.module.scss";
import { Bezel } from "../Bezel";
import { Notification } from "../Notification";

type ScreenProps = {
  topScreen?: Children;
  bottomScreen?: Children;
};

export function Screen({ topScreen, bottomScreen }: ScreenProps) {
  const [scrollY, setScrollY] = useState(0);
  const topDiv = document.getElementById("topDiv");
  const bottomDiv = document.getElementById("bottomDiv");

  useEffect(() => {
    if (scrollY >= 250) {
      bottomDiv?.scrollIntoView();
    }
    if (scrollY < 250) {
      topDiv?.scrollIntoView();
    }
  }, [bottomDiv, scrollY, topDiv]);

  const handleSwipe = (event) => {
    const screen = event.currentTarget;
    setScrollY(screen.scrollTop);
  };

  const calculateOpacity = () => {
    const screenHeight = document.getElementById("screen")?.offsetHeight;
    const fadePoint = screenHeight / 4;

    let topOpacity = 1;
    let bottomOpacity = 0;

    if (scrollY > fadePoint) {
      topOpacity = 1 - (scrollY - fadePoint) / fadePoint;
      bottomOpacity = (scrollY - fadePoint) / fadePoint;
    }
    return { topOpacity, bottomOpacity };
  };
  return (
    <Bezel>
      <div className={styles.screen} id="screen" onScroll={handleSwipe}>
        <div
          className={styles.topDiv}
          style={{ opacity: calculateOpacity().topOpacity }}
          id="topDiv">
          {topScreen}
          {/* <div className={styles.item1}>test 1</div>
          <div className={styles.item2}>test 2</div>
          <div className={styles.item3}>
            <Notification />
          </div> */}
          {/* <div className={styles.item4}>
            <span className={styles.line} />
          </div> */}
        </div>
        <div
          className={styles.bottomDiv}
          style={{ opacity: calculateOpacity().bottomOpacity }}
          id="bottomDiv">
          {bottomScreen}
          {/* <span className={styles.line} /> */}
        </div>
      </div>
    </Bezel>
  );
}
