// config.js

import React, { createContext, useContext, useState } from 'react';

// Create a context for the name
const Context = createContext();

// Custom hook to use the name context
export const useUtils = () => useContext(Context);

// Name Provider component
export const Provider = ({ children }) => {
    const [layerwidth, setlayerwidth] = useState(0);
    const [propertieswidth, setpropertieswidth] = useState(0);

  

  return (
    <Context.Provider value={{ layerwidth, setlayerwidth,propertieswidth, setpropertieswidth }}>
      {children}
    </Context.Provider>
  );
};
