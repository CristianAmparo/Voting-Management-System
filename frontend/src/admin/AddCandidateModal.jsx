import React, { useState, useEffect, useContext } from 'react';
import { MyContext } from '../context/MyContext';
import axios from 'axios';

function AddCandidateModal() {
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    image: null,
    position: '',
    partylist: '',
    credentials: '',
    platform: '',
  });

  const { name, image, position, partylist, credentials, platform } = formData;

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
  console.log(formData);
  const handleSubmit = (e) => {
    e.preventDefault();



    axios
      .post('http://localhost:5000/api/candidates/', formData)
      .then((response) => {
        console.log(response.data);
        setSuccess('Register Successfully');
        setError('');
      })
      .catch((error) => {
        console.log(error.response.data.error);
        setError(error.response.data.error);
        setSuccess('');
      });
  };

  const {isAddCandidateModal, openAddCandidateModal, closeAddCandidateModal} = useContext(MyContext)
  return(
    <>
    <section className=" bg-gray-100">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen lg:py-0">
          <div className="relative w-full bg-white rounded-3xl shadow-xl md:mt-0 sm:max-w-md xl:p-0 ">
              <div className=" space-y-4 pt-14 p-8">
                  <form className="space-y-2 " onSubmit={handleSubmit} >
                      <div className='absolute left-0 top-0  w-60 mx-auto '>
                        <div>
                          <input 
                              type="text"
                              id="position"
                              name="position"
                              value={position}
                              onChange={handleChange}
                              placeholder="Enter position"
                              className="textInput bg-orange-600 rounded-none focus:ring-primary-600 focus:border-primary-600 text-lg p-1 text-center text-white font-bold placeholder-gray-200" 
                          />
                        </div>
                      </div>
                      <div className='relative mx-auto bg-orange-600 w-[137px] h-[137px] flex items-center rounded-full'>
                        <div className=" w-32 h-32 bg-blue-200 rounded-full overflow-hidden border-4 border-white flex justify-center items-center mx-auto">
                            <div ><img  src="/profile.png" alt="" /></div>
                        </div>
                        <div className="">
                            <label htmlFor="imageInput" className="absolute bottom-1 right-0 rounded-full w-10 h-10 bg-slate-600 hover:bg-slate-700 p-2 text-white cursor-pointer flex justify-center items-center">
                                <img className="w-5 h-5 object-center" src="/editProfile.png" alt="" />
                                <span className="sr-only">Choose an image to upload</span>
                            </label>
                            <input type="file" name="image" id="imageInput" className="hidden h-full w-full cursor-pointer" accept=".png, .jpg, .jpeg" onChange={handleChange} />                         </div>
                      </div>
                      <div className='w-80 mx-auto'>
                        <div>
                          <input 
                              type="text"
                              id="name"
                              name="name"
                              value={name}
                              placeholder="Enter candidate name"
                              onChange={handleChange}
                              className="textInput  focus:ring-primary-600 focus:border-primary-600 text-xl text-center text-black font-bold" 
                          />
                        </div>
                      </div>
                      <div className='w-80 mx-auto'>
                        <div>
                          <input 
                              type="text"
                              id="partylist"
                              name="partylist"
                              value={partylist}
                              onChange={handleChange}
                              placeholder="Enter partylist"
                              className="textInput focus:ring-primary-600 focus:border-primary-600 text-lg p-0.5 text-center text-orange-600 font-medium" 
                          />
                        </div>
                      </div>

                      <div className='pt-3'><div className='w-80 bg-gray-500 h-0.5 mx-auto '></div></div>
                      <div className='w-max mx-auto'>
                        <div className='text-lg p-0.5 text-center text-gray-500 font-bold'>Achievements/Credentials</div>
                        <div>
                          <textarea
                              id="credentials"
                              name="credentials"
                              className="w-72 p-2 text-center"
                              placeholder="Enter Achievements/Credentials"
                              value={credentials}
                              onChange={handleChange}
                            />  
                        </div>
                      </div>
                      <div className='pt-3'><div className='w-80 bg-gray-500 h-0.5 mx-auto '></div></div>

                      <div className='w-max mx-auto'>
                        <div className='text-lg p-0.5 text-center text-gray-500 font-bold'>Platforms/Goals</div>
                        <div>
                          <textarea
                              id="platform"
                              name="platform"                         
                              className="w-72 p-2 text-center"
                              placeholder="Enter Platforms/Goals"
                              value={platform}
                              onChange={handleChange}
                            />  
                        </div>
                      </div>
                      <div className='text-center w-full'> 
                        {success !== '' && <h1>{success}</h1>}
                        {error !== '' && <h1 className='text-red-700'>{error}</h1>}
                      </div>
                      <button type="submit" className="w-full text-white bg-orange-600 hover:bg-orange-700 focus:ring-1 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Add Candidate</button>
                   
                  </form>
              </div>
          </div>
      </div>
    </section>
    </>
  )
}

export default AddCandidateModal;
