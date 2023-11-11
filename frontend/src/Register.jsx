import React, { useState } from 'react';
import axios from 'axios';

function Register() {
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    fname: '',
    lname: '',
    username: '',
    password: '',
    password2: '',
  });

  const { fname, lname, username, password, password2 } = formData;

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if(password2 === ''){
      setError("Please fill out all the fields");
      setSuccess('')
    }
    else if(password !== password2){
      setError("Password do not match");
      setSuccess('')
    }else{
      const { password2, ...formDataWithoutPassword2 } = formData;
      axios.post('http://localhost:5000/api/users/', formDataWithoutPassword2)
        .then((response) => {
          console.log(response.data);
          setSuccess('Register Successfully');
          setError('');
        })
        .catch((error) => {
          console.log(error.response.data.error);
          setError(error.response.data.error);
          setSuccess('')
        });
    }
   
  };

  return (
    <>
      <section className=" bg-gray-100">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen lg:py-0">
          <div className="w-full bg-white rounded-lg shadow-xl md:mt-0 sm:max-w-md xl:p-0 ">
              <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                  <h1 className="text-2xl font-bold leading-tight tracking-tight text-gray-900 md:text-4xl text-center">Voting <span className='text-orange-600'>System</span></h1>

                  <form className="space-y-2 md:space-y-4" onSubmit={handleSubmit} >
                     <div className='flex gap-3 '>
                        <div>
                            <label htmlFor="email" className="label ">First Name</label>
                            <input 
                                type="text"
                                id="fname"
                                name="fname"
                                value={fname}
                                placeholder="Enter first name"
                                onChange={handleChange}
                                className="textInput sm:text-sm focus:ring-primary-600 focus:border-primary-600" 

                            />
                        </div>
                        <div>
                            <label htmlFor="email" className="label ">Last Name</label>
                            <input 
                                type="text"
                                id="lname"
                                name="lname"
                                value={lname}
                                placeholder="Enter last name"
                                onChange={handleChange}
                                className="textInput sm:text-sm focus:ring-primary-600 focus:border-primary-600" 

                            />
                        </div>
                      </div>
                      <div>
                          <label htmlFor="email" className="label ">Username</label>
                          <input 
                              type="email"
                              id="username"
                              name="username"
                              placeholder="Enter username"
                              value={username}
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
                       <div>
                          <label htmlFor="password" className="label">Repeat-Password</label>
                          <input             
                              type="password"
                              id="password2"
                              name="password2"
                              value={password2}
                              placeholder="Repeat password"
                              onChange={handleChange}
                              className="textInput sm:text-sm focus:ring-primary-600 focus:border-primary-600" 
                          />
                      </div>
                      {success !== '' && <h1>{success}</h1>}
                      {error !== '' && <h1 className='text-red-700'>{error}</h1>}
                      <button type="submit" className="w-full text-white bg-orange-600 hover:bg-orange-700 focus:ring-1 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Register</button>
                      <p className="text-sm font-light text-gray-500 dark:text-gray-400 text-center">
                          Already have an account <a href="#" className="font-medium text-primary-600 hover:underline dark:text-blue-400">Login!</a>
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
