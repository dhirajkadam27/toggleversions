import React, { useEffect, useRef, useState } from 'react';
import './index.css'
import { useToggle } from '../../../../config';
import Frame from '../../../../Common/Toggle/Main/Canvas/Frame';

function Canvas() {
  const canvas = useRef(null);
  const { offset, setOffset, scale, setScale } = useToggle();
  const [HoverElement, setHoverElement] = useState({status:false,width:0,height:0,x:0,y:0});
  const [SelectedElement, setSelectedElement] = useState({status:false,width:100,height:100,x:0,y:0});
  useEffect(() => {
    const canva = canvas.current;


    const handleWheel = (event) => {
      event.preventDefault();
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
    const svgElements = document.querySelectorAll('.frame, .page');

    // Add hover event listeners to each element
    svgElements.forEach(element => {
        element.addEventListener('mouseover', () => {
          if(element.parentElement.getElementsByTagName('text')[0]){
            element.parentElement.getElementsByTagName('text')[0].style.fill = "#0D99FF";
          }
            setHoverElement({status:true,width:element.getAttribute('width'),height:element.getAttribute('height'),x:element.getAttribute('x'),y:element.getAttribute('y')})
        });
        element.addEventListener('mouseout', () => {
          if(element.parentElement.getElementsByTagName('text')[0]){
          element.parentElement.getElementsByTagName('text')[0].style.fill = "grey";
          }
            setHoverElement({status:false,width:0,height:0,x:0,y:0});
        });
    });

    // Add hover event listeners to each element
    svgElements.forEach(element => {
      element.addEventListener('click', () => {
        console.log("scale",SelectedElement.scaleX)
        setSelectedElement((prev)=>({...prev, status:true,width:parseInt(element.getAttribute('width')),height:parseInt(element.getAttribute('height')),x:parseInt(element.getAttribute('x')),y:parseInt(element.getAttribute('y'))}))
      });
  });

    const handleMouseDown = (event)=>{
      event.preventDefault();
      console.log(event.clientX-250);
      canva.addEventListener('mousemove', handleMouseMove);
    }


      
  const handleMouseMove = (event)=>{
    event.preventDefault();
    console.log("scale",SelectedElement.scaleX)
    if((event.clientX- offset.x- 250)-SelectedElement.x>0){
      setSelectedElement((prev)=>({...prev ,width:(event.clientX- offset.x- 250)-SelectedElement.x,height:(event.clientY- offset.y- 50)-SelectedElement.y}))
    }else{
      setSelectedElement((prev)=>({...prev ,width:(event.clientX- offset.x- 250)-SelectedElement.x,height:(event.clientY- offset.y- 50)-SelectedElement.y}))
    }
  }
    // Add event listener for window resize and wheel events
    canva.addEventListener('wheel', handleWheel, { passive: false });
    canva.addEventListener('mousedown', handleMouseDown);
    canva.addEventListener('mouseup', ()=>{
      canva.removeEventListener('mousemove', handleMouseMove);
    });

    // Cleanup event listeners on component unmount
    return () => {
      canva.removeEventListener('wheel', handleWheel);
      // canva.removeEventListener('mousedown', handleMouseDown);
    };

  }, [offset, scale,setOffset,setScale,setHoverElement,setSelectedElement,SelectedElement]);

  
  const data = [
    { 
      type:"page",
      name:"Page 1",
      x: 10,
      y: 10,
      width: 100,
      height: 100,
      color: 'white',
      elemets:[{
        type:"frame",
        name:"Frame 2",
        x: 10,
        y: 10,
        width: 100,
        height: 100,
        color: 'white',
        strokeColor: 'grey',
        strokeWidth:1,
        StrokeU:true,
        StrokeD:true,
        StrokeL:true,
        StrokeR:true,
        elemets:[{
          type:"frame",
          name:"Frame 3",
          x: 10,
          y: 10,
          width: 100,
          height: 100,
          color: 'white',
          strokeColor: 'grey',
          strokeWidth:1,
          StrokeU:true,
          StrokeD:true,
          StrokeL:true,
          StrokeR:true,
        }]
      }]
    }, {
      type:"frame",
      name:"Frame 1",
      x: 150,
      y: 150,
      width: 100,
      height: 100,
      color: 'white',
      strokeColor: 'grey',
      strokeWidth:1,
      StrokeU:true,
      StrokeD:true,
      StrokeL:true,
      StrokeR:true,
    }, {
      type:"frame",
      name:"Frame 4",
      x: 350,
      y: 250,
      width: 100,
      height: 100,
      color: 'white',
      strokeColor: 'grey',
      strokeWidth:1,
      StrokeU:true,
      StrokeD:true,
      StrokeL:true,
      StrokeR:true,
    }
  ]

  return (
    <svg ref={canvas} width={window.innerWidth - 520} height={window.innerHeight - 50} viewBox={(offset.x*-1) + " " + (offset.y*-1) + " " + ((window.innerWidth - 520) / scale) + " " + ((window.innerHeight - 50) / scale)} className='Canvas'>


{data.map(function(applicant ,index) {
   if(applicant.type==="page"){
    return (
      <g key={index}>
      <text x={applicant.x} y={applicant.y-5} fontSize={15 / scale} fill="grey">{applicant.name}</text>
      <rect
        className='page'
        x={applicant.x}
        y={applicant.y}
        width={applicant.width}
        height={applicant.height}
        fill={applicant.color}
      />

      <Frame name={applicant.elemets} x={applicant.x} y={applicant.y}/>
     
      </g>
      )  
   }else{
    return (
      <g key={index}>
      <text x={applicant.x} y={applicant.y-5} fontSize={15 / scale} fill="grey">{applicant.name}</text>
      <rect
        className='frame'
        x={applicant.x}
        y={applicant.y}
        width={applicant.width}
        height={applicant.height}
        fill={applicant.color}
      />
      {(applicant.StrokeU)?<rect
        x={applicant.x}
        y={applicant.y}
        width={applicant.width}
        height={applicant.strokeWidth}
        fill={applicant.strokeColor}
      />:null}
      {(applicant.StrokeD)?<rect
        x={applicant.x}
        y={applicant.y+applicant.height-applicant.strokeWidth}
        width={applicant.width}
        height={applicant.strokeWidth}
        fill={applicant.strokeColor}
      />:null}
      {(applicant.StrokeL)?<rect
        x={applicant.x}
        y={applicant.y}
        width={applicant.strokeWidth}
        height={applicant.height}
        fill={applicant.strokeColor}
      />:null}
      {(applicant.StrokeR)?<rect
        x={applicant.x+applicant.width-applicant.strokeWidth}
        y={applicant.y}
        width={applicant.strokeWidth}
        height={applicant.height}
        fill={applicant.strokeColor}
      />:null}
      </g>
      )
   }
      
    })}

    {(HoverElement.status)?<rect x={HoverElement.x} y={HoverElement.y} width={HoverElement.width} height={HoverElement.height} stroke='#0D99FF' fill='none'/>:null}

    {
    (SelectedElement.status)?
    <g>
      <rect x={SelectedElement.x} y={SelectedElement.y} width={(SelectedElement.width>0)?SelectedElement.width:-SelectedElement.width} height={SelectedElement.height} stroke='#0D99FF' fill='none'/>
      <rect x={SelectedElement.x-5} y={SelectedElement.y-5} width={10} height={10} stroke='#0D99FF' fill='red'/>
      <rect x={SelectedElement.x + SelectedElement.width - 5} y={SelectedElement.y - 5} width={10} height={10} stroke='#0D99FF' fill='pink'/>
      <rect x={SelectedElement.x + SelectedElement.width - 5} y={SelectedElement.y + SelectedElement.height - 5} width={10} height={10} stroke='#0D99FF' fill='yellow'/>
      <rect x={SelectedElement.x - 5} y={SelectedElement.y + SelectedElement.height - 5} width={10} height={10} stroke='#0D99FF' fill='blue'/>

    </g>:null}
    </svg>
  );
}

export default Canvas;
