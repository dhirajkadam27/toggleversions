import React, { useState, useEffect } from 'react';

const ResizableRectangle = () => {
  const [rect, setRect] = useState({ x: 50, y: 50, width: 200, height: 100 });
  const [resizing, setResizing] = useState(null);
  const [startPoint2, setStartPoint2] = useState({ x: 0, y: 0 });
  const [originalRect, setOriginalRect] = useState(rect);

  const handleMouseUp = () => {
    setResizing(null);
  };

  const handleMouseMove = (e) => {
    if (resizing) {
      const dx = e.clientX - startPoint2.x;
      const dy = e.clientY - startPoint2.y;
      let newRect = { ...originalRect };

      switch (resizing) {
        case 'right':
          newRect.width += dx;
          if (newRect.width < 0) {
            newRect.x += newRect.width;
            newRect.width = Math.abs(newRect.width);
          }
          break;
        case 'bottom':
          newRect.height += dy;
          if (newRect.height < 0) {
            newRect.y += newRect.height;
            newRect.height = Math.abs(newRect.height);
          }
          break;
        case 'bottom-right':
          newRect.width += dx;
          newRect.height += dy;
          if (newRect.width < 0) {
            newRect.x += newRect.width;
            newRect.width = Math.abs(newRect.width);
          }
          if (newRect.height < 0) {
            newRect.y += newRect.height;
            newRect.height = Math.abs(newRect.height);
          }
          break;
        case 'left':
          newRect.x += dx;
          newRect.width -= dx;
          if (newRect.width < 0) {
            newRect.x += newRect.width;
            newRect.width = Math.abs(newRect.width);
          }
          break;
        case 'top':
          newRect.y += dy;
          newRect.height -= dy;
          if (newRect.height < 0) {
            newRect.y += newRect.height;
            newRect.height = Math.abs(newRect.height);
          }
          break;
        case 'top-left':
          newRect.x += dx;
          newRect.y += dy;
          newRect.width -= dx;
          newRect.height -= dy;
          if (newRect.width < 0) {
            newRect.x += newRect.width;
            newRect.width = Math.abs(newRect.width);
          }
          if (newRect.height < 0) {
            newRect.y += newRect.height;
            newRect.height = Math.abs(newRect.height);
          }
          break;
        case 'top-right':
          newRect.y += dy;
          newRect.width += dx;
          newRect.height -= dy;
          if (newRect.width < 0) {
            newRect.x += newRect.width;
            newRect.width = Math.abs(newRect.width);
          }
          if (newRect.height < 0) {
            newRect.y += newRect.height;
            newRect.height = Math.abs(newRect.height);
          }
          break;
        case 'bottom-left':
          newRect.x += dx;
          newRect.width -= dx;
          newRect.height += dy;
          if (newRect.width < 0) {
            newRect.x += newRect.width;
            newRect.width = Math.abs(newRect.width);
          }
          if (newRect.height < 0) {
            newRect.y += newRect.height;
            newRect.height = Math.abs(newRect.height);
          }
          break;
        default:
          break;
      }

      setRect(newRect);
    }
  };

  const handleResizeMouseDown = (direction) => (e) => {
    e.preventDefault();
    e.stopPropagation();
    setResizing(direction);
    setStartPoint2({ x: e.clientX, y: e.clientY });
    setOriginalRect(rect);
  };

  useEffect(() => {
    const throttledMouseMove = (e) => {
      requestAnimationFrame(() => handleMouseMove(e));
    };

    window.addEventListener('mousemove', throttledMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    return () => {
      window.removeEventListener('mousemove', throttledMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [resizing, startPoint2, rect, originalRect]); // Include all dependencies needed for useEffect

  return (
    <svg width="100%" height="100vh">
      {/* Resize handles */}
      <rect
        x={rect.x + rect.width - 4}
        y={rect.y + rect.height - 4}
        width="8"
        height="8"
        fill="#0D99FF"
        onMouseDown={handleResizeMouseDown('bottom-right')}
        style={{ cursor: 'se-resize' }}
      />
      <rect
        x={rect.x - 4}
        y={rect.y - 4}
        width="8"
        height="8"
        fill="#0D99FF"
        onMouseDown={handleResizeMouseDown('top-left')}
        style={{ cursor: 'nw-resize' }}
      />
      <rect
        x={rect.x + rect.width - 4}
        y={rect.y - 4}
        width="8"
        height="8"
        fill="#0D99FF"
        onMouseDown={handleResizeMouseDown('top-right')}
        style={{ cursor: 'ne-resize' }}
      />
      <rect
        x={rect.x - 4}
        y={rect.y + rect.height - 4}
        width="8"
        height="8"
        fill="#0D99FF"
        onMouseDown={handleResizeMouseDown('bottom-left')}
        style={{ cursor: 'sw-resize' }}
      />

      {/* Edges for resizing */}
      <rect
        x={rect.x}
        y={rect.y}
        width={rect.width}
        height="1"
        fill="#0D99FF"
        onMouseDown={handleResizeMouseDown('top')}
        style={{ cursor: 'n-resize' }}
      />
      <rect
        x={rect.x}
        y={rect.y + rect.height}
        width={rect.width}
        height="1"
        fill="#0D99FF"
        onMouseDown={handleResizeMouseDown('bottom')}
        style={{ cursor: 's-resize' }}
      />
      <rect
        x={rect.x}
        y={rect.y}
        width="1"
        height={rect.height}
        fill="#0D99FF"
        onMouseDown={handleResizeMouseDown('left')}
        style={{ cursor: 'w-resize' }}
      />
      <rect
        x={rect.x + rect.width}
        y={rect.y}
        width="1"
        height={rect.height}
        fill="#0D99FF"
        onMouseDown={handleResizeMouseDown('right')}
        style={{ cursor: 'e-resize' }}
      />
    </svg>
  );
};

export default ResizableRectangle;
