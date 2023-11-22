import React from 'react'
import { Routes, Route} from "react-router-dom"
import DoneVoting from './user/DoneVoting';
import BallotPage from './user/BallotPage';
import Header from './user/Header';
import ElectionEnded from './user/ElectionEnded';
import ContentPage from './user/ContentPage';
import UpdateResponse from './user/UpdateResponse';
import AccountModal from './user/accountModal';

const User = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<ContentPage />} />
        <Route path="/votingPage" element={<BallotPage />} />
        <Route path='/doneVoting' element={<DoneVoting />} />
        <Route path='/updateResponse' element={<UpdateResponse />} />
        <Route path='/electionEnded' element={<ElectionEnded />} />
        <Route path='/sample' element={<AccountModal />} />
      </Routes>
    </>
  );
}

export default User;