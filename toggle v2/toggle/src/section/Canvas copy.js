import { useData } from '../Data';
import './Canvas.css';
import React, { useEffect, useState } from 'react';

function Canvas() {
  const {initialCoordinates,setInitialCoordinates,activeTool,setActiveTool} = useData();
  const [initialMouseDown, setInitialMouseDown] = useState({x: 0, y: 0});
  const [isDragging, setIsDragging] = useState(false);
  const [isPageDragging, setIsPageDragging] = useState(false);
  const [zoom, setZoom] = useState(1); // Initialize zoom level
  // const [initialPageMouseDown, setInitialPageMouseDown] = useState({x: 0, y: 0});



  useEffect(() => {
    const handleMouseMove = (e) => {
      if (isDragging) {
        const deltaX = (e.clientX - initialMouseDown.x);
        const deltaY = (e.clientY - initialMouseDown.y);
        setInitialCoordinates({
          x: initialCoordinates.x + deltaX,
          y: initialCoordinates.y + deltaY
        });
        setInitialMouseDown({ x: e.clientX, y: e.clientY }); 
      }
      if(isPageDragging){
        const deltaX = (e.clientX - initialMouseDown.x);
        const deltaY = (e.clientY - initialMouseDown.y);
        document.getElementById('Screens').lastChild.style.width = deltaX + 'px';
        document.getElementById('Screens').lastChild.style.height = deltaY + 'px';
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      setIsPageDragging(false);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };

    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }
    if (isPageDragging) {
      setActiveTool('Select')
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }



    window.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('wheel', handleWheel);
    };
  }, [isDragging, initialMouseDown,initialCoordinates,setInitialCoordinates,isPageDragging,setActiveTool, zoom]);

  const handleMouseDown = (e) => {
    if(activeTool==="Select"){
      setInitialMouseDown({ x: e.clientX, y: e.clientY });
      setIsDragging(true);
    }
    else if(activeTool==="Page"){
      setInitialMouseDown({ x: e.clientX, y: e.clientY });
      setIsPageDragging(true);
      const newScreen = document.createElement('div');
      newScreen.className = 'Screen';
      newScreen.style.top = `${(e.clientY - initialCoordinates.y) / zoom}px`;
      newScreen.style.left = `${((e.clientX - initialCoordinates.x) / zoom)}px`;
      document.getElementById('Screens').appendChild(newScreen);
    }
  };   

  return (
    <div onMouseDown={handleMouseDown} className="Canvas">
      <div id='Screens' style={{"transform":"translate("+initialCoordinates.x+"px, "+initialCoordinates.y+"px)  scale("+zoom+")"}} className="Screens">
        <div style={{"top":"0px","left":"0px","width":"400px","height":"600px"}} className="Screen"></div>
      </div>
    </div>
  );
}

export default Canvas;
