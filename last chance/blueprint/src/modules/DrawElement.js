import { useEffect } from "react";
import { useUtils } from '../modules/Utils';

function DrawElement() {
  const { element,setElement,activeTool,zoom,setTargets,setActiveTool,isMouseDown,setIsMouseDown } = useUtils();

  useEffect(() => {

    // Handler for mouse down event

    const handleMouseDown = (e) => {

      if(e.target.classList[0]!=="propertiestags"){
        e.preventDefault();

        setElement({ x: 0, y: 0, name: null, backelement: null });
        if (activeTool === "Element") {
          const length = document.querySelectorAll('.target').length;
  
          setIsMouseDown({ status: true, moved: false });
          setElement((prevState) => ({
            ...prevState,
            x: e.clientX - e.target.getBoundingClientRect().left,
            y: e.clientY - e.target.getBoundingClientRect().top,
            name: "target" + length,
            backelement: e.target
          }));
  
          var div = document.createElement('div');
          div.setAttribute('class', 'target target' + length);
          div.style.cssText = "width: 0px;height: 0px;border: 1px solid black;position: absolute;top: " + (e.clientY - e.target.getBoundingClientRect().top) / zoom + "px;left: " + (e.clientX - e.target.getBoundingClientRect().left) / zoom + "px;background:white";
          e.target.appendChild(div);
        }
  
        if (activeTool === "Media") {
          const length = document.querySelectorAll('.img').length;
  
          setIsMouseDown({ status: true, moved: false });
          setElement((prevState) => ({
            ...prevState,
            x: e.clientX - e.target.getBoundingClientRect().left,
            y: e.clientY - e.target.getBoundingClientRect().top,
            name: "img" + length,
            backelement: e.target
          }));
  
          var img = document.createElement('img');
          img.setAttribute('class', 'img img' + length);
          img.setAttribute('src', `data:image/png;base64,${localStorage.getItem('wallpaper')}`);
          img.style.cssText = "width: 0px;height: 0px;border: 1px solid black;position: absolute;top: " + (e.clientY - e.target.getBoundingClientRect().top) / zoom + "px;left: " + (e.clientX - e.target.getBoundingClientRect().left) / zoom + "px;";
          e.target.appendChild(img);
        }
  
        if (activeTool === "Text") {
          const length = document.querySelectorAll('.text').length;
  
          setIsMouseDown({ status: true, moved: false });
          setElement((prevState) => ({
            ...prevState,
            x: e.clientX - e.target.getBoundingClientRect().left,
            y: e.clientY - e.target.getBoundingClientRect().top,
            name: "text" + length,
            backelement: e.target
          }));
  
          var text = document.createElement('div');
          text.setAttribute('class', 'text text' + length);
          text.setAttribute('contenteditable', 'true');
          text.style.cssText = "width: 0px;height: 0px;position: absolute;top: " + (e.clientY - e.target.getBoundingClientRect().top) / zoom + "px;left: " + (e.clientX - e.target.getBoundingClientRect().left) / zoom + "px;";
          e.target.appendChild(text);
        }

        
      }
  



    };

    // Handler for mouse up event
    const handleMouseUp = (e) => {

      if (activeTool === "Element" || activeTool === "Media" || activeTool === "Text") {
        if (isMouseDown.moved) {
          setTargets([document.getElementsByClassName(element.name)[0]]);
          setActiveTool('Select');
        } else {
          document.querySelector("." + element.name).remove();
          setElement({ x: 0, y: 0, name: null, backelement: null });
        }
        setIsMouseDown({ status: false, i: 0 });
        console.log("mouse up");
      }
    };

    // Handler for mouse move event
    const handleMouseMove = (e) => {

      if (isMouseDown.status) {
        setIsMouseDown({ status: true, moved: true });
        document.querySelector("." + element.name).style.width = ((e.clientX - element.backelement.getBoundingClientRect().left) - element.x) / zoom + "px";
        document.querySelector("." + element.name).style.height = ((e.clientY - element.backelement.getBoundingClientRect().top) - element.y) / zoom + "px";
      }
    };

    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('mousemove', handleMouseMove);

    // Add event listeners for mouse events

    // Cleanup event listeners on component unmount
    return () => {
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isMouseDown, element, activeTool, zoom,setActiveTool,setElement,setIsMouseDown,setTargets]);

  return null;
}

export default DrawElement;
