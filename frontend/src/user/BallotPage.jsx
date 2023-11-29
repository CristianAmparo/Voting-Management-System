import React, { useState, useEffect, useRef } from 'react';
import Header from './Header';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import UserAuth from './UserAuth';


// Assuming that 'Candidates' and other necessary components are imported here

// API endpoints for candidates and votes
const apiHost = import.meta.env.VITE_host

const BallotPage = () => {
	UserAuth
	const navigate = useNavigate();
	const [userID, setUserId] = useState(() => JSON.parse(localStorage.getItem('myData'))?.id || null);
	const [data, setData] = useState([]);
	const [success, setSuccess] = useState('');
	const [error, setError] = useState('');
    const [remainingTime, setRemainingTime] = useState(0);
    const countdownRef = useRef();
	const [selectedCandidates, setSelectedCandidates] = useState({
		President: null,
		Vice_President: null,
		Secretary: null,
		Treasurer: null,
		Auditor: null,
		Peace_Officer: null,
	});
	const [isChecked, setIsChecked] = useState(false);
	useEffect(()=>{
		axios.get(`${apiHost}api/votes/${userID}`)
			.then(response => {
				if(response.data){
					console.log(response.data , userID);
					navigate('/user/doneVoting');
				}

			});
	},[])
	
	

	// Effect for user authorization check


	// Effect to fetch candidate data
        const fetchData = async () => {
            try {
                const response = await axios.get(`${apiHost}api/candidates`);
                setData(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }

        useEffect(() => {
            fetchData();
            const intervalId = setInterval(fetchData, 5000);


            return () => {
                clearInterval(intervalId);
            }
        }, []);


    useEffect(() => {
      axios.get(`${apiHost}api/votes/voteEnd`)
        .then(response => {    
          const remainingTimeInSeconds = Math.floor(response.data.remainingTime / 1000);
          setRemainingTime(remainingTimeInSeconds);
        })
        .catch(error => {
          console.error('Error getting remaining time:', error);
        });
    }, []);


    if(remainingTime < 0){
        navigate('/user/electionEnded')
    }

      const formatTime = (timeInSeconds) => {
      const days = Math.floor(timeInSeconds / 86400);
      const hours = Math.floor((timeInSeconds % 86400) / 3600);
      const minutes = Math.floor((timeInSeconds % 3600) / 60);
      const seconds = timeInSeconds % 60;

      if (days > 0) {
        return `${days}d ${hours}h`;
      } else if (hours > 0) {
        return `${hours}h ${minutes}m`;
      } else if (minutes > 0) {
        return `${minutes}m ${seconds}s`;
      } else {
        return `${seconds}s`;
      }
    };

    useEffect(() => {
      countdownRef.current = setInterval(() => {
        setRemainingTime(prevRemainingTime => prevRemainingTime - 1);
      }, 1000);
         return () => clearInterval(countdownRef.current);
    },[]) 

	// Handle radio button change Update selected candidates based on the radio button change
	const handleRadioChange = (position, candidateName) => {
		setSelectedCandidates((prev) => ({
			...prev,
			[position]: candidateName,
		}));
	};

	// Handle checkbox change, Toggle the value of the checkbox
	const handleCheckboxChange = () => {
		setIsChecked(!isChecked);
	};

	// Handle form submission
	const handleSubmit = (e) => {
		e.preventDefault(); // Prevent the default form submission
		const formDataToSend = selectedCandidates;
		axios
			.post(`${apiHost}api/votes/${userID}`, formDataToSend) // Submit the form data to the API
			.then((response) => {
				setSuccess(response.data.message);
				setError('');
				navigate('/user/doneVoting');
			})
			.catch((error) => {
				// Handle error
				console.log(error.response.data.error);
				if(error.response.data.error === 'You already voted'){
					navigate('/user/doneVoting')
				}
				setError(error.response.data.error);
				alert(error.response.data.error);
				setSuccess('');
			});
	};

	// Map all the positions
	const uniquePositions = [...new Set(data.map((item) => item.position))];
	const Position = uniquePositions.map((position) => {
		// Filter data for the current position
		const positionData = data.filter((item) => item.position === position);

		return (
			<div key={position} className='relative flex  flex-col justify-center bg-orange-50 shadow-xl w-full md:w-5/6 lg:w-2/3 xl:w-1/2 h-max p-12 rounded-3xl'>
				<div className='absolute top-0 left-0 bg-orange-500 text-white w-1/3 text-center p-1 font-bold text-lg'>{position}</div>
				<input
					type="radio"
					id={`abstain${position}`}
					name={position}
					value={`abstain${position}`}
					checked={selectedCandidates[position] === `abstain${position}`}
					onChange={() => handleRadioChange(position, `abstain${position}`)}
					className="hidden"
				/>
				<label htmlFor={`abstain${position}`}>
					<div className={`cursor-pointer  hover:bg-orange-600 absolute top-2 right-2  text-white w-28 p-0.5 text-center rounded-xl font-bold border-2  ring-red-600'  ${selectedCandidates[position] === `abstain${position}` ? 'bg-green-700' : 'bg-orange-500'}`}>Abstain</div>
				</label>
				<div className='h-max flex flex-wrap sm:flex-row flex-col md:items-center justify-evenly gap-5'>
					{positionData.map((item) => {
						// map all data on each position
						return (
							<div key={item.id}>
								<div className=' flex sm:flex-col gap-2 md:gap-0  items-center'>
									<div className=' bg-orange-600 w-[86px] h-[86px] flex items-center rounded-full -mb-1'>
										<div className=" w-20 h-20 bg-orange-100 rounded-full overflow-hidden border-2 border-white flex justify-center items-center mx-auto">
											<img src={`${apiHost}uploads/${item.image}`} alt="" />
										</div>
									</div>
									<div className='sm:text-center '>
										<div className='-space-y-2'>
											<h1 className='font-bold'>{item.name}</h1>
											<h2 className='text-orange-700'>{item.partylist}</h2>
										</div>
										<input
											type="radio"
											id={item.name}
											name={position}
											value={item.name}
											checked={selectedCandidates[position] === item.name}
											onChange={() => handleRadioChange(position, item.name)}
											className="hidden"
										/>
										<label htmlFor={item.name}>
											<div className={`cursor-pointer  hover:bg-orange-600 w-32 sm:mx-auto text-white text-center p-1 rounded-lg font-bold transition duration-300  ${selectedCandidates[position] === item.name ? 'bg-green-700' : 'bg-orange-500'}`}>
												{selectedCandidates[position] === item.name ? 'Voted' : 'Vote'}</div>
										</label>
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
			<Header />
			<section className='fixed inset-0 pt-20 pb-10  h-full w-full overflow-y-auto'>
				<div className='p-5'>
					<h1 className="text-3xl font-bold leading-tight tracking-tight text-gray-900 md:text-4xl "><span className='text-orange-600'>Election</span> Page</h1>
				</div>

                <div className='absolute duration top-24 right-5  py-3 px-4 flex items-center cursor-help justify-center h-max bg-orange-600 text-white shadow-lg rounded-xl w-max'>
                        <img className='w-5 h-5' src="/duration.png" alt="" />
                        <span className='lg:text-xl text-lg  pl-2 font-bold '>
                        {remainingTime < 0 ? (
                            <div className='lg:text-xl text-lg '>Election Ended</div>
                        ) : (
                            <span>{formatTime(remainingTime)}</span>
                        )}
                        </span>
						<span className='absolute durationText hidden -bottom-10 z-20 text-black text-sm bg-gray-300 w-max px-2 py-1 rounded-lg'>Election Duration</span>
                </div>

				<form className='flex flex-col gap-5 justify-center items-center p-2' onSubmit={handleSubmit}>
					{Position}
					<div className=" w-full md:w-5/6 lg:w-2/3 xl:w-1/2 text-xs sm:text-sm lg:text-[16px]">
						<div className='text-center w-full'>
							{success !== '' && <h1 className='text-green-700'>{success}</h1>}
							{error !== '' && <h1 className='text-red-700'>{error}</h1>}
						</div>
						<input
							type="checkbox"
							id="checkbox"
							checked={isChecked}
							onChange={handleCheckboxChange}
						/>

						<label htmlFor="checkbox" className="ml-2 text-gray-600 cursor-pointer">
							I confirm that I have reviewed and agree with the provided information
						</label>
					</div>
					<div className="flex w-full md:w-5/6 lg:w-2/3 xl:w-1/2 justify-end ">
						<input type="submit" value="Submit" disabled={!isChecked} className={`${isChecked ? "bg-orange-500 hover:bg-orange-700  cursor-pointer" : "bg-gray-500"} transition duration-300 text-white text-lg font-bold rounded-xl px-10 py-2`} />
					</div>
				</form>
			</section>

		</>
	);
}

export default BallotPage;
