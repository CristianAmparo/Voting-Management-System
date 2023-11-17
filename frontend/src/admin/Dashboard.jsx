import React, { useState, useEffect, useRef, useContext } from 'react';
import axios from 'axios';
import VoteTally2 from './VoteTally2';
import Duration from './Duration';
import { MyContext } from '../context/MyContext';

function Dashboard() {
    
    const [votesCountdata, setVotesCountdata] = useState([]);
    const [usersCountdata, setUsersCountdata] = useState([]);
    const totalVotesCount = votesCountdata ? (votesCountdata.votes_count || 0).toString().padStart(2, '0') : '00';
    const totalUsersCount = usersCountdata ? (usersCountdata.voters_count || 0).toString().padStart(2, '0') : '00';
    const [remainingTime, setRemainingTime] = useState(0);
    const countdownRef = useRef(null);
    const {isDurationModalOpen, openDurationModal} = useContext(MyContext) 

    useEffect(() => {
      // Make a GET request to get the initial remaining time
      axios
        .get('http://localhost:5000/api/votes/voteEnd')
        .then(response => {    
          const remainingTimeInSeconds = Math.floor(response.data.remainingTime / 1000);
          setRemainingTime(remainingTimeInSeconds);
          startCountdown();
        })
        .catch(error => {
          console.error('Error getting remaining time:', error);
        });

      return () => {
        // Clear the interval when the component unmounts
        clearInterval(countdownRef.current);
      };
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

    const startCountdown = () => {
      // Update the remaining time every second
      countdownRef.current = setInterval(() => {
        setRemainingTime(prevRemainingTime => prevRemainingTime - 1);
      }, 1000);
    };
    

    useEffect(() => {
        axios.get('http://localhost:5000/api/votes/totalVotes')
        .then((response) => {
          setVotesCountdata(response.data[0]);

        })
        .catch((error) => {
            console.error('Error fetching data:', error);
        })
    }, []);
    useEffect(() => {
        axios.get('http://localhost:5000/api/users/countUsers')
        .then((response) => {
          setUsersCountdata(response.data[0]);

        })
        .catch((error) => {
            console.error('Error fetching data:', error);
        })
    }, []);

    

  return (
    <>
      <section className={`fixed top-20 left-0 xl:left-72  bottom-0 right-0 overflow-y-auto flex flex-col ${isDurationModalOpen? 'bg-backdrop transition-transform' : ''} `}>
        <section className='p-5 '>
          <h1 className="text-2xl font-bold leading-tight tracking-tight text-gray-900 md:text-4xl text-left pb-5"><span className='text-orange-600'>Dashboard</span> Page</h1>
          <div className=' text-white flex flex-col md:flex-row gap-5 items-center'>
            <div className='flex gap-5'>
            <div className='px-4 py-2 bg-secondary-100 shadow-lg rounded-3xl w-44 md:w-56 xl:w-72 xl:h-40 h-32'>
              <div className='flex justify-between items-center w-full '>
                <span className='text-lg font-bold'>Total Votes</span>
                <a href=""><img className='w-6 h-6' src="/details.png" alt="" /></a>
              </div>
              <div className='w-full h-4/6 flex items-center justify-center '>
                <img className='w-8' src="/votes.png" alt="" />
                <div className='text-7xl  pb-1 pl-1 font-bold '>{totalVotesCount}</div>
              </div>
            </div>
            <div className='px-4 py-2 bg-secondary-200 shadow-lg rounded-3xl w-44 md:w-56 xl:w-72 xl:h-40 h-32'>
              <div className='flex justify-between items-center w-full '>
                <span className='text-lg font-bold'>Total Voters</span>
                <a href=""><img className='w-6 h-6' src="/details.png" alt="" /></a>
              </div>
              <div className='w-full h-4/6 flex items-center justify-center '>
                <img className='w-8' src="/voters.png" alt="" />
                <span className='text-7xl  pb-1 pl-1 font-bold'>{totalUsersCount}</span>
              </div>
            </div>
            </div>
            <div className='px-4 py-2 bg-secondary-300 shadow-lg rounded-3xl w-96 xl:h-40 h-32'>
              <div className='flex justify-between items-center w-full '>
                <span className='text-lg font-bold'>Election Duration</span>
                <button onClick={openDurationModal}><img className='w-6 h-6' src="/details.png" alt="" /></button>
              </div>
              <div className='w-full flex items-center h-4/6 my-auto justify-center '>
                <img className='w-8' src="/duration.png" alt="" />
                <span className='text-7xl   pl-2 font-bold'>
                  {remainingTime < 0 ? (
                    <div className='text-4xl '>Election Ended</div>
                  ) : (
                    <span>{formatTime(remainingTime)}</span>
                  )}
                </span>
              </div>
            </div>
            
          </div>
        <VoteTally2 />
        </section>
        {isDurationModalOpen? <Duration />  : ""}
        
      </section>
    </>
  )
}

export default Dashboard;