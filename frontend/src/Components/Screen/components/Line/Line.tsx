import {useRef, useState, useCallback } from "react";
import styles from "./Line.module.scss";

type LineProps = {
  id?: string;
  onPullUp?: () => void;
  pullUpThreshold?: number;
};

export function Line({ id, onPullUp, pullUpThreshold = 325 }: LineProps) {
  const [scrollY, setScrollY] = useState(0);
  const [mouseGrab, setMouseGrab] = useState(false);
  const [startY, setStartY] = useState(0);
  const lineContainerRef = useRef<HTMLDivElement>(null);
  const pullUpTriggered = useRef(false);

  const handlePullUp = useCallback(() => {
    if (!pullUpTriggered.current && onPullUp) {
      //console.log("Pull up triggered!");
      onPullUp();
      pullUpTriggered.current = true;
    }
  }, [onPullUp]);

  const updateScrollY = useCallback((newScrollY: number) => {
    const clampedScrollY = Math.max(0, Math.min(newScrollY, pullUpThreshold));
    setScrollY(clampedScrollY);
   
    if (clampedScrollY >= pullUpThreshold) {
      handlePullUp();
    }
  }, [pullUpThreshold, handlePullUp]);

  const handleInteractionStart = (clientY: number) => {
    const rect = lineContainerRef.current?.getBoundingClientRect();
    if (rect && clientY >= rect.top) {
      setMouseGrab(true);
      setStartY(clientY);
    }
  };

  const handleInteractionMove = (clientY: number) => {
    if (mouseGrab) {
      const deltaY = startY - clientY;
      updateScrollY(scrollY + deltaY);
      setStartY(clientY);
    }
  };

  const handleInteractionEnd = () => {
    setMouseGrab(false);
    if (scrollY < pullUpThreshold) {
      //console.log('Line falling back');
      setScrollY(0);
    }
    pullUpTriggered.current = false;
  };

  // useEffect(() => {
  //   console.log('ScrollY changed:', scrollY);
  // }, [scrollY]);

  return (
    <>
      <div
        className={styles.lineContainer}
        id={id}
        ref={lineContainerRef}
        onTouchStart={e => handleInteractionStart(e.touches[0].clientY)}
        onTouchMove={e => handleInteractionMove(e.touches[0].clientY)}
        onTouchEnd={handleInteractionEnd}
        onMouseDown={e => handleInteractionStart(e.clientY)}
        onMouseMove={e => handleInteractionMove(e.clientY)}
        onMouseUp={handleInteractionEnd}
        onMouseLeave={handleInteractionEnd}
        style={{
          transform: `translateY(${-scrollY}px)`,
          transition: mouseGrab ? 'none' : 'transform 0.3s ease-out'
        }}
      >
        <span className={styles.line} />
      </div>
      {/* <div style={{ position: 'fixed', top: 0, left: 0, background: 'white', padding: '5px', color: 'black' }}>
        Debug: ScrollY: {scrollY.toFixed(2)} / {pullUpThreshold}
      </div> */}
    </>
  );
}