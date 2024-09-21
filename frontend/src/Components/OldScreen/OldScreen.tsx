import { useEffect, useRef, useState} from "react";
import {Children} from "../../types";
import styles from "./OldScreen.module.scss";
import {Bezel} from "../Bezel";

type ScreenProps = {
  topScreen?: Children;
  bottomScreen?: Children;
  //TODO: this fixed weird jumping effect, find out if it was needed
  //defaultScreen: "top" | "bottom";
  animated: boolean;
};

export function OldScreen({
                         topScreen,
                         bottomScreen,
                         //defaultScreen,
                         animated,
                       }: ScreenProps) {
  const [scrollY, setScrollY] = useState(0);
  const [mouseGrab, setMouseGrab] = useState(false);
  const [cursorCoords, setCursorCoords] = useState({x: 0, y: 0});
  const [startY, setStartY] = useState(0);

  const screenRef = useRef<HTMLDivElement>(null);

  const topDiv = document.getElementById("topDiv");
  const bottomDiv = document.getElementById("bottomDiv");
  /*
  useEffect(() => {
    if (topDiv && bottomDiv) {
      if (defaultScreen === "bottom") {
        // bottomDiv?.scrollIntoView();
        setScrollY(bottomDiv.offsetTop);
      } else {
        setScrollY(topDiv.offsetTop);
      }
    }
  }, [bottomDiv, defaultScreen, topDiv]);
  */

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

  const handleSwipe = (event: { currentTarget: any; }) => {
    const screen = event.currentTarget;
    setScrollY(screen.scrollTop);
  };

  const handleGrab = () => {
    setMouseGrab(true);
  }

  const handleReleas = () => {
    setMouseGrab(false)
  }

  const handleMouseMove = (event: { clientX: number; target: { offsetLeft: number; offsetTop: number; }; clientY: number; }) => {
    if(mouseGrab) {
      const currentY = event.clientY
      const deltaY = startY - currentY;

      if(screenRef.current){
        screenRef.current.scrollTop += deltaY*15;
      }
      setStartY(currentY)
    }

    setCursorCoords({
      x: event.clientX - event.target.offsetLeft,
      y: event.clientY - event.target.offsetTop,
    });
 }

  return (
      <>
      <p>Relative: ({cursorCoords.x}, {cursorCoords.y})</p>
    <Bezel>
      <div
          className={mouseGrab ? styles.screenGrab : styles.screen}
          id="screen" ref={screenRef}
          onScroll={handleSwipe}
          onMouseDown={handleGrab}
          onMouseUp={handleReleas}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleReleas}>
        <div className={styles.topDiv} id="topDiv">
          {topScreen}
        </div>
        <div className={styles.bottomDiv} id="bottomDiv">
          {bottomScreen}
        </div>
      </div>
    </Bezel>
      </>
  );
}
