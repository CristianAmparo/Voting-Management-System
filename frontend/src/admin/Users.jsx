import React, { useEffect, useState, useContext } from "react";
import DataTable from "react-data-table-component";
import Swal from 'sweetalert2';
import axios from "axios";
import Authorization from './Authorization';
import GetHeaders from "./GetHeaders";
const apiHost = import.meta.env.VITE_host



const Users=()=> {
  Authorization()
  const [data, setData] = useState([]);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState([]);
  const headers = GetHeaders()



  useEffect(() => {
    axios.get(`${apiHost}api/users/`, {headers})
      .then((response) => {
        setData(response.data);
        setFilter(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);


const handleDelete = (id) => {
  // Display a SweetAlert2 confirmation dialog
  Swal.fire({
    icon: 'question',
    title: 'Confirmation',
    text: 'Are you sure you want to delete this user?',
    showCancelButton: true,
    confirmButtonText: 'Yes, delete',
    cancelButtonText: 'No, cancel',
  }).then((result) => {
    // If the user confirms the deletion
    if (result.isConfirmed) {
      // Make the API request to delete the user
      axios
        .delete(`${apiHost}api/users/${id}`, { headers })
        .then((response) => {
          // Display a SweetAlert2 success message
          Swal.fire({
            icon: 'success',
            title: 'Success!',
            text: response.data.message,
          });

          // Update local state to reflect the removal of the deleted user
          const newdata = data.filter((item) => item.id !== id);
          setData(newdata);
          setFilter(newdata);
        })
        .catch((error) => {
          // Display a SweetAlert2 error message
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: `Error deleting user with id ${id}: ${error.response.data.error}`,
          });
          console.error(`Error deleting user with id ${id}:`, error);
        });
    }
  });
};



  const columns = [
  {
    name: " __Id",
    selector: (row) => row.id,
    sortable: true,
    center: "true",

  },
  {
    name: "Name",
    selector: (row) => row.name,
    sortable: true,
  },
  {
    name: "Username",
    selector: (row) => row.username,
    sortable: true,
  },
  {
    name: "Password",
    selector: (row) => row.password,
    sortable: true,
  },
  {
    name: "Image",
    selector: (row) => row.image,
    //cell: (row) => <div className="w-10 h-10 flex items-center rounded-full overflow-hidden"><img src={`${uploads}/${row.image}`} alt="" /></div>

  },
  {
    name: "Action",
    center: "true",
    style: {
      whiteSpace: 'nowrap'
    },
    cell: (row) => (
      <div className="flex gap-1">
        <button onClick={() => handleDelete(row.id)} className="flex items-center justify-center bg-red-500 text-white px-4 py-2 rounded focus:outline-none hover:bg-red-600 gap-1">
          <img  className='w-3 h-3' src="/delete.png" alt="" />
          Delete 
        </button>
      </div>
    ),
  }
];

 useEffect(() => {
    const result = data.filter((item) => {
      return item.name.toLowerCase().includes(search.toLowerCase());
    });
    setFilter(result);
  }, [search, data]);

  const customStyles = {
  headCells: {
    style: {
      fontWeight: 'bold',
      fontSize: '14px',
      backgroundColor: '#c2410c',
      color: 'white',
    },
  },
  table: {
    style: {
      maxHeight: '720px', 
    },
  },
};

  return (
    <React.Fragment>

      <section className="fixed top-20 left-0 xl:left-72 right-0 flex flex-col justify-center xl:px-15 md:px-5 px-2  py-10 ">
        <div className="bg-white px-2 rounded-lg">
        <DataTable className="w-full  z-0  border border-black shadow-lg"
          customStyles={customStyles}
          columns={columns}
          data={filter}
          pagination
          fixedHeader
          highlightOnHover
          subHeader
          subHeaderComponent={
            <div className="w-full border-b-2 border-slate-400">
              <div className="flex w-full justify-between py-3 items-center ">
                <h1 className="text-2xl font-bold leading-tight tracking-tight text-gray-900 md:text-3xl text-left"><span className='text-orange-600'>Users</span> Table</h1>
                <div className="flex gap-2">
                  <input
                    type="text"
                    className="textInput w-20 sm:w-32 md:w-64 sm:text-sm h-10 focus:ring-primary-600 focus:border-primary-600"
                    placeholder="Search..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>
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
export default Users;