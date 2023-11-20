import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReactApexChart from 'react-apexcharts';
const apiVotes = import.meta.env.VITE_apiVotes 


const VoteTally2 = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get(`${apiVotes}/count`)
      .then((response) => {
        const responseData = response.data;
        setData(responseData);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const uniquePositions = [...new Set(data.map((item) => item.position))];

  const charts = uniquePositions.map((position) => {
    const positionData = data.filter((item) => item.position === position);
    const votes = positionData.map((item) => item.vote_count);
    const candidates = positionData.map((item) => item.name);

    if (votes.length === 0 || candidates.length === 0) {
      // Skip rendering if either votes or candidates are empty
      return null;
    }

    const series = [{
      name: 'Votes',
      data: votes,
    }];

    const options = {
      colors: ["#FFA500"],
      plotOptions: {
        bar: {
          borderRadius: 0,
          horizontal: true,
        },
      },
      xaxis: {
        categories: candidates,
      },
      responsive: [
        {
          breakpoint: 500,
          options: {
            plotOptions: {
              bar: {
                horizontal: false,
              },
            },
            legend: {
              position: "bottom",
            },
          },
        },
      ],
    };

    return (
      <div className='flex flex-col justify-between items-center w-full h-96 bg-gray-100 shadow-lg rounded-md p-10 pr-5' key={position}>
        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl text-left"><span className='text-orange-600'>{position}</span></h1>
        <ReactApexChart className='w-full' options={options} series={series} type="bar" height={"100%"} />
      </div>
    );
  });

  return (
    <>
      <div className="graph overflow-auto overflow-x-hidden w-full gap-5 grid grid-cols-1 xl:grid-cols-2 py-10">
        {charts}
      </div>
    </>
  );
}

export default VoteTally2;
