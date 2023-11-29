import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { MyContext } from '../context/MyContext';
const apiHost = import.meta.env.VITE_host

const Account = () => {
 const [userID, setUserId] = useState(JSON.parse(localStorage.getItem('myData')).id);
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');
    const {toggleAccountModal} = useContext(MyContext);
    const [formData, setFormData] = useState({
        image: null,
        fname: '',
        lname: '',
        username: '',
        password: '',
        password2: '',
    });

  const { fname, lname, image, username, password, password2 } = formData;

useEffect(() => {
  axios.get(`${apiHost}api/users/${userID}`)
    .then((response) => {
      const { image, name, username } = response.data[0];
      const fullName = name.split(" ");
      const [fname, lname] = fullName;

      setFormData((prev) => ({
        ...prev,
        image: image,
        fname: fname,
        lname: lname,
        username: username
      }));
    })
    .catch((error) => {
      console.log(error.response);
    });
}, []);


  const handleChange = (e) => {
    if (e.target.name === 'image') {
      const file = e.target.files[0];

      setFormData((prev) => ({
        ...prev,
        image: file,
      }));

       if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          
          document.getElementById('imagePreview').src = e.target.result;
        };
        reader.readAsDataURL(file);
      }

     } else {
      setFormData((prev) => ({
        ...prev,
        [e.target.name]: e.target.value,
      }));
    }
  };

    const handleSubmit = (e) => {
    e.preventDefault();
    if(password !== password2) {
      setError('Password do not match')
    }else{
      // Simulate an API request to handle form submission
      const formDataToSend = new FormData();
      formDataToSend.append('image', image);
      formDataToSend.append('fname', fname);
      formDataToSend.append('lname', lname);
      formDataToSend.append('username', username);
      formDataToSend.append('password', password);
      console.log(formDataToSend)
  
      axios
        .put(`${apiHost}api/users/${userID}`, formDataToSend)
        .then((response) => {
          setSuccess(response.data.message);
          setError('');

          const timeoutId = setTimeout(() => {
            toggleAccountModal();
            }, 1300);
            return () => clearTimeout(timeoutId);

          })
        .catch((error) => {
          console.log(error);
          setSuccess('');
       });
    }
   };

  return (
    <>
      <section className="absolute inset-0 backdrop-blur-sm bg-backdrop z-40">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen lg:py-0">
          <div className="w-full bg-white rounded-lg shadow-xl md:mt-0 sm:max-w-md xl:p-0 ">
              <div className="p-6 space-y-4 sm:p-8">
                  <h1 className="text-2xl font-bold leading-tight tracking-tight text-gray-900  text-center">Account <span className='text-orange-600'>Settings</span></h1>

                  <form className="space-y-2 " onSubmit={handleSubmit} >
                      <div className='relative mx-auto bg-orange-600 w-[137px] h-[137px] flex items-center rounded-full'>
                        <div className=" w-32 h-32 bg-orange-100 rounded-full overflow-hidden border-4 border-white flex justify-center items-center mx-auto">
                            <div><img id="imagePreview" src={`${image ? `${apiHost}uploads/` + image : '/profile.png'}`} alt="" /></div>
                        </div>
                        <div className="">
                            <label htmlFor="imageInput" className="absolute bottom-1 right-0 rounded-full w-10 h-10 bg-slate-600 hover:bg-slate-700 p-2 text-white cursor-pointer flex justify-center items-center">
                                <img className="w-5 h-5 object-center" src="/editProfile.png" alt="" />
                                <span className="sr-only">Choose an image to upload</span>
                            </label>
                            <input type="file" name="image" id="imageInput" className="hidden h-full w-full cursor-pointer" accept=".png, .jpg, .jpeg" onChange={handleChange} />
                          </div>
                      </div>
                      <div className='flex w-full justify-between gap-2'>
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
                          <label htmlFor="email" className="label ">Change Username</label>
                          <input 
                              type="email"
                              id="username"
                              name="username"
                              placeholder="Enter new username"
                              value={username}
                              onChange={handleChange} 
                              className="textInput sm:text-sm focus:ring-primary-600 focus:border-primary-600" 
                          />
                      </div>
                      <div>
                          <label htmlFor="password" className="label">Change Password</label>
                          <input             
                              type="password"
                              id="password"
                              name="password"  
                              value={password}          
                              placeholder="Enter new password"
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
                      <div className='text-center w-full'> 
                        {success !== '' && <h1 className='text-green-700'>{success}</h1>}
                        {error !== '' && <h1 className='text-red-700'>{error}</h1>}
                      </div>
                      <button type="submit" className="w-full text-white bg-orange-600 hover:bg-orange-700  font-medium rounded-lg text-sm px-5 py-2.5 text-center">Update Account</button>

                      <button type='button' className="w-full text-orange-700 border-2 border-orange-600 hover:border-orange-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center" onClick={ toggleAccountModal}>Cancel</button>
                  </form>
              </div>
          </div>
      </div>
    </section>
    </>
  );
}

export default Account;



  	
