import React, { ReactNode, useEffect, useRef, useState } from "react";
import { Bezel } from "../Bezel";
import styles from "./Screen.module.scss";

export type ScreenProps = {
  children: ReactNode;
  onPullUp?: () => void;
  onUnlock?: () => void;
  onBack?: () => void;
};

export function Screen({
  children,
  onPullUp,
  onUnlock,
  onBack,
}: ScreenProps) {
  const [scrollY, setScrollY] = useState(0);
  const [mouseGrab, setMouseGrab] = useState(false);
  const [startY, setStartY] = useState(0);
  const screenRef = useRef<HTMLDivElement>(null);

  const handleSwipe = (event: React.UIEvent<HTMLDivElement>) => {
    const screen = event.currentTarget;
    setScrollY(screen.scrollTop);
  };

  const handleGrab = () => {
    setMouseGrab(true);
  };

  const handleRelease = () => {
    setMouseGrab(false);
  };

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (mouseGrab) {
      const currentY = event.clientY;
      const deltaY = startY - currentY;

      if (screenRef.current) {
        screenRef.current.scrollTop += deltaY * 15;
      }
      setStartY(currentY);
    }
  };

  useEffect(() => {
    if (scrollY >= 350 && onPullUp) {
      onPullUp();
    }
  }, [scrollY, onPullUp]);

  return (
    <Bezel>
      <div
        className={mouseGrab ? styles.screenGrab : styles.screen}
        ref={screenRef}
        onScroll={handleSwipe}
        onMouseDown={handleGrab}
        onMouseUp={handleRelease}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleRelease}
      >
        {children}
        {onPullUp && (
          <button className={styles.pullUpButton} onClick={onPullUp}>
            Pull Up
          </button>
        )}
        {onUnlock && (
          <button className={styles.unlockButton} onClick={onUnlock}>
            Unlock
          </button>
        )}
        {onBack && (
          <button className={styles.backButton} onClick={onBack}>
            Back
          </button>
        )}
      </div>
    </Bezel>
  );
}