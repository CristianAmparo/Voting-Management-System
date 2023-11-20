import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useContext } from 'react';
import { MyContext } from './context/MyContext';
const key = import.meta.env.VITE_adminKey;
const apiUsers = import.meta.env.VITE_apiUsers 


function Register() {
  const {setUserData} = useContext(MyContext)
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

  const handleSubmit = (e) => {
    e.preventDefault();
   

    axios.post(`${apiUsers}/login`, formData)
      .then((response) => {
          setSuccess('Login Successfully');
          setError('');
          if(response.data.username === key){
            navigate("/admin/");
          }else{
            navigate("/user");
          }
          localStorage.setItem('myData', JSON.stringify(response.data));
      })
      .catch((error) => {
        console.log(error.response.data);
        setError(error.response.data.error);
      });

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

export default Register;
