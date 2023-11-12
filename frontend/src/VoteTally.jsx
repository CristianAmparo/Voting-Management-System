import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BarChart } from '@mui/x-charts/BarChart';

const VoteTally = ()=> {
  const [data, setData] = useState([]);
  const [chartComponents, setChartComponents] = useState([]);

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
            <div key={position}>
              <h3>{position} Chart</h3>
              <BarChart
                width={600}
                height={400}
                series={[
                  { data: uData, label: position, id: `${position}_id`, color: 'rgb(53, 162, 235)' }
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
  }, []);

  return (
    <>
    <section className='fixed top-20 left-0 lg:left-72 bottom-0 right-0'>
      <div className="flex">
        {chartComponents}
      </div>
    </section>
    </>
  );
}

export default VoteTally;