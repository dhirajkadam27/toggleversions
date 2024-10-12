import React, { useEffect, useRef, useState } from 'react';
import './index.css';
import Frame from '../../../../Common/Toggle/Main/Canvas/Frame';
import { useToggle } from '../../../../config';

function Canvas() {
  const canvas = useRef(null);
  const { offset, setOffset, scale, setScale,data, setData,useTool,setTool } = useToggle();
  const [hoverElement, setHoverElement] = useState(null);
  const [dragging, setDragging] = useState({ status: false, name: "" });
  const [startPoint, setStartPoint] = useState({ x: 0, y: 0 });


  const [rect, setRect] = useState({status:false,name:"", x: 50, y: 50, width: 200, height: 100 });
  const [resizing, setResizing] = useState(null);
  const [originalRect, setOriginalRect] = useState(rect);
  const [LeftGuideLine, setLeftGuideLine] = useState({status:false,x:0})
  const [TopGuideLine, setTopGuideLine] = useState({status:false,y:0})
  const [RightGuideLine, setRightGuideLine] = useState({status:false,x:0})
  const [BottomGuideLine, setBottomGuideLine] = useState({status:false,y:0})
  
  const [selector, setSelector] = useState({tapped:false,status:false,x1:0,y1:0,x2:100,y2:100});

  const handleMouseUp2 = () => {
    setResizing(null);
    // setRect({status:false, x: 50, y: 50, width: 200, height: 100 });
  };



  const handleResizeMouseDown = (direction) => (e) => {
    e.preventDefault();
    e.stopPropagation();
    setResizing(direction);
    setStartPoint({ x: e.clientX, y: e.clientY });
    setOriginalRect(rect);
  };

  
  function findFrameInfo(data, targetName) {
    let result = null;

    function traverse(elements, parent = null) {
        for (let element of elements) {
            if (element.name === targetName) {
                result = {
                    siblings: (parent ? parent.elements.filter(el => el.name !== targetName) : data.filter(el => el.name !== targetName)),
                    parent: parent ? parent : null
                };
                return;
            }
            if (element.elements) {
                traverse(element.elements, element);
                if (result) return;
            }
        }
    }

    traverse(data);
    return result;
}


const isFrameWithinCoordinates = (frame, x1, y1, x2, y2,rootx,rooty) => {
  const isRoot = false;
  const frameRight = (rootx + frame.x) + frame.width;
  const frameBottom = (rooty + frame.y) + frame.height;
  console.log(frameRight,frameBottom);

  return (
    frame.x < x2 &&
    frameRight > x1 &&
    frame.y < y2 &&
    frameBottom > y1
  );
};

const findFramesWithinCoordinates = (data, x1, y1, x2, y2,rootx,rooty) => {
  let framesWithin = [];

  data.forEach(item => {
    if ((item.type === 'frame' || item.type === 'page') && isFrameWithinCoordinates(item, x1, y1, x2, y2,rootx,rooty)) {
      framesWithin.push(item.name);
    }
    if (item.elements) {
      framesWithin = framesWithin.concat(findFramesWithinCoordinates(item.elements, x1, y1, x2, y2,item.x,item.y));
    }
  });

  return framesWithin;
};



const addFrame = (newFrame) => {
  const addFrameRecursive = (elements) => {
    for (let el of elements) {
      if (el.type === 'frame' && el.name === newFrame.name) {
        el.elements = el.elements || [];
        el.elements.push(newFrame);
        return true;
      } else if (el.elements) {
        if (addFrameRecursive(el.elements)) {
          return true;
        }
      }
    }
    return false;
  };

  setData(prevData => {
    const newData = [...prevData];
    if (!addFrameRecursive(newData)) {
      newData.push(newFrame);
    }
    return newData;
  });
};

const moveElement = (name1, name2) => {
  let elementToMove = null;

  // Helper function to find and remove the element with name1
  const findAndRemove = (elements) => {
    for (let i = 0; i < elements.length; i++) {
      if (elements[i].name === name1) {
        console.log("aa")
        elementToMove = elements.splice(i, 1)[0];
        return true;
      }
      if (elements[i].elements && elements[i].elements.length > 0) {
        if (findAndRemove(elements[i].elements)) {
          return true;
        }
      }
    }
    return false;
  };

  // Helper function to find the element with name2 and add the elementToMove to its elements array
  const findAndAdd = (elements) => {
    for (let element of elements) {
      if (element.name === name2) {
        if (!element.elements) {
          element.elements = [];
        }
        element.elements.push(elementToMove);
        return true;
      }
      if (element.elements && element.elements.length > 0) {
        if (findAndAdd(element.elements)) {
          return true;
        }
      }
    }
    return false;
  };

  // Create a copy of the data state
  let newData = [...data];

  // Find and remove the element with name1
  findAndRemove(newData);

  // If the element to move was found, find the element with name2 and add the elementToMove to its elements array
  if (elementToMove) {
    findAndAdd(newData);
  }

  // Update the state with the new data
  setData(newData);
};




const moveElementToSiblingOrRoot = (name, data) => {
  const findAndMove = (elements, parent = null, grandParent = null) => {
    for (let i = 0; i < elements.length; i++) {
      const element = elements[i];

      if (element.name === name) {
        // Element found, now move it
        if (parent) {
          // Move to root level if parent exists
          const newElement = { ...element };
          elements.splice(i, 1); // Remove from current location
          if (grandParent) {
            // Add to the root level of the grandParent
            grandParent.push(newElement);
          } else {
            // Add to the root level of data
            data.push(newElement);
          }
        }
        return true; // Element found and moved
      }

      if (element.elements && element.elements.length > 0) {
        // Recurse into children
        if (findAndMove(element.elements, element, parent ? parent.elements : null)) {
          return true; // Element found in recursion
        }
      }
    }
    return false; // Element not found in this branch
  };

  // Start the search and move process
  findAndMove(data);
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
      e.preventDefault();
      const element = e.target;
        if (element.classList.contains('frame') || element.classList.contains('page')) {
          e.preventDefault();
          setDragging({ status: true, name: element.getAttribute('name') });
          setStartPoint({ x: e.clientX, y: e.clientY });
        }else{
          console.log();
          if(!rect.status){
            setSelector({...selector,tapped:true,x1: e.clientX - offset.x -250, y1: e.clientY - offset.y -50 })
          }
          if(element.classList.contains('Canvas')){
            setRect({...rect,status:false});
          }
        }
      
    };

    const handleMouseMove = (e) => {
      e.preventDefault();
      if (dragging.status) {
        const updateElement = (element , index) => {
          if (element.name === dragging.name) {    
            const isparent = {x:0,y:0,width:0,height:0};
            const frameInfo = findFrameInfo(data, element.name);
            if (frameInfo) {
              

              if(frameInfo.parent){
                if(frameInfo.parent.x>frameInfo.parent.x+element.x||frameInfo.parent.y>frameInfo.parent.y+element.y||frameInfo.parent.width<frameInfo.parent.x+element.x||frameInfo.parent.height<frameInfo.parent.y+element.y){
           
                  moveElementToSiblingOrRoot(element.name, data);
                }

                isparent.x = frameInfo.parent.x;
                isparent.y = frameInfo.parent.y;
                isparent.width = frameInfo.parent.x+frameInfo.parent.width;
                isparent.height = frameInfo.parent.y+frameInfo.parent.height;
                if((element.x+frameInfo.parent.x)===frameInfo.parent.x || element.x+frameInfo.parent.x===frameInfo.parent.x+frameInfo.parent.width){
                  setLeftGuideLine({status:true,x:element.x+frameInfo.parent.x})
                }else{
                  setLeftGuideLine({...LeftGuideLine,status:false,x:0})
                }
                
                if((element.x+element.width+frameInfo.parent.x)===frameInfo.parent.x || element.x+element.width+frameInfo.parent.x===frameInfo.parent.x+frameInfo.parent.width){
                  setRightGuideLine({status:true,x:element.x+element.width+frameInfo.parent.x})
                }else{
                  setRightGuideLine({...RightGuideLine,status:false,x:0})
                }

                
                if((element.y+frameInfo.parent.y)===frameInfo.parent.y || element.y+frameInfo.parent.y===frameInfo.parent.y+frameInfo.parent.height){
                  setTopGuideLine({status:true,y:element.y+frameInfo.parent.y})
                }else{
                  setTopGuideLine({...TopGuideLine,status:false,x:0})
                }

                if((element.y+frameInfo.parent.y+element.height)===frameInfo.parent.y+frameInfo.parent.height || (element.y+frameInfo.parent.y+element.height)===frameInfo.parent.y){
                  setBottomGuideLine({status:true,y:element.y+frameInfo.parent.y+element.height})
                }else{
                  setBottomGuideLine({...BottomGuideLine,status:false,x:0})
                }
                

              }

              if(frameInfo.siblings){
                for(let i=0;i<frameInfo.siblings.length;i++){
                  if(element.x>frameInfo.siblings[i].x&&element.x<(frameInfo.siblings[i].x+frameInfo.siblings[i].width)-50&&element.y>frameInfo.siblings[i].y&&element.y<(frameInfo.siblings[i].y+frameInfo.siblings[i].height)-50){
                 
                    moveElement(element.name, frameInfo.siblings[i].name);
                  }
                  if((element.x)===frameInfo.siblings[i].x || (element.x)=== frameInfo.siblings[i].x+frameInfo.siblings[i].width){
                    setLeftGuideLine({status:true,x:element.x})
                    break; // Terminate loop iteration
                  }else{
                    setLeftGuideLine({...LeftGuideLine,status:false})
                  }

                  
                  if((element.x+element.width)===frameInfo.siblings[i].x || (element.x+element.width)=== frameInfo.siblings[i].x+frameInfo.siblings[i].width){
                    setRightGuideLine({status:true,x:element.x+element.width})
                    break; // Terminate loop iteration
                  }else{
                    setRightGuideLine({...RightGuideLine,status:false})
                  }


                  if((element.y)===frameInfo.siblings[i].y || (element.y)===frameInfo.siblings[i].y+frameInfo.siblings[i].height){
                    setTopGuideLine({status:true,y:element.y})
                    break; // Terminate loop iteration
                  }else{
                    setTopGuideLine({...TopGuideLine,status:false})
                  }

                  
                  if((element.y+element.height)===frameInfo.siblings[i].y || (element.y+element.height)===frameInfo.siblings[i].y+frameInfo.siblings[i].height){
                    setBottomGuideLine({status:true,y:element.y+element.height})
                    break; // Terminate loop iteration
                  }else{
                    setBottomGuideLine({...BottomGuideLine,status:false})
                  }

                }
              }
            
            }

            return { ...element, x: ((e.clientX - offset.x - 250) - (element.width / 2)) - isparent.x, y: ((e.clientY - offset.y - 50) - (element.height / 2)) - isparent.y };

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
      
      if(selector.tapped){
        setSelector({...selector,status:true,x2: e.clientX -  offset.x -250, y2: e.clientY -  offset.y -50 })
      }
    };

    const handleMouseUp = () => {      

        // if(selector.x1>selector.x2 && selector.y1<selector.y2){
        
        //   console.log(findFramesWithinCoordinates(data, selector.x2, selector.y1, selector.x1, selector.y2,0,0));
        // }else if(selector.x1>selector.x2 && selector.y1>selector.y2){
        //   console.log(findFramesWithinCoordinates(data, selector.x2, selector.y2, selector.x1, selector.y1,0,0));
        // }else if(selector.x1<selector.x2 && selector.y1>selector.y2){
        //   console.log(findFramesWithinCoordinates(data, selector.x1, selector.y2, selector.x2, selector.y1,0,0));
        // }else{
        // console.log(findFramesWithinCoordinates(data, selector.x1, selector.y1, selector.x2, selector.y2,0,0));
        // }


        if(useTool==="tag"){
          addFrame({
            type: "frame",
            name: "Frame 10",
            x: selector.x1,
            y: selector.y1,
            width: selector.x2-selector.x1,
            height: selector.y2-selector.y1,
            color: 'blue',
            strokeColor: 'black',
            strokeWidth: 2,
            StrokeU: true,
            StrokeD: true,
            StrokeL: true,
            StrokeR: true,
          })
          setTool('near_me');
          setRect({status:true,name:"Frame 10",width:selector.x2-selector.x1,height:selector.y2-selector.y1,x:selector.x1,y:selector.y1})
        }

        setDragging({ status: false });
        setSelector({...selector,tapped:false,status:false})
  
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
    const handleClick = (e) =>{
      if(e.target.getAttribute('class')==="frame" || e.target.getAttribute('class')==="page"){
        setRect({status:true,name:e.target.getAttribute('name'),width:parseInt(e.target.getAttribute('width')),height:parseInt(e.target.getAttribute('height')),x:parseInt(e.target.getAttribute('x')),y:parseInt(e.target.getAttribute('y'))})
      }
    }


      const handleMouseMove2 = (e) => {
    if (resizing) {
      const dx = (e.clientX - startPoint.x) / scale;
      const dy = (e.clientY - startPoint.y) / scale;
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
          return { ...element, x: newRect.x , y:newRect.y,width:newRect.width,height:newRect.height };
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
  }, [offset,setOffset,setScale, scale, dragging, startPoint, data, setData,resizing, rect, originalRect,LeftGuideLine,BottomGuideLine,RightGuideLine,TopGuideLine,setLeftGuideLine,setTopGuideLine,setBottomGuideLine,setRightGuideLine,selector,setSelector]);

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
              {(item.elements)?
              <Frame name={item.elements} x={item.x} y={item.y}/>:null
              }
              
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
              {(item.elements)?
              <Frame name={item.elements} x={item.x} y={item.y}/>:null
              }
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

      {rect.status?(<g>
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
      </g>):null}

      {
  selector.status?
  <path d={`M ${selector.x1} ${selector.y1} L ${selector.x2} ${selector.y1} L ${selector.x2} ${selector.y2} L ${selector.x1} ${selector.y2} Z`} style={{fill: "#0094ff52", stroke: "#0D99FF", strokeWidth: 1}} />:null
}

      {
      (LeftGuideLine.status)?
      <rect x={LeftGuideLine.x} y={-offset.y} width={1} height={window.innerHeight-50} fill='orangered'/>:null
    }
    {
      (TopGuideLine.status)?
      <rect x={-offset.x} y={TopGuideLine.y} width={window.innerWidth-500} height={1} fill='orangered'/>:null
    }
    {
      (RightGuideLine.status)?
      <rect x={RightGuideLine.x} y={-offset.y} width={1} height={window.innerHeight-50} fill='orangered'/>:null
    }
    {
      (BottomGuideLine.status)?
      <rect x={-offset.x} y={BottomGuideLine.y} width={window.innerWidth-500} height={1} fill='orangered'/>:null
    }
          
    </svg>
  );
}

export default Canvas;
