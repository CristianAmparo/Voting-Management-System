import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import VoteTally from './VoteTally';

function Dashboard() {
    

  return (
    <>
      <section className='fixed top-20 left-0 xl:left-72 bottom-0 right-0 flex flex-col'>
        <section className='p-5'>
          <h1 className=' pb-5 text-4xl font-sans text-orange-500 tracking-wider font-bold sm:block hidden titleShadow underline-offset-4 underline'>Dashboard</h1>
          <div className=' text-white flex gap-5'>
            <div className='px-4 py-2 bg-secondary-100 rounded-3xl w-56'>
              <div className='flex justify-between items-center w-full '>
                <span className='text-lg font-bold'>Total Votes</span>
                <a href=""><img className='w-6 h-6' src="/details.png" alt="" /></a>
              </div>
              <div className='w-full flex items-center justify-center pb-3'>
                <img className='w-8' src="/votes.png" alt="" />
                <span className='text-7xl  pb-1 pl-1 font-bold'>71</span>
              </div>
            </div>
            <div className='px-4 py-2 bg-secondary-200 rounded-3xl w-56'>
              <div className='flex justify-between items-center w-full '>
                <span className='text-lg font-bold'>Total Voters</span>
                <a href=""><img className='w-6 h-6' src="/details.png" alt="" /></a>
              </div>
              <div className='w-full flex items-center justify-center pb-3'>
                <img className='w-8' src="/votes.png" alt="" />
                <span className='text-7xl  pb-1 pl-1 font-bold'>71</span>
              </div>
            </div>
            <div className='px-4 py-2 bg-secondary-300 rounded-3xl w-96'>
              <div className='flex justify-between items-center w-full '>
                <span className='text-lg font-bold'>Election Duration</span>
                <a href=""><img className='w-6 h-6' src="/details.png" alt="" /></a>
              </div>
              <div className='w-full flex items-center justify-center pb-3'>
                <img className='w-8' src="/votes.png" alt="" />
                <span className='text-7xl  pb-1 pl-1 font-bold'>3d 22h</span>
              </div>
            </div>
          </div>
        </section>
        <VoteTally />
      </section>
    </>
  )
}

export default Dashboard;
