import React from 'react'
import { Link } from 'react-router-dom'

const DoneVoting = () => {
  return (
    <>

    <section className='fixed inset-0 pt-20 pb-10  h-full w-full overflow-y-auto'>
        <div className='p-5'>
          <h1 className="text-2xl font-bold leading-tight tracking-tight text-gray-900 md:text-4xl text-center"><span className='text-orange-600'>Election</span> Page</h1> 
        </div>
        <div className='relative flex  flex-col justify-center mx-auto bg-orange-50 shadow-xl w-full md:w-5/6 lg:w-2/3 xl:w-1/2 h-max p-12 rounded-3xl'>
            <h1 className='text-xl md:text-2xl font-bold text-center'>Your response has been added! </h1>
            <Link to={'/user/updateResponse'} className='w-full flex'>
              <button className= "bg-orange-500 hover:bg-orange-700 w-max mx-auto  cursor-pointer transition duration-300 text-white font-bold rounded-3xl px-5 py-2"> Edit Response</button>
            </Link>
        </div>        
      
    </section>
    </>
  )
}

export default DoneVoting