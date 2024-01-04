import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import axios from 'axios';
const key = import.meta.env.VITE_adminKey;
const apiHost = import.meta.env.VITE_host


function Login() {
  const navigate = useNavigate();
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const {username, password} = formData;

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };


const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const response = await axios.post(`${apiHost}api/users/login`, formData);

    if (response.data.user && response.data.token) {
      const { id, name, username, image } = response.data.user;
      const token = response.data.token;

      const userData = { id, name, username, image, token };
      console.log(userData);
      localStorage.setItem('myData', JSON.stringify(userData));

      console.log(response.data.user.username);

      if (response.data.user.username === key) {
        // Display a SweetAlert2 success message
        Swal.fire({
          icon: 'success',
          title: 'Login Successfully',
        });
        // Navigate to the admin route
        navigate("/admin/");
      } else {
        Swal.fire({
          icon: 'success',
          title: 'Login Successfully',
        });
        // Navigate to the user route
        navigate("/user");
      }
    } else {
      // Display a SweetAlert2 error message
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Something went wrong',
      });
    }
  } catch (error) {
    // Display a SweetAlert2 error message
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'An unexpected error occurred',
    });
  }
};


  return (
    <>
      <section className=" bg-gray-100">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen lg:py-0">
          <div className="w-full bg-white rounded-lg shadow-xl md:mt-0 sm:max-w-md xl:p-0 ">
              <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                  <h1 className="text-2xl font-bold leading-tight tracking-tight text-gray-900 md:text-4xl text-center"><span className='text-orange-600'>Voting</span> System</h1>
                  <form className="space-y-2 md:space-y-4" onSubmit={handleSubmit}>
                      <div>
                          <label htmlFor="email" className="label ">Username</label>
                          <input 
                              type="email"
                              id="username"
                              name="username"
                              value={username}
                              placeholder="Enter your email"
                              onChange={handleChange} 
                              className="textInput sm:text-sm focus:ring-primary-600 focus:border-primary-600" 

                          />
                      </div>
                      <div>
                          <label htmlFor="password" className="label">Password</label>
                          <input             
                              type="password"
                              id="password"
                              name="password"
                              value={password}
                              placeholder="Enter your password"
                              onChange={handleChange} 
                              className="textInput sm:text-sm focus:ring-primary-600 focus:border-primary-600" 
                          />
                      </div>
                      <div className='text-center w-full '> 
                        {success !== '' && <h1>{success}</h1>}
                        {error !== '' && <h1 className='text-red-600'>{error}</h1>}
                      </div>
                      <button type="submit" className="w-full text-white bg-orange-600 hover:bg-orange-700 focus:ring-1 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Login</button>
                      <p className="text-sm font-light text-gray-500 dark:text-gray-400 text-center">
                          Don’t have an account yet? <a href="/register" className="font-medium text-primary-600 hover:underline dark:text-blue-400">Register!</a>
                      </p>
                  </form>
                  
                  
              </div>
          </div>
      </div>
    </section>
    </>
  );
}

export default Login;
