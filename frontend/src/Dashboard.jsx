import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const navigate = useNavigate();
  const [data, setData] = useState(JSON.parse(localStorage.getItem('myData')));

  useEffect(() => {
    if (!data || !data.name) {
      navigate("/login");
    }
  }, [data, navigate]);

  const handleLogout = () => {
    // Remove the item from local storage
    localStorage.removeItem('myData');
    // Update the state
    setData(null);
    navigate("/login");
  }

  return (
    <>
      <div>Dashboard</div>
      <h1>Hello {data && data.name}</h1>
      <button onClick={handleLogout}>Logout</button>
    </>
  )
}

export default Dashboard;
