import React, { createContext, useState, useEffect } from 'react'

const MyContext = createContext();

const MyContextProvider = ({children}) => {
    const [isSidebarOpen, setSidebarOpen] = useState(true); 
    const [isDurationModalOpen, setIsDurationModalOpen] = useState(false);
    const [isAddCandidateModal, setIsAddCandidateModal] = useState(false);

const toggleSidebar = () => {
        setSidebarOpen(!isSidebarOpen);
    };

const openDurationModal = () => {
  setIsDurationModalOpen(true);
};

const closeDurationModal = () => {
  setIsDurationModalOpen(false);
};

const openAddCandidateModal = () => {
  setIsDurationModalOpen(true);
};

const closeAddCandidateModal = () => {
  setIsDurationModalOpen(false);
};

    

  
  

  // Function to format remaining time based on specified rules

    
      return (
        <MyContext.Provider 
          value={{
            toggleSidebar, isSidebarOpen, isDurationModalOpen, 
            openDurationModal, closeDurationModal, isAddCandidateModal,
            openAddCandidateModal, closeAddCandidateModal   }}>
            {children}    
        </MyContext.Provider>
      )
  }


export { MyContext, MyContextProvider }