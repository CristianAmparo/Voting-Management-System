import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Headers from './component//Header';
import Sidebar from './component/Sidebar';
import Dashboard from './admin/Dashboard';
import Duration from './admin/modal/Duration';
import Sample from "./admin/Sample"
import VotesInfo from './admin/VotesInfo';
import Candidates from './admin/Candidates';



const Admin = () => {
  return (
    <>
      <Headers />
      <Sidebar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/sample" element={<Sample />} />
        <Route path='/voteinfo' element={<VotesInfo />} />
        <Route path='/candidates' element={<Candidates />} />
        


      </Routes>
    </>
  );
}

export default Admin;
