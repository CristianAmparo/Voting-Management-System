import React, { useState, useEffect, useContext} from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';
import { MyContext } from '../../context/MyContext';
import GetHeaders from '../GetHeaders';
const apiHost = import.meta.env.VITE_host

function Duration() {
const [startDate, setStartDate] = useState('');
const [endDate, setEndDate] = useState('');
const {closeDurationModal} = useContext(MyContext)
const headers = GetHeaders()


  useEffect(() => {
    // Make a GET request to fetch the election settings
    axios
      .get(`${apiHost}api/votes/voteEnd`, {headers})
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
  // Display a SweetAlert2 confirmation dialog
  Swal.fire({
    icon: 'question',
    title: 'UPDATE END DATE',
    text: 'Are you sure you want to update election end date?',
    showCancelButton: true,
    confirmButtonText: 'Yes, update',
    cancelButtonText: 'No, cancel',
  }).then((result) => {
    // If the user confirms the update
    if (result.isConfirmed) {
      // Make the API request to update election settings
      axios
        .put(`${apiHost}api/votes/voteEnd`, { startDate, endDate }, { headers })
        .then(response => {
          // Display a SweetAlert2 success message
          Swal.fire({
            icon: 'success',
            title: 'Success!',
            text: response.data.message,
          });

          // Log the response data
          console.log(response.data);

          // Close the modal
          closeDurationModal();
        })
        .catch(error => {
          // Display a SweetAlert2 error message
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: `Error updating election settings: ${error.response.data.error}`,
          });

          // Log the error
          console.error('Error updating election settings:', error);
        });
    }
  });
};



  return (
    <section>
      <div className='absolute inset-0 flex  justify-center backdrop-blur-sm pt-36 z-20'>
      <div className='px-4 py-2 bg-white h-max shadow-2xl rounded-3xl w-96'>
        <div className="max-w-md mx-auto text-black pt-5 px-2 space-y-5">
          <h1 className="text-2xl font-bold leading-tight tracking-tight text-gray-900 md:text-4xl text-center"><span className='text-orange-600'>Duration</span> Settings</h1>          <div>
          <label>Start Date:</label>
          <input type="datetime-local" 
            value={startDate} 
            className="form-input py-2 px-3 block w-full leading-5 text-gray-700 border border-gray-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 focus:outline-none rounded-md focus:border-indigo-500"
            onChange={e => setStartDate(e.target.value)} />
          </div>
          <div>
          <label>End Date:</label>
          <input type="datetime-local" 
            value={endDate} 
            className="form-input py-2 px-3 block w-full leading-5 text-gray-700 border border-gray-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 focus:outline-none rounded-md focus:border-indigo-500"
            onChange={e => setEndDate(e.target.value)} />
            </div>
          <div className='w-full justify-center flex gap-2'>      
            <button className="bg-white text-orange-600 hover:text-orange-700 border border-orange-600 hover:border-orange-700 font-bold py-2 px-4 rounded" onClick={closeDurationModal}>Cancel</button>
            <button className="bg-orange-600 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded" onClick={handleUpdateSettings}>Update</button>
          </div>
          <div>
        </div>
        </div>     
      </div>
      </div>
    </section>
    
    
  
    
   
    
  );
}


export default Duration;
