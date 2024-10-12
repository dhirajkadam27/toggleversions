import React, { useEffect, useRef, useState } from 'react';
import './index.css';
import Frame from '../../../../Common/Toggle/Main/Canvas/Frame';

function Canvas() {
  const canvas = useRef(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [scale, setScale] = useState(1);
  const [hoverElement, setHoverElement] = useState(null);
  const [dragging, setDragging] = useState({ status: false, name: "" });
  const [startPoint, setStartPoint] = useState({ x: 0, y: 0 });
  const [startPoint2, setStartPoint2] = useState({ x: 0, y: 0 });
  const [data, setData] = useState([
    {
      type: "page",
      name: "Page 1",
      x: 10,
      y: 10,
      width: 100,
      height: 100,
      color: 'white',
      elements: [
        {
          type: "frame",
          name: "Frame 2",
          x: 10,
          y: 10,
          width: 100,
          height: 100,
          color: 'white',
          strokeColor: 'grey',
          strokeWidth: 1,
          StrokeU: true,
          StrokeD: true,
          StrokeL: true,
          StrokeR: true,
          elements: [
            {
              type: "frame",
              name: "Frame 3",
              x: 10,
              y: 10,
              width: 100,
              height: 100,
              color: 'white',
              strokeColor: 'grey',
              strokeWidth: 1,
              StrokeU: true,
              StrokeD: true,
              StrokeL: true,
              StrokeR: true,
            }
          ]
        }
      ]
    },
    {
      type: "frame",
      name: "Frame 1",
      x: 150,
      y: 150,
      width: 100,
      height: 100,
      color: 'white',
      strokeColor: 'grey',
      strokeWidth: 1,
      StrokeU: true,
      StrokeD: true,
      StrokeL: true,
      StrokeR: true,
    },
    {
      type: "frame",
      name: "Frame 4",
      x: 350,
      y: 250,
      width: 100,
      height: 100,
      color: 'white',
      strokeColor: 'grey',
      strokeWidth: 1,
      StrokeU: true,
      StrokeD: true,
      StrokeL: true,
      StrokeR: true,
    }
  ]);

  const [rect, setRect] = useState({ status: false, name: "", x: 50, y: 50, width: 200, height: 100 });
  const [resizing, setResizing] = useState(null);
  const [originalRect, setOriginalRect] = useState(rect);
  const [guidelines, setGuidelines] = useState({ vertical: null, horizontal: null });

  const handleMouseUp2 = () => {
    setResizing(null);
  };

  const handleResizeMouseDown = (direction) => (e) => {
    e.preventDefault();
    e.stopPropagation();
    setResizing(direction);
    setStartPoint2({ x: e.clientX, y: e.clientY });
    setOriginalRect(rect);
  };

  useEffect(() => {
    const handleWheel = (event) => {
      event.preventDefault();
      if (event.shiftKey) {
        // Scale the canvas when Shift is held down
        setScale((prevScale) => Math.max(0.1, prevScale - event.deltaY * 0.01));
      } else {
        // Pan the canvas
        setOffset((prevOffset) => ({
          x: prevOffset.x - event.deltaX,
          y: prevOffset.y - event.deltaY
        }));
      }
    };

    const handleMouseDown = (e) => {
      const element = e.target;
      if (element.classList.contains('frame') || element.classList.contains('page')) {
        e.preventDefault();
        setDragging({ status: true, name: element.getAttribute('name') });
        setStartPoint({ x: e.clientX, y: e.clientY });
      }
    };

    const handleMouseMove = (e) => {
      if (dragging.status) {
        const updateElement = (element, index) => {
          if (element.name === dragging.name) {
            return { ...element, x: (e.clientX - 250) - (element.width / 2), y: (e.clientY - 50) - (element.height / 2) };
          }
          if (element.elements) {
            return { ...element, elements: element.elements.map(updateElement) };
          }
          return element;
        };
        setData(data.map(updateElement));
        setRect({ x: e.clientX, y: e.clientY })
        setStartPoint({ x: e.clientX, y: e.clientY });
      }

      // Calculate alignment guidelines and snap to nearby elements
      let verticalGuide = null;
      let horizontalGuide = null;
      let verticalHold = false;
      let horizontalHold = false;

      data.forEach(item => {
        if (item.type === 'frame' || item.type === 'page') {
          const itemRect = {
            x: item.x,
            y: item.y,
            width: item.width,
            height: item.height
          };

          // Check vertical alignment
          if (Math.abs(e.clientX - itemRect.x) <= 5) {
            verticalGuide = { x: itemRect.x, width: itemRect.width };
            verticalHold = true;
          } else if (Math.abs(e.clientX + rect.width - (itemRect.x + itemRect.width)) <= 5) {
            verticalGuide = { x: itemRect.x + itemRect.width, width: itemRect.width };
            verticalHold = true;
          }

          // Check horizontal alignment
          if (Math.abs(e.clientY - itemRect.y) <= 5) {
            horizontalGuide = { y: itemRect.y, height: itemRect.height };
            horizontalHold = true;
          } else if (Math.abs(e.clientY + rect.height - (itemRect.y + itemRect.height)) <= 5) {
            horizontalGuide = { y: itemRect.y + itemRect.height, height: itemRect.height };
            horizontalHold = true;
          }
        }
      });

      setGuidelines({ vertical: verticalHold ? verticalGuide : null, horizontal: horizontalHold ? horizontalGuide : null });
    };

    const handleMouseUp = () => {
      setDragging({ status: false });
      setGuidelines({ vertical: null, horizontal: null });
    };

    const handleMouseOver = (e) => {
      const element = e.target;
      if (element.classList.contains('frame') || element.classList.contains('page')) {
        if (element.parentElement.getElementsByTagName('text')[0]) {
          element.parentElement.getElementsByTagName('text')[0].style.fill = "#0D99FF";
        }
        setHoverElement(element);
      }
    };

    const handleMouseOut = (e) => {
      const element = e.target;
      if (element.classList.contains('frame') || element.classList.contains('page')) {
        if (element.parentElement.getElementsByTagName('text')[0]) {
          element.parentElement.getElementsByTagName('text')[0].style.fill = "grey";
        }
        setHoverElement(null);
      }
    };

    const handleClick = (e) => {
      if (e.target.getAttribute('class') === "frame" || e.target.getAttribute('class') === "page") {
        setRect({
          status: true,
          name: e.target.getAttribute('name'),
          width: parseInt(e.target.getAttribute('width')),
          height: parseInt(e.target.getAttribute('height')),
          x: parseInt(e.target.getAttribute('x')),
          y: parseInt(e.target.getAttribute('y'))
        });
      }
    };

    const handleMouseMove2 = (e) => {
      if (resizing) {
        const dx = e.clientX - startPoint2.x;
        const dy = e.clientY - startPoint2.y;
        let newRect = { ...originalRect };
        newRect.status = true;

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

        const updateElement = (element) => {
          if (element.name === rect.name) {
            return { ...element, x: newRect.x, y: newRect.y, width: newRect.width, height: newRect.height };
          }
          if (element.elements) {
            return { ...element, elements: element.elements.map(updateElement) };
          }
          return element;
        };

        setData(data.map(updateElement));
        setRect(newRect);
      }
    };

    const svgElement = canvas.current;
    svgElement.addEventListener('click', handleClick);
    svgElement.addEventListener('mousedown', handleMouseDown);
    svgElement.addEventListener('mouseover', handleMouseOver);
    svgElement.addEventListener('mouseout', handleMouseOut);
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('wheel', handleWheel, { passive: false });

    const throttledMouseMove = (e) => {
      requestAnimationFrame(() => handleMouseMove2(e));
    };

    window.addEventListener('mousemove', throttledMouseMove);
    window.addEventListener('mouseup', handleMouseUp2);

    // Cleanup event listeners on component unmount
    return () => {
      svgElement.removeEventListener('mousedown', handleMouseDown);
      svgElement.removeEventListener('mouseover', handleMouseOver);
      svgElement.removeEventListener('mouseout', handleMouseOut);
      document.removeEventListener('wheel', handleWheel);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      svgElement.removeEventListener('click', handleClick);

      window.removeEventListener('mousemove', throttledMouseMove);
      window.removeEventListener('mouseup', handleMouseUp2);
    };
  }, [offset, scale, dragging, startPoint, data, resizing, startPoint2, rect, originalRect]);

  return (
    <svg ref={canvas} width={window.innerWidth - 520} height={window.innerHeight - 50} viewBox={`${-offset.x} ${-offset.y} ${(window.innerWidth - 520) / scale} ${(window.innerHeight - 50) / scale}`} className='Canvas'>
      {data.map((item, index) => {
        if (item.type === "page") {
          return (
            <g key={index}>
              <text x={item.x} y={item.y - 5} fontSize={15 / scale} fill="grey">{item.name}</text>
              <rect
                name={item.name}
                className='page'
                x={item.x}
                y={item.y}
                width={item.width}
                height={item.height}
                fill={item.color}
              />
              {/* Render nested frames */}
              {item.elements && item.elements.map((frame, idx) => (
                <Frame key={idx} name={frame.elements} x={item.x} y={item.y} />
              ))}
            </g>
          );
        } else {
          return (
            <g key={index}>
              <text x={item.x} y={item.y - 5} fontSize={15 / scale} fill="grey">{item.name}</text>
              <rect
                name={item.name}
                className='frame'
                x={item.x}
                y={item.y}
                width={item.width}
                height={item.height}
                fill={item.color}
              />
              {/* Render frame strokes */}
              {item.StrokeU && (
                <rect
                  x={item.x}
                  y={item.y}
                  width={item.width}
                  height={item.strokeWidth}
                  fill={item.strokeColor}
                />
              )}
              {item.StrokeD && (
                <rect
                  x={item.x}
                  y={item.y + item.height - item.strokeWidth}
                  width={item.width}
                  height={item.strokeWidth}
                  fill={item.strokeColor}
                />
              )}
              {item.StrokeL && (
                <rect
                  x={item.x}
                  y={item.y}
                  width={item.strokeWidth}
                  height={item.height}
                  fill={item.strokeColor}
                />
              )}
              {item.StrokeR && (
                <rect
                  x={item.x + item.width - item.strokeWidth}
                  y={item.y}
                  width={item.strokeWidth}
                  height={item.height}
                  fill={item.strokeColor}
                />
              )}
            </g>
          );
        }
      })}
      {/* Highlight hovered element */}
      {hoverElement && (
        <rect
          x={hoverElement.getAttribute('x')}
          y={hoverElement.getAttribute('y')}
          width={hoverElement.getAttribute('width')}
          height={hoverElement.getAttribute('height')}
          stroke='#0D99FF'
          fill='none'
        />
      )}

      {/* Render alignment guidelines */}
      {guidelines.vertical && (
        <line
          x1={guidelines.vertical.x}
          y1={rect.y}
          x2={guidelines.vertical.x}
          y2={rect.y + rect.height}
          stroke="#0D99FF"
          strokeWidth="1"
          strokeDasharray="5,3"
        />
      )}
      {guidelines.horizontal && (
        <line
          x1={rect.x}
          y1={guidelines.horizontal.y}
          x2={rect.x + rect.width}
          y2={guidelines.horizontal.y}
          stroke="#0D99FF"
          strokeWidth="1"
          strokeDasharray="5,3"
        />
      )}

      {/* Render resizing handles */}
      {rect.status && (
        <g>
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
        </g>
      )}
    </svg>
  );
}

export default Canvas;
