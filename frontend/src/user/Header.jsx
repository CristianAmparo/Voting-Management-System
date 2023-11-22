import React, { useContext, useState } from 'react'
import AccountModal from './accountModal'
import { useNavigate } from 'react-router-dom'
import UserAuthorization from './userAuthorization'
import { MyContext } from '../context/MyContext'

const Header = () => {
  UserAuthorization();
  const navigate = useNavigate();
 	const [userName] = useState(() => JSON.parse(localStorage.getItem('myData'))?.name || null);
  const {accountModal, setAccountModal} = useContext(MyContext)
  
  const logout = () => {
        localStorage.removeItem('myData');
        navigate("/");
  }
  return (
    <>
     <header>
        <div className='fixed top-0 right-0 left-0 flex justify-between px-3 md:px-10 items-center h-20 bg-orange-500 shadow-xl z-50'>
            <div className='flex items-center gap-5'>
                <h1 className='text-2xl md:text-4xl font-sans font-bold  textShadow'><span className='text-gray-200 pr-1'>Voting</span>System!</h1>
            </div>
            <div className='flex items-center gap-3'> 
              <div className='profile flex justify-center w-10 cursor-pointer hover:scale-105' onClick={()=> setAccountModal(!accountModal)}>
                  <img className='w-8 h-8 md:w-10 md:h-10 cursor-pointer hover:scale-105' src="/profile.png" alt=""/>
                  <p className='profileName absolute -bottom-8'>{userName}</p>
              </div>
              <div className='profile flex justify-center items-center gap-1 bg-orange-700 px-4 py-1.5 rounded-lg cursor-pointer hover:scale-105' onClick={logout}>
                  <h1 className='font-bold text-white'>Logout</h1>
                  <img className='w-5 h-5 cursor-pointer' src="/logout.png" alt=""/>
              </div>
            </div>
        </div>
    </header>
    {accountModal && <AccountModal />}
    
    </>
  )
}

export default Header