import React, { useState, createContext } from "react";
export const GeneralContext = createContext();

export const GeneralProvider = ({ children }) => {
  const [userData, setUserData] = useState({
    id:0,
    username:'',
    name:'',
    email:'',
    rol:0,
    token:''
  });

  return (
    <GeneralContext.Provider value={[userData, setUserData]}>
      {children}
    </GeneralContext.Provider>
  );
};