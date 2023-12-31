import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { MyContext } from '../context/MyContext';
import Swal from 'sweetalert2';
import Account from '../user/Account';



const Sidebar = () => {
  const navigate = useNavigate()
  const {isSidebarOpen, accountModal, toggleAccountModal} = useContext(MyContext)
  const [dropDown, setDropDown] = useState(false); // Initial state is open
  const toggleDropDown = () => {
      setDropDown(!dropDown);
  };

    const logout = () => {
    // Display a SweetAlert2 confirmation dialog
      Swal.fire({
        icon: 'question',
        title: 'Logout',
        text: 'Are you sure you want to log out?',
        showCancelButton: true,
        confirmButtonText: 'Yes, logout',
        cancelButtonText: 'Cancel',
      }).then((result) => {
        // If the user confirms the logout
        if (result.isConfirmed) {
          // Remove user data from local storage
          localStorage.removeItem('myData');

          // Display a SweetAlert2 success message
          Swal.fire({
            icon: 'success',
            title: 'Logged out successfully',
          });

          // Navigate to the home route
          navigate("/");
        }
      });
  };
  return (
    <>
    <aside  className={`fixed top-20 left-0 z-40 w-full md:w-72 h-screen transition-transform ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } xl:translate-x-0`}>
      <div className="h-full px-3 py-4 bg-gray-800">
          <ul className="space-y-2 font-medium">
            <li>
                <Link className="sidebarList" to="/admin">
                  <img className='icon ' src="/dashboard.png" alt="" />
                  <span className="ms-3">Dashboard</span>
                </Link>
            </li>
            <li>
                <Link  className="sidebarList" to="/admin/voteinfo">
                  <img className='icon ' src="/votedetails.png" alt="" />
                  <span className="flex-1 ms-3 whitespace-nowrap">Votes Information</span>
                </Link>
            </li>
            <li>
                <Link to="/admin/result"  className="sidebarList">
                  <img className='icon ' src="/results.png" alt="" />
                  <span className="flex-1 ms-3 whitespace-nowrap">Result</span>
                </Link>
            </li>
            <li>
                <button type="button" className="flex items-center w-full p-2 text-base  transition duration-75 rounded-lg group  text-white hover:bg-gray-700" onClick={toggleDropDown} >
                      <img className='icon ' src="/manage.png" alt="" />
                      <span className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">Manage</span>
                      <img className={ `icon ${dropDown? 'rotate-180' : ''} `} src="/dropdown.png" alt="" />
                </button>
                <ul className={`py-2 space-y-2 ${dropDown? 'black' : 'hidden'}`}>
                      <li>
                        <Link to="/admin/candidates" className="flex items-center w-full p-2  transition duration-75 rounded-lg pl-11 group  text-white hover:bg-gray-700">Candidates</Link>
                      </li>
                      <li>
                        <Link to="/admin/users" className="flex items-center w-full p-2  transition duration-75 rounded-lg pl-11 group  text-white hover:bg-gray-700">Users</Link>
                      </li>
                </ul>
            </li>
             <li className="sidebarList cursor-pointer" onClick={toggleAccountModal}>
                  <img className='icon ' src="/admin.png" alt="" />
                  <span className="flex-1 ms-3 whitespace-nowrap">Account Settings</span>
            </li>
            <li className="sidebarList cursor-pointer" onClick={logout}>
                  <img className='icon ' src="/logout.png" alt="" />
                  <span className="flex-1 ms-3 whitespace-nowrap">Logout</span> 
            </li>
            
          
          </ul>
      </div>
      
    </aside>
      {accountModal && <Account />}
    </>
  )
}

export default Sidebar