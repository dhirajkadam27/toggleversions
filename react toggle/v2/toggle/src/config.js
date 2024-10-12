// config.js

import React, { createContext, useContext, useState } from 'react';

// Create a context for the name
const Context = createContext();

// Custom hook to use the name context
export const useToggle = () => useContext(Context);

// Name Provider component
export const Provider = ({ children }) => {
    const [useTool, setTool] = useState('near_me');
    const [useTab, setTab] = useState('design_services');
    const [offset, setOffset] = useState({ x: 0, y: 0 });
      const [scale, setScale] = useState(1);

      const [data, setData] = useState([
        {
          type: "frame",
          name: "Frame 4",
          x: 350,
          y: 250,
          width: 100,
          height: 100,
          color: 'white',
          strokeColor: 'grey',
          strokeWidth: 1,
          StrokeU: true,
          StrokeD: true,
          StrokeL: true,
          StrokeR: true,
          elements:[
            {
              type: "frame",
              name: "Frame 5",
              x: 350,
              y: 250,
              width: 100,
              height: 100,
              color: 'white',
              strokeColor: 'grey',
              strokeWidth: 1,
              StrokeU: true,
              StrokeD: true,
              StrokeL: true,
              StrokeR: true,
              elements:[ {
                type: "frame",
                name: "Frame 6",
                x: 350,
                y: 250,
                width: 100,
                height: 100,
                color: 'white',
                strokeColor: 'grey',
                strokeWidth: 1,
                StrokeU: true,
                StrokeD: true,
                StrokeL: true,
                StrokeR: true,
              }]
            }]
        },
        {
          type: "frame",
          name: "Frame 1",
          x: 450,
          y: 450,
          width: 400,
          height: 100,
          color: 'white',
          strokeColor: 'grey',
          strokeWidth: 1,
          StrokeU: true,
          StrokeD: true,
          StrokeL: true,
          StrokeR: true,
        },    {
          type: "page",
          name: "Page 1",
          x: 10,
          y: 10,
          width: 300,
          height: 300,
          color: 'white',
          elements: [
            {
              type: "frame",
              name: "Frame 2",
              x: 10,
              y: 10,
              width: 100,
              height: 100,
              color: 'white',
              strokeColor: 'grey',
              strokeWidth: 1,
              StrokeU: true,
              StrokeD: true,
              StrokeL: true,
              StrokeR: true
            }
          ]
        }
      ]);


  return (
    <Context.Provider value={{ useTool, setTool,useTab, setTab,offset, setOffset,scale, setScale,data,setData }}>
      {children}
    </Context.Provider>
  );
};
