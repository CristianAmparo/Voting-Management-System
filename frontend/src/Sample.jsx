import React from 'react'

const Sample = () => {
  return (
    <>
    <header>
        <div className='fixed top-0 right-0 left-0 flex justify-between px-10 items-center h-20 bg-orange-500 shadow-xl'>
            <div className='flex items-center gap-5'>
                <img className=' w-8 h-8 cursor-pointer block xl:hidden hover:scale-105' src="/menu.png" alt="" />
                <h1 className='text-4xl font-sans font-bold sm:block hidden textShadow'><span className='text-gray-200 pr-1'>Voting</span>System!</h1>
            </div>
            <div className='profile flex justify-center w-10 cursor-pointer  rounded-full hover:scale-105'>
                <img  src="/profile.png" alt="" />
                <p className='profileName absolute -bottom-8'>Profile</p>
            </div>
        </div>
    </header>
    </>
  )
}
export default Sample;