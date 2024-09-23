import React, { useRef, useState, useCallback, useEffect } from 'react';
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
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        const newY = Math.min(0, e.clientY - dragStartY);
        setPosition({ y: newY });

        if (-newY >= pullUpThreshold) {
          handlePullUp();
        }
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      if (-position.y < pullUpThreshold) {
        setPosition({ y: 0 });
      }
      pullUpTriggered.current = false;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, dragStartY, position.y, pullUpThreshold, handlePullUp]);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStartY(e.clientY - position.y);
  };

  return (
    <div
      className={styles.lineContainer}
      id={id}
      ref={lineContainerRef}
      onMouseDown={handleMouseDown}
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
