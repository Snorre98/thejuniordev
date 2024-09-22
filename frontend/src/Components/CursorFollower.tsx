import  { useState, useEffect, useCallback } from 'react';

const VerticalColorChangingGrabbableCursorFollower = () => {
  const [position, setPosition] = useState({ x: 100, y: 100 });
  const [initialY, setInitialY] = useState(100);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartY, setDragStartY] = useState(0);

  const getColor = useCallback(() => {
    const yDifference = Math.abs(position.y - initialY);
    if (yDifference < 50) return 'red';
    if (yDifference < 100) return 'orange';
    if (yDifference < 150) return 'yellow';
    if (yDifference < 200) return 'green';
    return 'blue';
  }, [position.y, initialY]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (isDragging) {
        const newY = e.clientY - dragStartY;
        setPosition(prevPosition => ({
          ...prevPosition,
          y: newY
        }));
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, dragStartY]);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setDragStartY(e.clientY - position.y);
  };

  return (
    <div
      style={{
        position: 'fixed',
        left: position.x,
        top: position.y,
        width: '20px',
        height: '20px',
        borderRadius: '50%',
        backgroundColor: getColor(),
        cursor: isDragging ? 'ns-resize' : 'grab',
        userSelect: 'none',
        zIndex: 9999,
      }}
      onMouseDown={handleMouseDown}
    />
  );
};

export default VerticalColorChangingGrabbableCursorFollower;