import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Headers from './admin/Header';
import Sidebar from './admin/Sidebar';
import Dashboard from './admin/Dashboard';
import Duration from './admin/Duration';
import Sample from "./admin/Sample"
import VotesInfo from './admin/VotesInfo';
import Candidates from './admin/Candidates';
import Users from './admin/Users';


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
        <Route path='/users' element={<Users />} />


      </Routes>
    </>
  );
}

export default Admin;
