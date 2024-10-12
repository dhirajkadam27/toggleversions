// config.js

import React, { createContext, useContext, useState } from 'react';

// Create a context for the name
const Context = createContext();

// Custom hook to use the name context
export const useData = () => useContext(Context);

// Name Provider component
export const Provider = ({ children }) => {
  const [initialCoordinates, setInitialCoordinates] = useState({ x: 0, y: 0 });
  const [activeTool, setActiveTool] = useState('Select');

  return (
    <Context.Provider value={{ initialCoordinates,setInitialCoordinates,activeTool, setActiveTool }}>
      {children}
    </Context.Provider>
  );
};
