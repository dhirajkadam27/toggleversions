import { useEffect } from "react";
import { useUtils } from './Utils';

function DrawElement() {
  const { element, setElement, activeTool, zoom, setTargets, setActiveTool, isMouseDown, setIsMouseDown, setContent } = useUtils();

  useEffect(() => {

    // Handler for mouse down event

    const handleMouseDown = (e) => {

      if (e.target.className !== "w-full font-normal bg-transparent !outline-none placeholder:text-foreground-500 focus-visible:outline-none data-[has-start-content=true]:ps-1.5 data-[has-end-content=true]:pe-1.5 file:cursor-pointer file:bg-transparent file:border-0 autofill:bg-transparent bg-clip-text text-small group-data-[has-value=true]:text-default-foreground") {
        e.preventDefault();

        setElement({ x: 0, y: 0, name: null, backelement: null });
        if (activeTool === "Element") {

          if (e.target.className === "infinite-viewer-scroll-area") {
            //  document.querySelector('.viewport').appendChild(div);

            const length = document.querySelectorAll('.target').length;

            setIsMouseDown({ status: true, moved: false });
            setElement((prevState) => ({
              ...prevState,
              x: e.clientX - e.target.getBoundingClientRect().left,
              y: e.clientY - e.target.getBoundingClientRect().top,
              name: "target" + length,
              backelement: e.target
            }));

            const transformValue = document.querySelector('.viewport').style.transform;
            const match = /translate3d\(([^,]+)px, ([^,]+)px, ([^,]+)px\)/.exec(transformValue);

            var div1 = document.createElement('div');
            div1.setAttribute('class', 'target target' + length);
            div1.style.cssText = "width: 0px;height: 0px;position: absolute;top: " + ((e.clientY - e.target.getBoundingClientRect().top - parseFloat(match[2])) / zoom) + "px;left: " + ((e.clientX - e.target.getBoundingClientRect().left - parseFloat(match[1])) / zoom) + "px;background:#D9D9D9";


            document.querySelector('.viewport').appendChild(div1);
          } else {

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
            div.style.cssText = "width: 0px;height: 0px;position: absolute;top: " + (e.clientY - e.target.getBoundingClientRect().top) / zoom + "px;left: " + (e.clientX - e.target.getBoundingClientRect().left) / zoom + "px;background:#D9D9D9";


            e.target.appendChild(div);
          }

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
          img.style.cssText = "width: 0px;height: 0px;position: absolute;top: " + (e.clientY - e.target.getBoundingClientRect().top) / zoom + "px;left: " + (e.clientX - e.target.getBoundingClientRect().left) / zoom + "px;";
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
          text.style.cssText = "width: 0px;height: 0px;position: absolute;top: " + (e.clientY - e.target.getBoundingClientRect().top) / zoom + "px;left: " + (e.clientX - e.target.getBoundingClientRect().left) / zoom + "px;color:black";
          e.target.appendChild(text);
        }


      }




    };

    // Handler for mouse up event
    const handleMouseUp = async (e) => {

      if (activeTool === "Element" || activeTool === "Media" || activeTool === "Text") {
        if (isMouseDown.moved) {
          setTargets([document.getElementsByClassName(element.name)[0]]);
          setActiveTool('Select');
        } else {
          document.querySelector("." + element.name).remove();
          setElement({ x: 0, y: 0, name: null, backelement: null });
        }

        const htmldata = document.querySelector('.viewport').innerHTML;

        // Create a temporary container to parse the HTML string
        const tempContainer = document.createElement('div');
        tempContainer.innerHTML = htmldata;
        
        // Remove the first child from the temporary container
        if (tempContainer.firstChild) {
            tempContainer.removeChild(tempContainer.firstChild);
        }
        
        // Update htmldata with the modified HTML
        const updatedHtmldata = tempContainer.innerHTML;
            localStorage.setItem('content', updatedHtmldata);
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
  }, [isMouseDown, element, activeTool, zoom, setActiveTool, setElement, setIsMouseDown, setTargets,setContent]);

  return null;
}

export default DrawElement;
