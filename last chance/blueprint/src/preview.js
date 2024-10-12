import React, { useState } from 'react';
import './Preview.css';

function Preview() {
    const [pageWidth,setPageWidth] = useState(300); 


  const ResizePage = (e,direction) => {
    const startX = e.clientX;
    const startWidth = pageWidth;

    const onMouseMove = (e) => {
        let newWidth = startWidth - (e.clientX - startX) * 2;
        if(direction==="right"){
            newWidth = startWidth + (e.clientX - startX) * 2;
        }
      setPageWidth(newWidth);
    };

    const onMouseUp = () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

    return (
        <div className="App">
            <div className='layer'>

            </div>
            <div className='canvas'>
            <div onMouseDown={(event)=>{ResizePage(event,'left')}} className='leftresize'></div>
                <div style={{"width":pageWidth+"px"}} className='page'>

                </div>
                <div onMouseDown={(event)=>{ResizePage(event,'right')}} className='rightresize'></div>
            </div>
            <div className='properties'>

            </div>

            
        </div>
    );
}

export default Preview;
