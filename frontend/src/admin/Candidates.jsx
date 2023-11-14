import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Candidates = () => {
  const [data, setData] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/api/candidates/')
        .then((response) => {
            setData(response.data);
        })
        .catch((error) => {
            console.error('Error fetching data:', error);
        })
    }, []);

    const tableBody = data.map((data) => (
      <tr className='border-b border-gray-200' key={data.id}>
        <td className='py-3 px-6 text-left'>{data.id}</td>
        <td className='py-3 px-6 text-left'>{data.image}</td>
        <td className='py-3 px-6 text-center'>{data.name}</td>
        <td className='py-3 px-6 text-center'>{data.position}</td>
        <td className='py-3 px-6 text-center'>{data.platform}</td>
        <td className='py-3 px-6 text-center'>{data.credentials}</td>
        <td class="py-3 px-6 text-center">
          <a href="#" class="text-indigo-600 hover:text-indigo-900">Edit</a>
          <span class="mx-2">|</span>
          <a href="#" class="text-red-600 hover:text-red-900">Delete</a>
        </td>
       
      </tr>
    ));
          

  return(
    <>
    <section className='fixed top-20 left-0 xl:left-72 bottom-0 right-0 flex flex-col '>
      <div className="w-full lg:w-2/3 mx-auto">
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded my-6">
            <thead>
              <tr className="bg-orange-700 text-white">
                <th className="py-3 px-6 text-center">id</th>
                <th className="py-3 px-6 text-center">Image</th>
                <th className="py-3 px-6 text-left">Name</th>
                <th className="py-3 px-6 text-center">Position</th>
                <th className="py-3 px-6 text-center">Platform/s</th>
                <th className="py-3 px-6 text-center">Credential/s</th>
                <th className="py-3 px-6 text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {tableBody}
            </tbody>
          </table>
          </div>
        </div>
    </section>
    </>
  )
}

export default Candidates