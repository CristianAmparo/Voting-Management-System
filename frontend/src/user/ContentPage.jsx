import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import UserAuth from './UserAuth';
import GetHeaders from '../admin/GetHeaders';

const apiHost = import.meta.env.VITE_host

const ContentPage = () => {
	UserAuth()
	const [data, setData] = useState([]);
	const headers = GetHeaders()

	const fetchData = async () => {
		try {
			const response = await axios.get(`${apiHost}api/candidates/`, {headers});
			setData(response.data);
		} catch (error) {
			console.error('Error fetching data:', error);
		}
	};

	useEffect(() => {
		fetchData();
		const intervalId = setInterval(fetchData, 5000);

		// Cleanup interval on component unmount
		return () => {
			clearInterval(intervalId);
		};
	}, []);

    const uniquePositions = [...new Set(data.map((item) => item.position))];
	const Position = uniquePositions.map((position) => {
		// Filter data for the current position
		const positionData = data.filter((item) => item.position === position);

		return (
        <div key={position} className=''>
			    <div  className=' flex flex-wrap justify-center gap-10  p-10 w-full  h-max pt-10 rounded-3xl'>
		
					{positionData.map((item) => {
						// map all data on each position 
						return (
                            <div key={item.id} className="relative w-96 bg-white rounded-3xl shadow-xl md:mt-0 sm:max-w-md xl:p-0 ">
                                <div className="pt-14 p-8">
                                    <div className='absolute left-0 top-0  w-2/5 mx-auto '>
                                        <div className=" bg-orange-600 text-lg p-1  text-center text-white font-bold">
                                            {item.position}
                                        </div>
                                    </div>
                                    <div className='relative mx-auto bg-orange-600 w-[137px] h-[137px] flex items-center rounded-full'>
                                        <div className=" w-32 h-32 bg-orange-100 rounded-full overflow-hidden border-4 border-white flex justify-center items-center mx-auto">
                                            <div><img src={`${apiHost}uploads/${item.image}`} alt="" /></div>
                                        </div>
                                    </div>
                                    <div className='-space-y-2'>
                                        <div className=" text-xl text-center text-black font-bold">{item.name}</div>
                                        <div className="text-lg p-0.5 text-center text-orange-600 font-medium "> {item.partylist}</div>
                                    </div>
                                    <div><div className='w-80 bg-gray-500 h-0.5 mx-auto '></div></div>
                                    <div className='w-max mx-auto'>
                                        <div className='text-lg p-0.5 text-center text-gray-500 font-bold'>Achievements/Credentials</div>
                                        <textarea className="w-72 p-2 text-center h-24" defaultValue={item.credentials}></textarea>
                                    </div>
                                    <div className='pt-3'><div className='w-80 bg-gray-500 h-0.5 mx-auto '></div></div>
                                    <div className='w-max mx-auto'>
                                        <div className='text-lg p-0.5 text-center text-gray-500 font-bold'>Platforms/Goals</div>
                                        <textarea className="w-72 p-2 text-center h-24" defaultValue={item.platform}></textarea>
                                    </div>
                                </div>
                            </div>
						);
					})}
				</div>
                </div>
			
		);
	});


	return (
		<>
			<section className='w-full h-screen pt-28'>
                <h1 className="text-2xl font-bold leading-tight tracking-tight text-gray-900 md:text-4xl pl-2 md:pl-10"><span className='text-orange-600'>Candidates </span>Information</h1> 
                <Link to={'/user/votingPage'}><div className=' fixed top-28 md:right-10 right-2 animate-bounce cursor-pointer bg-white  py-2 px-4 outline outline-orange-500 hover:outline-orange-600 text-orange-700 font-bold z-20'>Vote Now</div></Link>
                {Position}
			</section>
		</>
	);
};

export default ContentPage;
