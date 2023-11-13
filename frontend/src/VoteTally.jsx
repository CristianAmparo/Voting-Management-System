import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BarChart } from '@mui/x-charts/BarChart';

const VoteTally = () => {
  const [data, setData] = useState([]);
  const [chartComponents, setChartComponents] = useState([]);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [graphSize, setGraphSize] = useState({ width: 500, height: 300 }); // Initial graph size

  useEffect(() => {
    // Update graph size based on screen width
    if (screenWidth > 430) {
      setGraphSize({ width: 500, height: 300 });
    } else {
      setGraphSize({ width: 380, height: 240 });
    }
  }, [screenWidth]); // Run this effect when screenWidth changes

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    axios
      .get('http://localhost:5000/api/votes/count')
      .then((response) => {
        const responseData = response.data;
        setData(responseData);

        // Extract unique positions from the data
        const uniquePositions = [...new Set(responseData.map((item) => item.position))];

        // Create a BarChart component for each unique position
        const charts = uniquePositions.map((position) => {
          const positionData = responseData.filter((item) => item.position === position);
          const uData = positionData.map((item) => item.vote_count);
          const xLabels = positionData.map((item) => item.name);

          return (
            <div className='flex flex-col justify-center bg-slate-200 items-center w-max h-max' key={position}>
              <h3>{position} Chart</h3>
              <BarChart
                width={graphSize.width}
                height={graphSize.height}
                series={[
                  { data: uData, label: position, id: `${position}_id`, color: '#ff8c00' }
                ]}
                xAxis={[{ data: xLabels, scaleType: 'band' }]}
              />
            </div>
          );
        });

        setChartComponents(charts);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, [graphSize]); // Run this effect when graphSize changes

  return (
    <>
      <section className='fixed top-20 left-0 xl:left-72 bottom-0 right-0 flex justify-center'>
        <div className="graph overflow-auto overflow-x-hidden w-screen h-full gap-5 grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3">
          {chartComponents}
        </div>
      </section>
    </>
  );
}

export default VoteTally;
