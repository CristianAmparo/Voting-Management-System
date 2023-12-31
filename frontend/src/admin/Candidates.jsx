import React, { useEffect, useState, useContext } from "react";
import DataTable from "react-data-table-component";
import Swal from 'sweetalert2';
import axios from "axios";
import AddCandidateModal from './modal/AddCandidateModal';
import EditCandidateModal from './modal/editCandidateModal';
import { MyContext } from '../context/MyContext';
import Authorization from './Authorization';
import GetHeaders from "./GetHeaders";

const apiHost = import.meta.env.VITE_host

const Candidates=()=> {
  Authorization()
  const [data, setData] = useState([]);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState([]);
  const {isAddCandidateModal, openAddCandidateModal, editCandidate, isEditCandidateModal} = useContext(MyContext)
  const headers = GetHeaders()

  
  const fetchData = async () => {
 
    try {
      const response = await axios.get(`${apiHost}api/candidates/`, {headers});
      setData(response.data);
      setFilter(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
    };

    useEffect(() => {
      fetchData();
      const intervalId = setInterval(fetchData, 3000);
      return () => {
        clearInterval(intervalId);
      };
    }, []);


const handleDelete = (id) => {
  // Display a SweetAlert2 confirmation dialog
  Swal.fire({
    icon: 'question',
    title: 'DELETE CANDIDATE',
    text: 'Are you sure you want to delete this candidate?',
    showCancelButton: true,
    confirmButtonText: 'Yes, delete',
    cancelButtonText: 'No, cancel',
  }).then((result) => {
    // If the user confirms the deletion
    if (result.isConfirmed) {
      // API request to delete the candidate
      axios
        .delete(`${apiHost}api/candidates/${id}`, { headers })
        .then((response) => {
          // Display a SweetAlert2 success message
          Swal.fire({
            icon: 'success',
            title: 'Success!',
            text: response.data.message,
          });

          // Update local state to reflect the removal of the deleted candidate
          const newdata = data.filter((item) => item.id !== id);
          setData(newdata);
          setFilter(newdata);
        })
        .catch((error) => {
          // Display a SweetAlert2 error message
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: `Error deleting candidate with id ${id}: ${error.response.data.error}`,
          });
          console.error(`Error deleting candidate with id ${id}:`, error);
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

    style: {},
  },
  {
    name: "Name",
    selector: (row) => row.name,
    sortable: true,
  },
  {
    name: "Position",
    selector: (row) => row.position,
    sortable: true,
  },
  {
    name: "Partylist",
    selector: (row) => row.partylist,
    sortable: true,
  },
  {
    name: "Image",
    selector: (row) => row.image,
  },
  {
    name: "Action",
    center: "true",
    style: {
      whiteSpace: 'nowrap'
    },
    cell: (row) => (
      <div className="flex gap-1">
        <button onClick={() => editCandidate(row.id)} className="flex items-center justify-center bg-indigo-500 text-white px-4 py-2 rounded focus:outline-none hover:bg-indigo-600 gap-1">
          <img className='w-3 h-3' src="/edit.png" alt="" />
          Edit
        </button>
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

      <section className="fixed top-20 left-0 xl:left-72 right-0 flex flex-col  justify-center xl:px-15 md:px-5 px-2  py-10">
        <div className="bg-white px-2 rounded-lg" >
        <DataTable className="w-full z-0  border border-black shadow-lg"
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
                <h1 className="text-2xl font-bold leading-tight tracking-tight text-gray-900 md:text-3xl text-left"><span className='text-orange-600'>Candidates</span> Table</h1>
                <div className="flex gap-2">
                  <input
                    type="text"
                    className="textInput w-20 sm:w-32 md:w-64 sm:text-sm h-10 focus:ring-primary-600 focus:border-primary-600"
                    placeholder="Search..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                  <button onClick={openAddCandidateModal} className="flex items-center bg-green-600 text-white px-4 py-2 rounded focus:outline-none text-sm hover:bg-green-700 gap-1">
                      <img className='w-3 h-3' src="/add.png" alt="" /> Add
                  </button>
                </div>
              </div>
            </div>

          }
          subHeaderAlign="center"
        />
        </div>
      </section>
          {isAddCandidateModal? <AddCandidateModal /> : ''}
          {isEditCandidateModal? <EditCandidateModal /> : ''}
    </React.Fragment>
  );
}
export default Candidates;