import { useEffect, useState } from "react";
import { Children } from "../../types";
import styles from "./Screen.module.scss";
import { Bezel } from "../Bezel";
import { Line } from "../Line";

type ScreenProps = {
  topScreen?: Children;
  bottomScreen?: Children;
};

export function Screen({ topScreen, bottomScreen }: ScreenProps) {
  const [scrollY, setScrollY] = useState(0);
  const topDiv = document.getElementById("topDiv");
  const bottomDiv = document.getElementById("bottomDiv");
  // const line = document.getElementById("line");
  useEffect(() => {
    if (scrollY >= 350) {
      if (bottomDiv && topDiv) {
        bottomDiv.scrollIntoView();
        bottomDiv.style.transform = "scale(1)";
        bottomDiv.style.opacity = "1";
        topDiv.style.opacity = "0";
      }
    }
    if (scrollY < 350) {
      if (bottomDiv && topDiv) {
        topDiv.scrollIntoView();
        bottomDiv.style.transform = "scale(0.5)";
        topDiv.style.opacity = "1";
        bottomDiv.style.opacity = "0";
      }
    }
  }, [bottomDiv, scrollY, topDiv]);

  const handleSwipe = (event) => {
    const screen = event.currentTarget;
    setScrollY(screen.scrollTop);
  };

  // const calculateOpacity = () => {
  //   //TODO: Make this dynamic (some function of scroll pos)
  //   const screenHeight = document.getElementById("screen")?.offsetHeight;
  //   const fadePoint = screenHeight / 4;

  //   let topOpacity = 1;
  //   let bottomOpacity = 0;

  //   if (scrollY > fadePoint) {
  //     topOpacity = 1 - (scrollY - fadePoint) / fadePoint;
  //     bottomOpacity = (scrollY - fadePoint) / fadePoint;
  //   }
  //   return { topOpacity, bottomOpacity };
  // };
  return (
    <Bezel>
      <div className={styles.screen} id="screen" onScroll={handleSwipe}>
        {/* <Line id="line" /> */}
        <div
          className={styles.topDiv}
          // style={{ opacity: calculateOpacity().topOpacity }}
          id="topDiv">
          {topScreen}
          {/* <Line id="line" /> */}
        </div>
        <div
          className={styles.bottomDiv}
          // style={{ opacity: calculateOpacity().bottomOpacity }}
          id="bottomDiv">
          {bottomScreen}
          {/* <Line id="line" /> */}
        </div>
      </div>
    </Bezel>
  );
}
