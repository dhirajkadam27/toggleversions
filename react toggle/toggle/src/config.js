// config.js

import React, { createContext, useContext, useState } from 'react';

// Create a context for the name
const Context = createContext();

// Custom hook to use the name context
export const useToggle = () => useContext(Context);

// Name Provider component
export const Provider = ({ children }) => {
  const [LangingPopup,setLangingPopup]=useState({status:false,type:null});

  return (
    <Context.Provider value={{ LangingPopup, setLangingPopup }}>
      {children}
    </Context.Provider>
  );
};
