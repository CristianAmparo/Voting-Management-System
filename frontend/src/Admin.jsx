import React from 'react';
import { Routes, Route} from "react-router-dom"
import Headers from './component//Header';
import Sidebar from './component/Sidebar';
import Dashboard from './admin/Dashboard';
import Sample from "./admin/Sample"
import VotesInfo from './admin/VotesInfo';
import Candidates from './admin/Candidates';
import Users from './admin/Users';
import Result from './admin/Result';



const Admin = () => {
  return (
    <>
      <Headers />
      <Sidebar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/sample" element={<Result />} />
        <Route path='/voteinfo' element={<VotesInfo />} />
        <Route path='/candidates' element={<Candidates />} />
        <Route path='/users' element={<Users />} />
        


      </Routes>
    </>
  );
}

export default Admin;
