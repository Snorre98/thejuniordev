import { useEffect, useState } from "react";
import { Children } from "../../types";
import styles from "./Screen.module.scss";
import { Bezel } from "../Bezel";
import { Line } from "../Line";

type ScreenProps = {
  topScreen?: Children;
  bottomScreen?: Children;
  defaultScreen: "top" | "bottom";
  animated: boolean;
};

export function Screen({
  topScreen,
  bottomScreen,
  defaultScreen,
  animated,
}: ScreenProps) {
  const [scrollY, setScrollY] = useState(0);
  const topDiv = document.getElementById("topDiv");
  const bottomDiv = document.getElementById("bottomDiv");
  // const [defaultScreen, setDefaultScreen] = useState("top");

  // if (screenOnLoad === "top") {
  //   //view top screen by default
  // } else if (screenOnLoad === "bottom") {
  //   //view bottom screen by default
  // }

  useEffect(() => {
    // const topDiv = document.getElementById("topDiv");
    // const bottomDiv = document.getElementById("bottomDiv");
    if (topDiv && bottomDiv) {
      if (defaultScreen === "bottom") {
        // bottomDiv?.scrollIntoView();
        setScrollY(bottomDiv.offsetTop);
      } else {
        setScrollY(topDiv.offsetTop);
      }
    }
  }, [bottomDiv, defaultScreen, topDiv]);

  useEffect(() => {
    if (scrollY >= 350) {
      if (bottomDiv && topDiv) {
        bottomDiv.scrollIntoView();
        if (animated) {
          bottomDiv.style.transform = "scale(1)";
          bottomDiv.style.opacity = "1";
          topDiv.style.opacity = "0";
        }
      }
    }
    if (scrollY < 350) {
      if (bottomDiv && topDiv) {
        topDiv.scrollIntoView();
        if (animated) {
          bottomDiv.style.transform = "scale(0.5)";
          topDiv.style.opacity = "1";
          bottomDiv.style.opacity = "0";
        } else {
          bottomDiv.style.transform = "scale(1)";
        }
      }
    }
  }, [animated, bottomDiv, scrollY, topDiv]);

  const handleSwipe = (event) => {
    const screen = event.currentTarget;
    setScrollY(screen.scrollTop);
  };

  return (
    <Bezel>
      <div className={styles.screen} id="screen" onScroll={handleSwipe}>
        {/* <Line id="line" /> */}
        <div className={styles.topDiv} id="topDiv">
          {topScreen}
          {/* <Line id="line" /> */}
        </div>
        <div className={styles.bottomDiv} id="bottomDiv">
          {bottomScreen}
          {/* <Line id="line" /> */}
        </div>
      </div>
    </Bezel>
  );
}
