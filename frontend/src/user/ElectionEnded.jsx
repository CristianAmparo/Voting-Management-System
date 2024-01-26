import React from 'react'
import UserAuth from './UserAuth';
import { Link } from 'react-router-dom';


const ElectionEnded = () => {
  UserAuth();
  return (
    <>
    
    <section className='fixed inset-0 pt-20 pb-10  h-full w-full overflow-y-auto'>
        <button className='px-5 py-3 relative'>
					<Link to="/user"><img className='w-10 hover:scale-105' src="/back.png" alt="" /></Link>
				</button>
        <div className='p-5'>
          <h1 className="text-2xl font-bold leading-tight tracking-tight text-gray-900 md:text-4xl text-center"><span className='text-orange-600'>Election</span> Page</h1> 
        </div>
        <div className='relative flex  flex-col justify-center mx-auto bg-orange-50 shadow-xl w-full md:w-5/6 lg:w-2/3 xl:w-1/2 h-max p-12 rounded-3xl'>
            <h1 className='text-xl md:text-2xl font-bold text-center'>The election has been ended! </h1>
        </div>        
      
    </section>
    </>
  )
}

export default ElectionEnded;