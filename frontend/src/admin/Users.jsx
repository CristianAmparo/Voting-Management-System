import React, { useEffect, useState, useContext } from "react";
import DataTable from "react-data-table-component";
import axios from "axios";
import AddCandidateModal from './modal/AddCandidateModal';
import { MyContext } from "../context/MyContext";
import EditCandidateModal from './modal/editCandidateModal';


const Users=()=> {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState([]);
  const {isAddCandidateModal, openAddCandidateModal, editCandidate, isEditCandidateModal} = useContext(MyContext)


  useEffect(() => {
    axios.get('http://localhost:5000/api/users/')
      .then((response) => {
        setData(response.data);
        setFilter(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

 const handleDelete = (id) => {
  axios.delete(`http://localhost:5000/api/candidates/${id}`)
    .then((response) => {
      const newdata = data.filter((item) => item.id !== id);
      setData(newdata);
      setFilter(newdata);
      alert(response.data.message); // You might want to handle the response appropriately
    })
    .catch((error) => {
      console.error(`Error deleting user with id ${id}:`, error);
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
    selector: (row) => row.username,
    sortable: true,
  },
  {
    name: "Partylist",
    selector: (row) => row.password,
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
        <div className="bg-white px-2 rounded-lg">
        <DataTable className="w-full  z-0  border border-black shadow-lg"
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
                <h1 className="text-2xl font-bold leading-tight tracking-tight text-gray-900 md:text-3xl text-left"><span className='text-orange-600'>Users</span> Table</h1>
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
export default Users;