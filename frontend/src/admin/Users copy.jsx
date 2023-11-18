import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Users = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/users/')
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const tableBody = data.map((data) => (
    <tr className='border-b border-gray-200' key={data.id}>
      <td className='py-3 px-6 text-left'>{data.id}</td>
      <td className='py-3 px-6 text-left'>{data.name}</td>
      <td className='py-3 px-6 text-left'>{data.username}</td>
      <td className='py-3 px-6 text-left'>{data.password}</td>

      <td className="py-3 px-6 text-center">
        <a href="#" className="text-indigo-600 hover:text-indigo-900">Edit</a>
        <span className="mx-2">|</span>
        <a href="#" className="text-red-600 hover:text-red-900">Delete</a>
      </td>
    </tr>
  ));

  return (
    <>
      <section className='fixed top-20 left-0 xl:left-72 bottom-0 right-0 flex flex-col px-2 lg:px-10 py-10 overflow-x-auto'>
        <div className="w-full  mx-auto">
          <div className="overflow-auto scrollbar-w-2 scrollbar-track-gray-200 scrollbar-thumb-gray-500 scrollbar-thumb-rounded-full scrollbar-track-rounded-full">
            <table className="w-full bg-white">
              <thead>
                <tr className="bg-orange-700 text-white">
                  <th className="py-3 px-6 text-center">id</th>
                  <th className="py-3 px-6 text-left">Name</th>
                  <th className="py-3 px-6 text-left">Username</th>
                  <th className="py-3 px-6 text-left">Password</th>
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
  );
}

export default Users;
