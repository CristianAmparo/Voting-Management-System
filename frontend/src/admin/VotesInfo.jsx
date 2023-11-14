import React, { useState, useEffect } from 'react';
import axios from 'axios';

const VotesInfo = () => {
  const [data, setData] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/api/votes/')
        .then((response) => {
            setData(response.data);
        })
        .catch((error) => {
            console.error('Error fetching data:', error);
        })
    }, []);

    const tableBody = data.map((data) => (
      <tr className='border-b border-gray-200' key={data.id}>
        <td className='py-3 px-6 text-center'>{data.id}</td>
        <td className='py-3 px-6 text-center'>{data.user_id}</td>
        <td className='py-3 px-6 text-left'>{data.president}</td>
        <td className='py-3 px-6 text-left'>{data.vice}</td>
        <td className='py-3 px-6 text-left'>{data.secretary}</td>
        <td className='py-3 px-6 text-left'>{data.treasurer}</td>
        <td className='py-3 px-6 text-left'>{data.first_rep}</td>
       
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
                <th className="py-3 px-6 text-center">UserId</th>
                <th className="py-3 px-6 text-left">President</th>
                <th className="py-3 px-6 text-left">Vice</th>
                <th className="py-3 px-6 text-left">Secretary</th>
                <th className="py-3 px-6 text-left">Treasurer</th>
                <th className="py-3 px-6 text-left">First_Rep</th>
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

export default VotesInfo