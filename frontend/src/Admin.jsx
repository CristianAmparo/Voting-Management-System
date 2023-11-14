import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Headers from './Header';
import Sidebar from './Sidebar';
import Dashboard from './Dashboard';
import ElectionDuration from './ElectionDuration';
import Sample from "./sample"


const Admin = () => {
  return (
    <>
      <Headers />
      <Sidebar />
      <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/sample" element={<Sample />} />
      <Route path='/duration' element={<ElectionDuration />} />
      </Routes>
    </>
  );
}

export default Admin;
