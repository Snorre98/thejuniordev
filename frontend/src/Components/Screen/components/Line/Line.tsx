import type React from 'react';
import { useCallback, useEffect, useRef, useState } from 'react';
import styles from './Line.module.scss';

type LineProps = {
  id?: string;
  onPullUp?: () => void;
  pullUpThreshold?: number;
};

export function Line({ id, onPullUp, pullUpThreshold = 200 }: LineProps) {
  const [position, setPosition] = useState({ y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartY, setDragStartY] = useState(0);
  const lineContainerRef = useRef<HTMLDivElement>(null);
  const pullUpTriggered = useRef(false);

  const handlePullUp = useCallback(() => {
    if (!pullUpTriggered.current && onPullUp) {
      onPullUp();
      pullUpTriggered.current = true;
    }
  }, [onPullUp]);

  useEffect(() => {
    const handleMove = (clientY: number) => {
      if (isDragging) {
        const newY = Math.min(0, clientY - dragStartY);
        setPosition({ y: newY });
        if (-newY >= pullUpThreshold) {
          handlePullUp();
        }
      }
    };

    const handleEnd = () => {
      setIsDragging(false);
      if (-position.y < pullUpThreshold) {
        setPosition({ y: 0 });
      }
      pullUpTriggered.current = false;
    };

    // Mouse events
    const handleMouseMove = (e: MouseEvent) => {
      handleMove(e.clientY);
    };

    const handleMouseUp = () => {
      handleEnd();
    };

    // Touch events
    const handleTouchMove = (e: TouchEvent) => {
      if (e.cancelable) {
        e.preventDefault(); // Prevent scrolling while dragging
      }
      handleMove(e.touches[0].clientY);
    };

    const handleTouchEnd = () => {
      handleEnd();
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    window.addEventListener('touchend', handleTouchEnd);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isDragging, dragStartY, position.y, pullUpThreshold, handlePullUp]);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStartY(e.clientY - position.y);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    setDragStartY(e.touches[0].clientY - position.y);
  };

  return (
    <div
      className={styles.lineContainer}
      id={id}
      ref={lineContainerRef}
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
      style={{
        transform: `translateY(${position.y}px)`,
        transition: isDragging ? 'none' : 'transform 0.3s ease-out',
        cursor: isDragging ? 'ns-resize' : 'grab',
        userSelect: 'none',
      }}
    >
      <span className={styles.line} />
    </div>
  );
}
