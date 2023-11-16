import React, { createContext, useState, useEffect } from 'react'

const MyContext = createContext();

const MyContextProvider = ({children}) => {
    const [isSidebarOpen, setSidebarOpen] = useState(true); 
    const [isDurationModalOpen, setIsDurationModalOpen] = useState(false);
    const [isAddCandidateModal, setIsAddCandidateModal] = useState(false);
    const [isEditCandidateModal, setIsEditCandidateModal] = useState(false);

    const [candidateId, setCandidateId] = useState('')

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
  setIsAddCandidateModal(true);
};

const closeAddCandidateModal = () => {
  setIsAddCandidateModal(false);
};

const editCandidate = (id) => {
  setCandidateId(id);
  setIsEditCandidateModal(true);
}


const closeEditCandidateModal = () => {
  setIsEditCandidateModal(false);
};

    

  
  

  // Function to format remaining time based on specified rules

    
      return (
        <MyContext.Provider 
          value={{
            toggleSidebar, isSidebarOpen, isDurationModalOpen, 
            openDurationModal, closeDurationModal, isAddCandidateModal,
            openAddCandidateModal, closeAddCandidateModal, editCandidate,
            candidateId, isEditCandidateModal, closeEditCandidateModal}}>
            {children}    
        </MyContext.Provider>
      )
  }


export { MyContext, MyContextProvider }