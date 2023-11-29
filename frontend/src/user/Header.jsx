import React, { useContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { MyContext } from '../context/MyContext'
import Account from './Account'
import UserAuth from './UserAuth'
import axios from 'axios'
const apiHost = import.meta.env.VITE_host



const Header = () => {
  UserAuth();
  const navigate = useNavigate();
  const [toggleProfile, setToggleProfile] = useState(false)
  const {accountModal, toggleAccountModal} = useContext(MyContext)
  const [profile, setProfile] = useState('');
  const [userID] = useState(() => {
  const storedData = localStorage.getItem('myData');
    return storedData ? JSON.parse(storedData).id : null;
  });
  
  const logout = () => {
        localStorage.removeItem('myData');
        navigate("/");
  }

   const fetchData = async () => {
    try {
      const response = await axios.get(`${apiHost}api/users/${userID}`);
      setProfile(response.data[0].image);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
    };

    useEffect(() => {
      fetchData();
      const intervalId = setInterval(fetchData, 3000);
      return () => {
        clearInterval(intervalId);
      };
    }, []);

  return (
    <>
     <header>
        <div className='fixed top-0 right-0 left-0 flex justify-between px-3 md:px-10 items-center h-20 bg-orange-500 shadow-xl z-50'>
            <div className='flex items-center gap-5'>
                <h1 className='text-2xl md:text-4xl font-sans font-bold  textShadow'><span className='text-gray-200 pr-1'>Voting</span>System!</h1>
            </div>
            <div className='flex items-center '> 
              <div className='profile  flex justify-center w-10 cursor-pointer hover:scale-105' onClick={()=> setToggleProfile(!toggleProfile)}>
                  <img className='w-8 h-8 md:w-10 md:h-10 rounded-full cursor-pointer hover:scale-105' src={profile ? `${apiHost}/uploads/${profile}`:`/profile.png`} alt=""/>
              </div>
            </div>
            {toggleProfile && 
            <div className='absolute right-1 top-[85px] bg-white rounded-md shadow-md'>
              <ul className=" font-bold">
                <li className="flex p-3 items-center hover:bg-gray-200 cursor-pointer" onClick={toggleAccountModal}>
                  <img className='icon invert' src="/admin.png" alt="" />
                  <span className="flex-1 ms-3 whitespace-nowrap text-black">Account Settings</span>
                </li>
                <li className="flex p-3 items-center hover:bg-gray-200 cursor-pointer" onClick={logout}>
                  <img className='icon invert' src="/logout.png" alt="" />
                  <span className="flex-1 ms-3 whitespace-nowrap text-black">Logout</span> 
                </li>
              </ul>
            </div>
            }
        </div>
        
    </header>
    {accountModal && <Account />}
    
    </>
  )
}

export default Header