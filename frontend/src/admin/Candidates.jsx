import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import AddCandidateModal from './AddCandidateModal';
import { MyContext } from '../context/MyContext';
import EditCandidateModal from './editCandidateModal';

const Candidates = () => {
  const [data, setData] = useState([]);
  const {isAddCandidateModal, openAddCandidateModal, editCandidate, isEditCandidateModal} = useContext(MyContext)
  useEffect(() => {
    axios.get('http://localhost:5000/api/candidates/')
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);


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
      <td className='py-3 px-6 text-left'>{data.name}</td>
      <td className='py-3 px-6 text-left'>{data.partylist}</td>
      <td className='py-3 px-6 text-left'>{data.position}</td>
      <td className='py-3 px-6 text-left'>{data.image}</td>
      <td className="py-3 px-6 text-center space-x-2 flex justify-center">
        <button onClick={() => editCandidate(data.id)} className="flex items-center justify-center bg-indigo-500 text-white px-4 py-2 rounded focus:outline-none hover:bg-indigo-600 gap-1">
            <img className='w-3 h-3' src="/edit.png" alt="" />
            Edit
        </button>
        <button onClick={() => handleDelete(data.id)} className="flex items-center justify-center bg-red-500 text-white px-4 py-2 rounded focus:outline-none hover:bg-red-600 gap-1">
            <img  className='w-3 h-3'src="/delete.png" alt="" />
            Delete 
        </button>
      </td>
    </tr>
  ));

  return (
    <>
      <section className='fixed top-20 left-0 xl:left-72 bottom-0 right-0 flex flex-col justify-center xl:px-20 md:px-10 sm:px-2  py-10 overflow-x-auto'>
        <div>
          <div className="w-full bg-white px-2 md:px-10 h-full pb-10 mx-auto rounded-3xl shadow-2xl">
            <div className=' p-5 w-full flex justify-between items-center '>
             <h1 className="text-2xl font-bold leading-tight tracking-tight text-gray-900 md:text-4xl text-left"><span className='text-orange-600'>Candidates</span> Table</h1>
             <button onClick={openAddCandidateModal} className="flex items-center bg-green-600 text-white px-4 py-2 rounded focus:outline-none hover:bg-green-700 gap-1">
                <img className='w-3 h-3' src="/edit.png" alt="" /> Add
            </button>
            </div>
            <div className="shadow-md rounded mb-6 overflow-auto">
              <table className="min-w-full bg-white">
                <thead>
                  <tr className="bg-orange-700 text-white">
                    <th className="sticky top-0 py-3 px-6 text-center">id</th>
                    <th className="py-3 px-6 text-left">Name</th>
                    <th className="py-3 px-6 text-left">Partylist</th>
                    <th className="py-3 px-6 text-left">Position</th>
                    <th className="py-3 px-6 text-left">Image</th>
                    <th className="py-3 px-6 text-center">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {tableBody}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        {isAddCandidateModal? <AddCandidateModal /> : ''}
        {isEditCandidateModal? <EditCandidateModal /> : ''}
        
      </section>
    </>
  );
}

export default Candidates;