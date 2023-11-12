import React, { useState, useEffect } from 'react';
import Headers from './Header'
import Sidebar from './Sidebar';
import VoteTally from './VoteTally';


const Sample = () => {
  return (
    <>
    <Headers />
    <Sidebar />
    <VoteTally />

    </>
  );
}

export default Sample;