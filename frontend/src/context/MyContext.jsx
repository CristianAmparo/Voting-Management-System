import React, { createContext, useState, useEffect } from 'react'

const MyContext = createContext();

const MyContextProvider = ({children}) => {
    const [isSidebarOpen, setSidebarOpen] = useState(() => {
    return JSON.parse(localStorage.getItem('isSidebarOpen')) || false;
  });
    const [isDurationModalOpen, setIsDurationModalOpen] = useState(false);
    const [isAddCandidateModal, setIsAddCandidateModal] = useState(false);
    const [isEditCandidateModal, setIsEditCandidateModal] = useState(false);

    const [candidateId, setCandidateId] = useState('')

    useEffect(() => {
      // Save the value to local storage whenever it changes
      localStorage.setItem('isSidebarOpen', JSON.stringify(isSidebarOpen));
    }, [isSidebarOpen]);

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