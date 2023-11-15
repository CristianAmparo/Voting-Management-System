import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import AddCandidateModal from './AddCandidateModal';
import { MyContext } from '../context/MyContext';

const Candidates = () => {
  const [data, setData] = useState([]);
  const {isAddCandidateModal, openAddCandidateModal} = useContext(MyContext)

  useEffect(() => {
    axios.get('http://localhost:5000/api/candidates/')
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

   const handleEdit = (id) => {
    // Handle edit logic
    console.log(`Edit user with id ${id}`);
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:5000/api/candidates/${id}`)
      .then((response) => {
        console.log(response.data);
        fetchData();
      })
      .catch((error) => {
        console.error(`Error deleting user with id ${id}:`, error);
      });
  };

  const tableBody = data.map((data) => (
    <tr className='border-b border-gray-200' key={data.id}>
      <td className='py-3 px-6 text-center'>{data.id}</td>
      <td className='py-3 px-6 text-left'>{data.image}</td>
      <td className='py-3 px-6 text-left'>{data.name}</td>
      <td className='py-3 px-6 text-left'>{data.position}</td>
      <td className="py-3 px-6 text-center space-x-2 flex justify-center">
        <button onClick={() => handleEdit(data.id)} className="flex items-center bg-indigo-500 text-white px-4 py-2 rounded focus:outline-none hover:bg-indigo-600 gap-1">
            <img className='w-3 h-3' src="/edit.png" alt="" />
            Edit
        </button>
        <button onClick={() => handleDelete(data.id)} className="flex items-center bg-red-500 text-white px-4 py-2 rounded focus:outline-none hover:bg-red-600 gap-1">
            <img  className='w-3 h-3'src="/delete.png" alt="" />
            Delete 
        </button>
      </td>
    </tr>
  ));

  return (
    <>
      <section className='fixed top-20 left-0 xl:left-72 bottom-0 right-0 flex flex-col px-2 md:px-10 py-10 overflow-x-auto'>
        <div className='bg-white h-full'>
          
          {isAddCandidateModal? '' : 
          <div className="w-full lg:w-2/3 mx-auto">
            <button className="bg-orange-600 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded" onClick={openAddCandidateModal}>Add Candidate</button>
            <div className="shadow-md rounded my-6 overflow-x-auto">
              <table className="min-w-full bg-white">
                <thead>
                  <tr className="bg-orange-700 text-white">
                    <th className="sticky top-0 py-3 px-6 text-center">id</th>
                    <th className="py-3 px-6 text-left">Image</th>
                    <th className="py-3 px-6 text-left">Name</th>
                    <th className="py-3 px-6 text-left">Position</th>
                    <th className="py-3 px-6 text-center">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {tableBody}
                </tbody>
              </table>
            </div>
          </div>}
        </div>
        {isAddCandidateModal? <AddCandidateModal /> : ''}
        
      </section>
    </>
  );
}

export default Candidates;