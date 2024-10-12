import { useEffect } from "react";
import { useUtils } from '../modules/Utils';
import Guides from "@scena/guides";

// Debounce function to limit the rate of guide resizing
const debounce = (func, delay) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), delay);
  };
};

function Ruler() {
  const { zoom, guidesHorizontal, guidesHorizontalR, guidesVertical, guidesVerticalB } = useUtils();

  useEffect(() => {
    const container = document.body;

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
    const resize = debounce(() => {
      guidesHorizontal.current?.resize();
      guidesHorizontalR.current?.resize();
      guidesVertical.current?.resize();
      guidesVerticalB.current?.resize();
    }, 100); // Adjust the delay as needed

    window.addEventListener('resize', resize);

    return () => {
      window.removeEventListener('resize', resize);
    };
  }, [guidesHorizontal, guidesHorizontalR, guidesVertical, guidesVerticalB]);

  return null; 
}

export default Ruler;
