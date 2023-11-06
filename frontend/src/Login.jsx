import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


function Register() {
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
   

    axios.post('http://localhost:5000/api/users/login', formData)
      .then((response) => {
        if (response && response.data) {
          setSuccess('Login Successfully');
          setError('');
          navigate("/");
          localStorage.setItem('myData', JSON.stringify(response.data));
        } else {
          console.log('Response or data is undefined');
          setError('An error occurred during login');
        }
      })
      .catch((error) => {
        console.log(error.response.data);
        setError(error.response.data.error);
      });

  };


  return (
    <>
      <h1>Login</h1>
      <div>
        <form onSubmit={handleSubmit}>
          <label htmlFor="username">Email:</label>
          <input
            type="email"
            id="username"
            name="username"
            value={username}
            placeholder="Enter your email"
            onChange={handleChange}
          />
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            placeholder="Enter your password"
            onChange={handleChange}
          />
          <button>Login</button>
        </form>
        {success !== '' && <h1>{success}</h1>}
        {error !== '' && <h1>{error}</h1>}
      </div>
    </>
  );
}

export default Register;
