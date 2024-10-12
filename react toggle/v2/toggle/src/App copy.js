import React, { useRef, useEffect, useState } from 'react';

const Canvas = () => {
    const canvasRef = useRef(null);
    const [canvasWidth, setCanvasWidth] = useState(window.innerWidth - 550); // 250px * 2 for left and right margins
    const [canvasHeight, setCanvasHeight] = useState(window.innerHeight - 100); // 50px * 2 for top and bottom margins
    const [offset, setOffset] = useState({ x: 0, y: 0 });
    const [scale, setScale] = useState(1);
    const [isPanning, setIsPanning] = useState(false);
    const [isDrawing, setIsDrawing] = useState(false);
    const [isResizing, setIsResizing] = useState(false);
    const [startPoint, setStartPoint] = useState({ x: 0, y: 0 });
    const [rectangles, setRectangles] = useState([]);
    const [currentRect, setCurrentRect] = useState(null);
    const [selectedRect, setSelectedRect] = useState(null);
    const [resizeCorner, setResizeCorner] = useState(null);

    const handleResize = () => {
        setCanvasWidth(window.innerWidth - 550);
        setCanvasHeight(window.innerHeight - 100);
    };

    const handleWheel = (event) => {
        if (event.shiftKey) {
            // Scale the canvas when Shift is held down
            setScale(prevScale => Math.max(0.1, prevScale - event.deltaY * 0.01));
        } else {
            // Pan the canvas
            setOffset(prevOffset => ({
                x: prevOffset.x - event.deltaX,
                y: prevOffset.y - event.deltaY
            }));
        }
    };

    const handleMouseDown = (event) => {
        const mouseX = (event.clientX - offset.x) / scale;
        const mouseY = (event.clientY - offset.y) / scale;
        if (event.ctrlKey) {
            setIsPanning(true);
            setStartPoint({ x: event.clientX, y: event.clientY });
        } else if (selectedRect && isOverCorner(mouseX, mouseY, selectedRect)) {
            setIsResizing(true);
            setResizeCorner(getCorner(mouseX, mouseY, selectedRect));
            setStartPoint({ x: mouseX, y: mouseY });
        } else {
            const clickedRect = rectangles.find(rect => 
                mouseX >= rect.x && mouseX <= rect.x + rect.width &&
                mouseY >= rect.y && mouseY <= rect.y + rect.height);
            if (clickedRect) {
                setSelectedRect(clickedRect);
            } else {
                setIsDrawing(true);
                const rectStartX = mouseX;
                const rectStartY = mouseY;
                setStartPoint({ x: rectStartX, y: rectStartY });
                setCurrentRect({ x: rectStartX, y: rectStartY, width: 0, height: 0 });
                setSelectedRect(null);
            }
        }
    };

    const handleMouseMove = (event) => {
        const mouseX = (event.clientX - offset.x) / scale;
        const mouseY = (event.clientY - offset.y) / scale;
        if (isPanning) {
            setOffset(prevOffset => ({
                x: prevOffset.x + (event.clientX - startPoint.x),
                y: prevOffset.y + (event.clientY - startPoint.y)
            }));
            setStartPoint({ x: event.clientX, y: event.clientY });
        } else if (isDrawing) {
            const rectWidth = mouseX - startPoint.x;
            const rectHeight = mouseY - startPoint.y;
            setCurrentRect(prevRect => ({
                ...prevRect,
                width: rectWidth,
                height: rectHeight
            }));
        } else if (isResizing && selectedRect) {
            const deltaX = mouseX - startPoint.x;
            const deltaY = mouseY - startPoint.y;
            setRectangles(prevRects => prevRects.map(rect => {
                if (rect === selectedRect) {
                    const newRect = { ...rect };
                    switch (resizeCorner) {
                        case 'tl':
                            newRect.x += deltaX;
                            newRect.y += deltaY;
                            newRect.width -= deltaX;
                            newRect.height -= deltaY;
                            break;
                        case 'tr':
                            newRect.y += deltaY;
                            newRect.width += deltaX;
                            newRect.height -= deltaY;
                            break;
                        case 'bl':
                            newRect.x += deltaX;
                            newRect.width -= deltaX;
                            newRect.height += deltaY;
                            break;
                        case 'br':
                            newRect.width += deltaX;
                            newRect.height += deltaY;
                            break;
                        default:
                            break;
                    }
                    return newRect;
                }
                return rect;
            }));
            setStartPoint({ x: mouseX, y: mouseY });
        }
    };

    const handleMouseUp = () => {
        if (isPanning) {
            setIsPanning(false);
        } else if (isDrawing) {
            setIsDrawing(false);
            if (currentRect) {
                setRectangles(prevRects => [...prevRects, currentRect]);
                setCurrentRect(null);
            }
        } else if (isResizing) {
            setIsResizing(false);
        }
    };

    const isOverCorner = (mouseX, mouseY, rect) => {
        const corners = getRectCorners(rect);
        return Object.values(corners).some(corner => 
            Math.abs(mouseX - corner.x) < 5 && Math.abs(mouseY - corner.y) < 5);
    };

    const getRectCorners = (rect) => {
        return {
            tl: { x: rect.x, y: rect.y },
            tr: { x: rect.x + rect.width, y: rect.y },
            bl: { x: rect.x, y: rect.y + rect.height },
            br: { x: rect.x + rect.width, y: rect.y + rect.height }
        };
    };

    const getCorner = (mouseX, mouseY, rect) => {
        const corners = getRectCorners(rect);
        return Object.keys(corners).find(corner => 
            Math.abs(mouseX - corners[corner].x) < 5 && Math.abs(mouseY - corners[corner].y) < 5);
    };

    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');

        const draw = () => {
            // Clear the canvas
            context.clearRect(0, 0, canvas.width, canvas.height);

            // Apply translation and scaling
            context.save();
            context.translate(offset.x, offset.y);
            context.scale(scale, scale);

            // Draw all rectangles
            rectangles.forEach(rect => {
                context.fillStyle = 'blue';
                context.fillRect(rect.x, rect.y, rect.width, rect.height);
                if (rect === selectedRect) {
                    context.strokeStyle = 'red';
                    context.lineWidth = 2;
                    context.strokeRect(rect.x, rect.y, rect.width, rect.height);
                    const corners = getRectCorners(rect);
                    context.fillStyle = 'red';
                    Object.values(corners).forEach(corner => {
                        context.fillRect(corner.x - 5, corner.y - 5, 10, 10);
                    });
                }
            });

            // Draw the current rectangle if it exists
            if (currentRect) {
                context.fillStyle = 'blue';
                context.fillRect(currentRect.x, currentRect.y, currentRect.width, currentRect.height);
            }

            context.restore();
        };

        draw();

        // Add event listener for window resize and wheel events
        window.addEventListener('resize', handleResize);
        canvas.addEventListener('wheel', handleWheel);
        canvas.addEventListener('mousedown', handleMouseDown);
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseup', handleMouseUp);

        // Cleanup event listeners on component unmount
        return () => {
            window.removeEventListener('resize', handleResize);
            canvas.removeEventListener('wheel', handleWheel);
            canvas.removeEventListener('mousedown', handleMouseDown);
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, [canvasWidth, canvasHeight, offset, scale, isPanning, isDrawing, isResizing, startPoint, rectangles, currentRect, selectedRect, resizeCorner]);

    return (
        <canvas
            ref={canvasRef}
            width={canvasWidth}
            height={canvasHeight}
            style={{ border: '1px solid black' }}
        ></canvas>
    );
};

export default Canvas;
