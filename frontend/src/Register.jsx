import React, { useState } from 'react';
import axios from 'axios';

function Register() {
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    password: '',
    password2: '',
  });

  const { name, username, password, password2 } = formData;

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { password2, ...formDataWithoutPassword2 } = formData;

    axios.post('http://localhost:5000/api/users/', formDataWithoutPassword2)
      .then((response) => {
        console.log(response.data);
        setSuccess('Register Successfully');
        setError('');
      })
      .catch((error) => {
        console.log(error.response.data.message);
        setError(error.response.data.message);
      });
  };

  return (
    <>
      <h1>Register</h1>
      <div>
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            placeholder="Enter your name"
            onChange={handleChange}
          />
          <label htmlFor="username">username:</label>
          <input
            type="username"
            id="username"
            name="username"
            value={username}
            placeholder="Enter your username"
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
          <label htmlFor="password2">Repeat-Password:</label>
          <input
            type="password"
            id="password2"
            name="password2"
            value={password2}
            placeholder="Repeat your password"
            onChange={handleChange}
          />
          <button>Register</button>
        </form>
        {success !== '' && <h1>{success}</h1>}
        {error !== '' && <h1>{error}</h1>}
      </div>
    </>
  );
}

export default Register;
