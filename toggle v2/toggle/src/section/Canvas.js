import React, { useEffect, useState, useCallback, useRef } from 'react';
import { useData } from '../Data';
import './Canvas.css';

function Canvas() {
  const { initialCoordinates, setInitialCoordinates, activeTool, setActiveTool } = useData();
  const [dragInfo, setDragInfo] = useState({
    startX: 0,
    startY: 0,
    isDragging: false,
    isPageDragging: false,
    isClick: false,
  });
  const [selectInfo, setSelectInfo] = useState({
    id:null,
    type:null,
    startX: 0,
    startY: 0,
    width: 0,
    height: 0,
    isresizable: false,
    isSelect: false
  });

  const [screens, setScreens] = useState([]);
  const [scale, setScale] = useState(1); // Initial scale factor
  const canvasRef = useRef(null);

  const handleMouseMove = useCallback((e) => {
    if (dragInfo.isDragging) {
      const deltaX = e.clientX - dragInfo.startX;
      const deltaY = e.clientY - dragInfo.startY;
      setInitialCoordinates(prevCoords => ({
        x: prevCoords.x + deltaX / scale, // Adjust for scale
        y: prevCoords.y + deltaY / scale,
      }));
      setDragInfo(prev => ({ ...prev, startX: e.clientX, startY: e.clientY, isClick: false }));
    }

    if (dragInfo.isPageDragging) {
      const deltaX = e.clientX - dragInfo.startX;
      const deltaY = e.clientY - dragInfo.startY;
      const updatedScreens = screens.map(screen =>
        screen.id === screens[screens.length - 1].id
          ? { ...screen, width: deltaX / scale, height: deltaY / scale }
          : screen
      );
      setScreens(updatedScreens);
      setDragInfo(prev => ({ ...prev, isClick: false }));
    }
    if(selectInfo.isSelect && selectInfo.isresizable){
      console.log(1);
      const deltaX = e.clientX - parseInt(selectInfo.startX, 10);
      const deltaY = e.clientY - parseInt(selectInfo.startY, 10);
      
      setSelectInfo(prev => ({ ...prev, width:deltaX / scale +"px",height:deltaY / scale +"px" }));
      const updatedScreens = screens.map(screen =>
        selectInfo.type+screen.id === selectInfo.id
          ? { ...screen, width: deltaX / scale, height: deltaY / scale }
          : screen
      );
      setScreens(updatedScreens);
    }
  }, [dragInfo, scale, screens, setInitialCoordinates,selectInfo]);

  const handleMouseUp = useCallback(() => {
    console.log(3);
    setSelectInfo(prev => ({ ...prev, isresizable: false  }));
    if (dragInfo.isClick && selectInfo.id !== null) {
      console.log("click");
      setSelectInfo(prev => ({ ...prev, isSelect:true  }));
    }
    setDragInfo(prev => ({ ...prev, isDragging: false, isPageDragging: false, isClick: false }));
    window.removeEventListener('mousemove', handleMouseMove);
    window.removeEventListener('mouseup', handleMouseUp);
  }, [handleMouseMove, dragInfo,selectInfo]);

  useEffect(() => {
    if (dragInfo.isDragging || dragInfo.isPageDragging || selectInfo.isSelect) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [dragInfo, handleMouseMove, handleMouseUp,selectInfo]);

  const handleMouseDown = (e) => {
    if (activeTool === "Select") {

      if (e.target.classList.contains('Screen') || e.target.classList.contains('Container')) {
        console.log('Mouse down on:', e.target.classList[1]);
        console.log(e.target.style.width);
        setSelectInfo(prev => ({ ...prev, id:e.target.classList[1],type:e.target.classList[0],startY:e.target.style.top,startX:e.target.style.left,width:e.target.style.width,height:e.target.style.height }));
      }if (e.target.classList.contains('Selector') || e.target.classList.contains('LeftTopBox')|| e.target.classList.contains('RightTopBox') || e.target.classList.contains('LeftBottomBox') || e.target.classList.contains('RightBottomBox') || e.target.classList.contains('LeftLine') || e.target.classList.contains('RightLine') || e.target.classList.contains('TopLine') || e.target.classList.contains('BottomLine')) {
        console.log('Mouse down on:', e.target.classList[0]);
        if(e.target.classList.contains('RightBottomBox')){
          console.log(0);
                setSelectInfo(prev => ({ ...prev, isresizable:true }));
        }
      } else {
        console.log('Mouse down on a non-clickable area',e.target.classList[0]);
        setDragInfo({ startX: (e.clientX) / scale - initialCoordinates.x, startY: (e.clientY) / scale - initialCoordinates.y, isDragging: true, isClick: true, isPageDragging: false });
        console.log(selectInfo);
      }

    } else if (activeTool === "Screen") {
      setDragInfo({ startX: (e.clientX) / scale - initialCoordinates.x, startY: e.clientY, isDragging: false, isClick: true, isPageDragging: true });
      setActiveTool('Select');
      const newScreen = {
        id: Date.now(),
        top: (e.clientY) / scale - initialCoordinates.y,
        left: (e.clientX) / scale - initialCoordinates.x,
        width: 0,
        height: 0,
        class: "Screen"
      };
      setScreens(prevScreens => [...prevScreens, newScreen]);
    }

    else if (activeTool === "Container" && !e.target.classList.contains('Canvas')) {
      setDragInfo({ startX: e.clientX, startY: e.clientY, isDragging: false, isClick: true, isPageDragging: true });
      setActiveTool('Select');
      const newScreen = {
        id: Date.now(),
        top: (e.clientY) / scale - initialCoordinates.y,
        left: (e.clientX) / scale - initialCoordinates.x,
        width: 0,
        height: 0,
        class: "Container"
      };
      setScreens(prevScreens => [...prevScreens, newScreen]);
    }


    else if (activeTool === "Text" && !e.target.classList.contains('Canvas')) {
      setDragInfo({ startX: e.clientX, startY: e.clientY, isDragging: false, isClick: true, isPageDragging: true });
      setActiveTool('Select');
      const newScreen = {
        id: Date.now(),
        top: (e.clientY) / scale - initialCoordinates.y,
        left: (e.clientX) / scale - initialCoordinates.x,
        width: 0,
        height: 0,
        class: "Text",
        text: "Text"
      };
      setScreens(prevScreens => [...prevScreens, newScreen]);
    }


    else if (activeTool === "Media" && !e.target.classList.contains('Canvas')) {
      setDragInfo({ startX: e.clientX, startY: e.clientY, isDragging: false, isClick: true, isPageDragging: true });
      setActiveTool('Select');
      const newScreen = {
        id: Date.now(),
        top: (e.clientY) / scale - initialCoordinates.y,
        left: (e.clientX) / scale - initialCoordinates.x,
        width: 0,
        height: 0,
        class: "Media",
        img: "https://png.pngtree.com/png-vector/20221125/ourmid/pngtree-no-image-available-icon-flatvector-illustration-pic-design-profile-vector-png-image_40966566.jpg"
      };
      setScreens(prevScreens => [...prevScreens, newScreen]);
    }

  };

  const handleWheel = (e) => {
    e.preventDefault();
    const zoomFactor = 1.1;
    setScale(prevScale => {
      const newScale = e.deltaY < 0 ? prevScale * zoomFactor : prevScale / zoomFactor;
      return Math.max(newScale, 0.1); // Prevent scale from being too small
    });
  };

  const adjustPosition = (position) => {
    return position * scale;
  };

  return (
    <div
      onMouseDown={handleMouseDown}
      onWheel={handleWheel}
      className="Canvas"
      ref={canvasRef}
    >
      <div
        id="Screens"
        style={{
          transform: `translate(${adjustPosition(initialCoordinates.x)}px, ${adjustPosition(initialCoordinates.y)}px)`,
          transformOrigin: '0 0',
        }}
        className="Screens"
      >
        <div style={{"position":"relative","top":`${selectInfo.startY}`,"left":`${selectInfo.startX}`,"width":`${selectInfo.width}`,"height":`${selectInfo.height}`}} className='Selector'>
          <div className='LeftTopBox'></div>
          <div className='RightTopBox'></div>
          <div className='LeftBottomBox'></div>
          <div className='RightBottomBox'></div>
          <div className='LeftLine'></div>
          <div className='RightLine'></div>
          <div className='TopLine'></div>
          <div className='BottomLine'></div>
        </div>
        {screens.map(screen => (
          screen.class === "Media" ?
            <div
              key={screen.id}
              className={screen.class + " " + screen.class + screen.id}
              style={{
                position: 'absolute',
                top: `${adjustPosition(screen.top)}px`,
                left: `${adjustPosition(screen.left)}px`,
                width: `${adjustPosition(screen.width)}px`,
                height: `${adjustPosition(screen.height)}px`,
                backgroundImage: `url(${screen.img})`,
                backgroundSize: 'cover',
                border: '1px solid black',
                backgroundColor: '#fff',
              }}
            />
            :
            screen.class === "Text" ?
              <div
                key={screen.id}
                className={screen.class + " " + screen.class + screen.id}
                style={{
                  position: 'absolute',
                  top: `${adjustPosition(screen.top)}px`,
                  left: `${adjustPosition(screen.left)}px`,
                  width: `${adjustPosition(screen.width)}px`,
                  height: `${adjustPosition(screen.height)}px`,
                  backgroundColor: '#fff',
                }}
                suppressContentEditableWarning
                contentEditable
              >{screen.text}</div> : <div
                key={screen.id}
                className={screen.class + " " + screen.class + screen.id}
                style={{
                  position: 'absolute',
                  top: `${adjustPosition(screen.top)}px`,
                  left: `${adjustPosition(screen.left)}px`,
                  width: `${adjustPosition(screen.width)}px`,
                  height: `${adjustPosition(screen.height)}px`,
                  border: '1px solid black',
                  backgroundColor: '#fff',
                }}
              />
        ))}
      </div>
    </div>
  );
}

export default Canvas;
