// config.js

import React, { createContext, useContext, useRef, useState } from 'react';

// Create a context for the name
const Context = createContext();

// Custom hook to use the name context
export const useUtils = () => useContext(Context);

// Name Provider component
export const Provider = ({ children }) => {
    const [targets, setTargets] = useState([]);
    const [pages, setpages] = useState([]);
    const [layer, setLayer] = useState([]);
    const [activeTool, setActiveTool] = useState('Select');
    const [zoom, setZoom] = useState(1);
    const viewerRef = React.useRef(null);
    const guidesHorizontal = useRef(null);
    const guidesVertical = useRef(null);
    const guidesHorizontalR = useRef(null);
    const guidesVerticalB = useRef(null);
    const [moveableTriggers, SetMoveableTriggers] = useState({ "draggable": true, "resizable": true, "rotatable": true, "snappable": true });
    const moveable = useRef(null);
    let elementGuidelines = [];
    const [isMouseDown, setIsMouseDown] = useState({ status: false, moved: false });
    const [element, setElement] = useState({ x: 0, y: 0, name: null, backelement: null });
  

  return (
    <Context.Provider value={{ targets, setTargets,pages, setpages,layer, setLayer,activeTool, setActiveTool,zoom,setZoom,viewerRef,guidesHorizontal,guidesHorizontalR,guidesVertical,guidesVerticalB,moveableTriggers, SetMoveableTriggers,moveable,elementGuidelines,isMouseDown, setIsMouseDown,element, setElement }}>
      {children}
    </Context.Provider>
  );
};
