import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Authorization from './Authorization';
import GetHeaders from './GetHeaders';
const apiHost = import.meta.env.VITE_host

const Result = () => {
    Authorization()
    const [data, setData] = useState([]);
    const [remainingTime, setRemainingTime] = useState(0);
    const headers = GetHeaders()
    const countdownRef = useRef();
    const fetchData = async () => {
    try {
      const response = await axios.get(`${apiHost}api/votes/count`, {headers});
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

    const findCandidatesWithHighestVotes = () => {
    // Create a map to store the candidates with the highest votes for each position
    const highestVotesMap = new Map();

    // Iterate through the data to find the candidates with the highest votes for each position
    data.forEach((candidate) => {
      const { position, vote_count } = candidate;

      if (!highestVotesMap.has(position) || vote_count > highestVotesMap.get(position).vote_count) {
        highestVotesMap.set(position, { candidate, vote_count });
      }
    });

    // Extract the candidates with the highest votes from the map
    const candidatesWithHighestVotes = Array.from(highestVotesMap.values()).map(
      (entry) => entry.candidate
    );

    return candidatesWithHighestVotes;
  };

  useEffect(() => {
    fetchData();
    const intervalId = setInterval(fetchData, 3000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  // Get candidates with the highest votes for each position
  const candidatesWithHighestVotes = findCandidatesWithHighestVotes();

  // Render your component using the candidatesWithHighestVotes array
  const result = candidatesWithHighestVotes.map((candidate) => (
        <div key={candidate.id} className="relative w-96 bg-white rounded-3xl shadow-xl md:mt-0 sm:max-w-md xl:p-0 ">
            <div className="pt-14 p-8">
                <div className='absolute left-0 top-0  w-2/5 mx-auto '>
                    <div className=" bg-orange-600 text-lg p-1  text-center text-white font-bold">
                        {candidate.position}
                    </div>
                </div>
                <div className='relative mx-auto bg-orange-600 w-[137px] h-[137px] flex items-center rounded-full'>
                    <div className=" w-32 h-32 bg-orange-100 rounded-full overflow-hidden border-4 border-white flex justify-center items-center mx-auto">
                        <div><img src={`${apiHost}uploads/${candidate.image}`} alt="" /></div>
                    </div>
                </div>
                <div className='-space-y-2'>
                    <div className=" text-xl text-center text-black font-bold">{candidate.name}</div>
                    <div className="text-lg p-0.5 text-center text-orange-600 font-medium "> {candidate.partylist}</div>
                </div>
                <div><div className='w-80 bg-gray-500 h-0.5 mx-auto '></div></div>
                <div className='w-max mx-auto'>
                    <div className='text-lg p-0.5 text-center text-gray-500 font-bold'>Achievements/Credentials</div>
                    <textarea className="w-72 p-2 text-center h-24" defaultValue={candidate.credentials}></textarea>
                </div>
                <div className='pt-3'><div className='w-80 bg-gray-500 h-0.5 mx-auto '></div></div>
                <div className='w-max mx-auto'>
                    <div className='text-lg p-0.5 text-center text-gray-500 font-bold'>Platforms/Goals</div>
                    <textarea className="w-72 p-2 text-center h-24" defaultValue={candidate.platform}></textarea>
                </div>
            </div>
        </div>
      ));

    useEffect(() => {
      axios.get(`${apiHost}api/votes/voteEnd`, {headers})
        .then(response => {    
          const remainingTimeInSeconds = Math.floor(response.data.remainingTime / 1000);
          setRemainingTime(remainingTimeInSeconds);
        })
        .catch(error => {
          console.error('Error getting remaining time:', error);
        });
    }, []);

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

  return (
    <section className='fixed top-20 left-0 xl:left-72  bottom-0 right-0 flex flex-col overflow-auto p-5'>
        <div className='absolute duration top-2 right-5  py-3 px-4 flex items-center cursor-help justify-center h-max bg-orange-600 text-white shadow-lg rounded-xl w-max'>
            <img className='w-5 h-5' src="/duration.png" alt="" />
            <span className='lg:text-xl text-lg  pl-2 font-bold '>
            {remainingTime < 0 ? (
                <div className='lg:text-xl text-sm '>Election Ended</div>
            ) : (
                <span>{formatTime(remainingTime)}</span>
            )}
            </span>
            <span className='absolute durationText hidden -bottom-10 z-20 text-black text-sm bg-gray-300 w-max px-2 py-1 rounded-lg'>Election Duration</span>
        </div>
        <h1 className="text-2xl font-bold leading-tight tracking-tight text-gray-900 md:text-4xl text-left"><span className='text-orange-600'>Result</span> Page</h1>
        <div className='pt-5 '>
            <h2 className="text-sm  leading-tight tracking-tight text-gray-900 md:text-xl text-center pb-5">{remainingTime < 0 ? 'This are the final result of election!' : 'Election is Ongoing, this shows the leading candidates on each position'}</h2>
           <div className=' flex flex-wrap justify-center gap-5 '>
                {result}
            </div> 
        </div>
        
    </section>
  );
};

export default Result;