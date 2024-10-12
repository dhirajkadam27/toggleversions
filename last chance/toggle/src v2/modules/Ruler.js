import { useEffect } from "react";
import { useUtils } from './Utils';
import Guides from "@scena/guides";


function Ruler() {
  const { zoom, guidesHorizontal, guidesHorizontalR, guidesVertical, guidesVerticalB } = useUtils();

  useEffect(() => {
    const container = document.querySelector('.canvas');

    const createGuide = (container, className, type) => {
      return new Guides(container, {
        className,
        type,
        zoom,
        backgroundColor: "#F5F5F5",
        textColor: "#4b555b",
        lineColor: "#d2d4e5"
      }).on("changeGuides", e => {
        console.log(`${className} guides:`, e.guides);
      });
    };
    
    guidesHorizontal.current = createGuide(container, 'HorizontalRuler', 'horizontal');
    guidesVertical.current = createGuide(container, 'VerticalRuler', 'vertical');
    guidesHorizontalR.current = createGuide(container, 'HorizontalRulerR', 'horizontal');
    guidesVerticalB.current = createGuide(container, 'VerticalRulerB', 'vertical');

    return () => {
      guidesHorizontal.current?.destroy();
      guidesVertical.current?.destroy();
      guidesHorizontalR.current?.destroy();
      guidesVerticalB.current?.destroy();
    };
  }, [zoom, guidesHorizontal, guidesHorizontalR, guidesVertical, guidesVerticalB]);


  useEffect(() => {

    // Handler for mouse down event

    const resize = () => {
      if (document.querySelector('.HorizontalRuler')) {
        guidesHorizontal.current.resize();
      guidesHorizontalR.current.resize();
      guidesVertical.current.resize();
      guidesVerticalB.current.resize();
      }
    };


    window.addEventListener('resize', resize);
    
    var canvasElement = document.getElementsByClassName('canvas')[0];

// Create a ResizeObserver to observe changes in the element's size
var resizeObserver = new ResizeObserver((entries) => {
    for (let entry of entries) {
        // You can access the new width and height here
        const newWidth = entry.contentRect.width;
        const newHeight = entry.contentRect.height;

        resize();
        // You can trigger other actions here based on the new size
    }
});


resizeObserver.observe(canvasElement);


    // Add event listeners for mouse events

    // Cleanup event listeners on component unmount
    return () => {
      window.removeEventListener('resize', resize);
    };
  }, [guidesHorizontal, guidesHorizontalR, guidesVertical,guidesVerticalB]);


  return null; 
}

export default Ruler;
