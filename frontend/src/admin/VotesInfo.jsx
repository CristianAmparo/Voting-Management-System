import React, { useEffect, useState, useContext } from "react";
import DataTable from "react-data-table-component";
import axios from "axios";



const Sample=()=> {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState([]);


 
    const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/votes');
      setData(response.data);
      setFilter(response.data);
    }
      
      catch (error) {
      console.error('Error fetching data:', error);
      }};
      
    useEffect(() => {
      fetchData();
      
      const intervalId = setInterval(fetchData, 5000);
      return () => {
        clearInterval(intervalId);
      };
    }, []);


  const columns = [
  {
    name: " __ Id",
    selector: (row) => row.id,
    sortable: true,
    center: "true",
  },
    {
    name: " User_Id",
    selector: (row) => row.user_id,
    sortable: true,
    center: "true",
  },
  {
    name: "President",
    selector: (row) => row.president,
    sortable: true,
  },
  {
    name: "Vice President",
    selector: (row) => row.vice,
    sortable: true,
  },
  {
    name: "Secretary",
    selector: (row) => row.secretary,
    sortable: true,
  },
    {
    name: "Treasurer",
    selector: (row) => row.treasurer,
    sortable: true,
  },
    {
    name: "First_Rep",
    selector: (row) => row.first_rep,
    sortable: true,
  },

];
/* incase want the search functionality in vote information
 useEffect(() => {
    const result = data.filter((item) => {

      return item.username.toLowerCase().includes(search.toLowerCase());
    });
    setFilter(result);
  }, [search, data]);
*/
  const tableHeaderStyle = {
    headCells: {
      style: {
        fontWeight: "bold",
        fontSize: "14px",
        backgroundColor: "#c2410c",
        color: "white",
      },
    },
  };

  return (
    <React.Fragment>

      <section className="fixed top-20 left-0 xl:left-72 right-0 flex flex-col justify-center xl:px-15 md:px-5 px-2  py-10 ">
        <div className="bg-white px-2 rounded-md">
        <DataTable className="w-full  border border-black shadow-lg z-0"
          customStyles={tableHeaderStyle}
          columns={columns}
          data={filter}
          pagination
          fixedHeader
          highlightOnHover
          subHeader
          subHeaderComponent={
            <div className="w-full border-b-2 border-slate-400">
              <div className="flex w-full justify-between py-3 items-center ">
                <h1 className="text-2xl font-bold leading-tight tracking-tight text-gray-900 md:text-3xl text-left"><span className='text-orange-600'>Votes</span> Information</h1>
                  <input
                    type="text"
                    className="textInput w-32 md:w-64 sm:text-sm h-10 focus:ring-primary-600 focus:border-primary-600"
                    placeholder="Search..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                  </div>
            </div>

          }
          subHeaderAlign="center"
        />
        </div>
      </section>
   
    </React.Fragment>
  );
}
export default Sample;