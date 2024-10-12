import React, { useEffect, useRef, useState } from 'react';

const CanvasComponent = () => {
    const canvasRef = useRef(null);
    const [scale, setScale] = useState(1);
    const [translateX, setTranslateX] = useState(0);
    const [translateY, setTranslateY] = useState(0);
    const [rect, setRect] = useState({ x: 275, y: 175, width: 100, height: 100 });
    const [isDragging, setIsDragging] = useState(false);
    const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
    const [selectedHandle, setSelectedHandle] = useState(null);
    const [isResizing, setIsResizing] = useState(false);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        draw(ctx);
    }, [scale, translateX, translateY, rect]);

    useEffect(() => {
        const handleWheel = (event) => {
            event.preventDefault();
            setScale((prevScale) => Math.min(Math.max(0.1, prevScale + event.deltaY * -0.01), 3));
        };

        const handleKeyDown = (event) => {
            switch (event.key) {
                case 'ArrowUp':
                    setTranslateY((prevY) => prevY - 10);
                    break;
                case 'ArrowDown':
                    setTranslateY((prevY) => prevY + 10);
                    break;
                case 'ArrowLeft':
                    setTranslateX((prevX) => prevX - 10);
                    break;
                case 'ArrowRight':
                    setTranslateX((prevX) => prevX + 10);
                    break;
                default:
                    break;
            }
        };

        const canvas = canvasRef.current;
        canvas.addEventListener('wheel', handleWheel);
        window.addEventListener('keydown', handleKeyDown);

        return () => {
            canvas.removeEventListener('wheel', handleWheel);
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    const draw = (ctx) => {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        
        ctx.save();
        ctx.translate(ctx.canvas.width / 2 + translateX, ctx.canvas.height / 2 + translateY);
        ctx.scale(scale, scale);

        // Draw rectangle
        ctx.fillStyle = 'blue';
        ctx.fillRect(rect.x, rect.y, rect.width, rect.height);

        // Draw selector if dragging
        if (isDragging || isResizing) {
            ctx.strokeStyle = 'red';
            ctx.lineWidth = 2;
            ctx.strokeRect(rect.x, rect.y, rect.width, rect.height);

            // Draw resize handles
            drawHandles(ctx, rect);
        }
        
        ctx.restore();
    };

    const drawHandles = (ctx, rect) => {
        const handleSize = 10;
        const halfHandleSize = handleSize / 2;
        
        // Top-left handle
        ctx.fillRect(rect.x - halfHandleSize, rect.y - halfHandleSize, handleSize, handleSize);
        // Top-right handle
        ctx.fillRect(rect.x + rect.width - halfHandleSize, rect.y - halfHandleSize, handleSize, handleSize);
        // Bottom-left handle
        ctx.fillRect(rect.x - halfHandleSize, rect.y + rect.height - halfHandleSize, handleSize, handleSize);
        // Bottom-right handle
        ctx.fillRect(rect.x + rect.width - halfHandleSize, rect.y + rect.height - halfHandleSize, handleSize, handleSize);
    };

    const handleMouseDown = (event) => {
        const canvas = canvasRef.current;
        const rectBounds = canvas.getBoundingClientRect();
        const mouseX = (event.clientX - rectBounds.left - translateX - canvas.width / 2) / scale;
        const mouseY = (event.clientY - rectBounds.top - translateY - canvas.height / 2) / scale;

        const handleSize = 10;
        const halfHandleSize = handleSize / 2;
        const newSelectedHandle = getSelectedHandle(mouseX, mouseY, halfHandleSize);

        if (newSelectedHandle) {
            setSelectedHandle(newSelectedHandle);
            setIsResizing(true);
        } else if (isInsideRectangle(mouseX, mouseY)) {
            setIsDragging(true);
        }

        setDragStart({ x: mouseX, y: mouseY });
    };

    const handleMouseMove = (event) => {
        if (!isDragging && !isResizing) return;

        const canvas = canvasRef.current;
        const rectBounds = canvas.getBoundingClientRect();
        const mouseX = (event.clientX - rectBounds.left - translateX - canvas.width / 2) / scale;
        const mouseY = (event.clientY - rectBounds.top - translateY - canvas.height / 2) / scale;

        if (isDragging) {
            const dx = mouseX - dragStart.x;
            const dy = mouseY - dragStart.y;

            setRect((prevRect) => ({
                ...prevRect,
                x: prevRect.x + dx,
                y: prevRect.y + dy,
            }));
            setDragStart({ x: mouseX, y: mouseY });
        } else if (isResizing && selectedHandle) {
            resizeRectangle(mouseX, mouseY, selectedHandle);
        }
    };

    const handleMouseUp = () => {
        setIsDragging(false);
        setIsResizing(false);
        setSelectedHandle(null);
    };

    const getSelectedHandle = (mouseX, mouseY, halfHandleSize) => {
        if (isInsideHandle(mouseX, mouseY, rect.x, rect.y, halfHandleSize)) return 'top-left';
        if (isInsideHandle(mouseX, mouseY, rect.x + rect.width, rect.y, halfHandleSize)) return 'top-right';
        if (isInsideHandle(mouseX, mouseY, rect.x, rect.y + rect.height, halfHandleSize)) return 'bottom-left';
        if (isInsideHandle(mouseX, mouseY, rect.x + rect.width, rect.y + rect.height, halfHandleSize)) return 'bottom-right';
        return null;
    };

    const isInsideRectangle = (mouseX, mouseY) => {
        return mouseX >= rect.x && mouseX <= rect.x + rect.width && mouseY >= rect.y && mouseY <= rect.y + rect.height;
    };

    const isInsideHandle = (mouseX, mouseY, handleX, handleY, halfHandleSize) => {
        return mouseX >= handleX - halfHandleSize && mouseX <= handleX + halfHandleSize && mouseY >= handleY - halfHandleSize && mouseY <= handleY + halfHandleSize;
    };

    const resizeRectangle = (mouseX, mouseY, selectedHandle) => {
        switch (selectedHandle) {
            case 'top-left':
                setRect((prevRect) => ({
                    ...prevRect,
                    x: mouseX,
                    y: mouseY,
                    width: prevRect.width + (prevRect.x - mouseX),
                    height: prevRect.height + (prevRect.y - mouseY),
                }));
                break;
            case 'top-right':
                setRect((prevRect) => ({
                    ...prevRect,
                    y: mouseY,
                    width: mouseX - prevRect.x,
                    height: prevRect.height + (prevRect.y - mouseY),
                }));
                break;
            case 'bottom-left':
                setRect((prevRect) => ({
                    ...prevRect,
                    x: mouseX,
                    width: prevRect.width + (prevRect.x - mouseX),
                    height: mouseY - prevRect.y,
                }));
                break;
            case 'bottom-right':
                setRect((prevRect) => ({
                    ...prevRect,
                    width: mouseX - prevRect.x,
                    height: mouseY - prevRect.y,
                }));
                break;
            default:
                break;
        }
    };

    return (
        <div>
            <canvas
                ref={canvasRef}
                width="600"
                height="400"
                style={{ border: '1px solid black' }}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
            ></canvas>
            <div>
                <label>
                    Scale: <span>{scale.toFixed(2)}</span>
                </label>
            </div>
            <div>
                <label>
                    Translate X: <span>{translateX}</span>
                </label>
            </div>
            <div>
                <label>
                    Translate Y: <span>{translateY}</span>
                </label>
            </div>
        </div>
    );
};

export default CanvasComponent;
