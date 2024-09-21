import React, { useEffect, useRef, useState } from "react";
import styles from "./Line.module.scss";

type LineProps = {
  id?: string;
  onPullUp?: () => void;
};

export function Line({ id, onPullUp }: LineProps) {
  const [scrollY, setScrollY] = useState(0);
  const [mouseGrab, setMouseGrab] = useState(false);
  const [startY, setStartY] = useState(0);
  const lineRef = useRef<HTMLDivElement>(null);

  const handleSwipe = (event: React.TouchEvent<HTMLDivElement>) => {
    const touch = event.touches[0];
    setScrollY(prevScrollY => Math.max(0, prevScrollY + (startY - touch.clientY)));
    setStartY(touch.clientY);
  };

  const handleGrab = (event: React.MouseEvent<HTMLDivElement>) => {
    setMouseGrab(true);
    setStartY(event.clientY);
  };

  const handleRelease = () => {
    setMouseGrab(false);
    if (scrollY < 350) {
      setScrollY(0); // Reset to bottom if not pulled up enough
    }
  };

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (mouseGrab) {
      const currentY = event.clientY;
      const deltaY = startY - currentY;
      setScrollY(prevScrollY => Math.max(0, prevScrollY + deltaY));
      setStartY(currentY);
    }
  };

  useEffect(() => {
    if (scrollY >= 350 && onPullUp) {
      console.log("Pull up triggered!");
      onPullUp();
    }
  }, [scrollY, onPullUp]);

  return (
    <>
      <div
        className={styles.lineContainer}
        id={id}
        ref={lineRef}
        onTouchMove={handleSwipe}
        onTouchStart={e => setStartY(e.touches[0].clientY)}
        onTouchEnd={handleRelease}
        onMouseDown={handleGrab}
        onMouseUp={handleRelease}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleRelease}
        style={{
          transform: `translateY(${-scrollY}px)`,
          transition: mouseGrab ? 'none' : 'transform 0.3s ease-out'
        }}
      >
        <span className={styles.line} />
      </div>
      <div style={{ position: 'fixed', top: 0, left: 0, background: 'white', padding: '5px', color: 'black' }}>
        Debug: ScrollY: {scrollY.toFixed(2)}
      </div>
    </>
  );
}