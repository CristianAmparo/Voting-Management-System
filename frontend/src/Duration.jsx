import React, { useState, useEffect} from 'react';
import axios from 'axios';

function Duration() {
     const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  useEffect(() => {
    // Make a GET request to fetch the election settings
    axios
      .get('http://localhost:5000/api/votes/voteEnd')
      .then(response => {
        const { electionStartDate, electionEndDate } = response.data;
        setStartDate(electionStartDate);
        setEndDate(electionEndDate);
      })
      .catch(error => {
        console.error('Error fetching election settings:', error);
      });
  }, []);
  const handleUpdateSettings = () => {
    // Make a PUT request to update the election settings
    axios
      .put('http://localhost:5000/api/votes/voteEnd', { startDate, endDate })
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.error('Error updating election settings:', error);
      });
  };


  return (
    <div>
      <h2>Admin Settings</h2>
      <label>Start Date:</label>
      <input type="datetime-local" value={startDate} onChange={e => setStartDate(e.target.value)} />
      <br />
      <label>End Date:</label>
      <input type="datetime-local" value={endDate} onChange={e => setEndDate(e.target.value)} />
      <br />
      <button onClick={handleUpdateSettings}>Update Settings</button>
      <div>
    </div>
    </div>
    
  );
}


export default Duration;
