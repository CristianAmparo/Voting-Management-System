import React from 'react'

const Header = () => {
  return (
    <>
     <header>
        <div className='fixed top-0 right-0 left-0 flex justify-between px-10 items-center h-20 bg-orange-500 shadow-xl z-50'>
            <div className='flex items-center gap-5'>
                <h1 className='text-2xl md:text-4xl font-sans font-bold  textShadow'><span className='text-gray-200 pr-1'>Voting</span>System!</h1>
            </div>
            <div className='profile flex justify-center w-10 cursor-pointer hover:scale-105'>
                <img className='w-8 h-8 md:w-10 md:h-10 cursor-pointer hover:scale-105' src="/profile.png" alt=""/>
                <p className='profileName absolute -bottom-8'>Profile</p>
            </div>
        </div>
    </header>
    </>
  )
}

export default Header