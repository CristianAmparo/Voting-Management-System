import React, { createContext, useState, useEffect } from 'react'

const MyContext = createContext();

const MyContextProvider = ({children}) => {
    const [isSidebarOpen, setSidebarOpen] = useState(true); 
    const toggleSidebar = () => {
        setSidebarOpen(!isSidebarOpen);
    };

  
  

  // Function to format remaining time based on specified rules

    
      return (
        <MyContext.Provider value={{toggleSidebar, isSidebarOpen}}>
            {children}    
        </MyContext.Provider>
      )
  }


export { MyContext, MyContextProvider }