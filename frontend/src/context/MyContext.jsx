import React, { createContext, useState } from 'react'

const MyContext = createContext();

const MyContextProvider = ({children}) => {
    const [isSidebarOpen, setSidebarOpen] = useState(true); // Initial state is open
    const toggleSidebar = () => {
        setSidebarOpen(!isSidebarOpen);
    };

      return (
        <MyContext.Provider value={{toggleSidebar, isSidebarOpen}}>
            {children}    
        </MyContext.Provider>
      )
  }


export { MyContext, MyContextProvider }