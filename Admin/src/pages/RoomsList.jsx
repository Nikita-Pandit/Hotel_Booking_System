
// import React, {useEffect,useState}from 'react'
// import axios from "axios"
// import {  Link ,useNavigate} from 'react-router-dom'
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// const RoomsList = () => {
  
//          const [data,setData]=useState([])
//          const navigate=useNavigate()
//          const backendUrl = import.meta.env.VITE_BACKEND_URL;
//     const getAllRoomDetails=async()=>{
//         try{
//       const response=await axios.get(`${backendUrl}/api/admin/rooms`)
//       console.log(response.data)
//       const reversedRooms=response.data.reverse()
//       setData(reversedRooms)
//         }
//         catch(error)
//         {
//       console.error("Error in fetching productDetails")
//         }
//         }

//         const deleteRoom = async (id) => {
//           try {
//             const response= await axios.delete(`${backendUrl}/api/admin/deleteRooms/${id}`, {
//               // headers: { Authorization: token },
//             });
//         if(response.data.success){
// toast.success("Room deteted successfully", 
  
//   { style: { color: "#111" } });
//           }
//             setData(data.filter((room) => room._id !== id));
//             //setFilteredRooms(filteredRooms.filter((room) => room._id !== id));
//           } catch (error) {
//              toast.error(`Error deleting room: ${error.message}`);
//           }
//         };



//           useEffect(()=>{
//             getAllRoomDetails()
//           }
//         ,[])
//   return (
// <>
// <ToastContainer/>
//          <div className='p-5'>
//   <div className='p-5 justify-center  flex flex-row flex-wrap gap-5'>
// {
//   data && data.length>0 ? (data.map((item,index)=>{
//     return (
// <div key={index} className='card p-3 w-72'>
//   <div className='image-profile-container bg-zinc-200 border-none rounded-md h-40'>
//     <img className='rounded-md w-full h-full object-cover' src={item.image} alt="room" />
//   </div>
//   <div className='heading mt-3'>
//     <h1 className="font-bold">Room {item.roomNumber}</h1>
//   </div>
//   <p><strong>Type:</strong> {item.roomType}</p>
//   <p><strong>Price:</strong> Rs {item.price}</p>
//   <p><strong>Bed:</strong> {item.bedType}</p>
//   <p><strong>Status:</strong> {item.availability ? "Available" : "Not Available"}</p>
//   <p><strong>Features:</strong> {item.features?.join(", ")}</p>
//   <p><strong>Description:</strong> {item.description}</p>

//   <div className="flex items-center justify-center gap-3 mt-3">
//     <button
//       className="text-white bg-green-500 font-medium rounded-lg text-sm px-4 py-2"
//       onClick={() => navigate("/EditRoom", { state: { item } })}
//     >
//       Edit
//     </button>
//     <button
//       className="text-white bg-red-500 hover:bg-red-600 font-medium rounded-lg text-sm px-4 py-2"
//       onClick={() => deleteRoom(item._id)}
//     >
//       Delete
//     </button>
//   </div>
// </div>

//     )
//   })) : ( <p>No data available</p>)
// }
//   </div>
//      </div>
// </>
//   )
// }

// export default RoomsList


import React, { useEffect, useState } from 'react';
import axios from "axios";
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const RoomsList = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const getAllRoomDetails = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${backendUrl}/api/admin/rooms`);
      const reversedRooms = response.data.reverse();
      setData(reversedRooms);
    } catch (error) {
      console.error("Error in fetching productDetails");
      toast.error("Failed to load rooms data");
    } finally {
      setIsLoading(false);
    }
  };

  const deleteRoom = async (id) => {
    if (!window.confirm("Are you sure you want to delete this room?")) return;
    
    try {
      const response = await axios.delete(`${backendUrl}/api/admin/deleteRooms/${id}`);
      if (response.data.success) {
        toast.success("Room deleted successfully");
        setData(data.filter((room) => room._id !== id));
      }
    } catch (error) {
      toast.error(`Error deleting room: ${error.message}`);
    }
  };

  useEffect(() => {
    getAllRoomDetails();
  }, []);

  return (
    <div className="min-h-screen p-6">
      <ToastContainer position="top-right" autoClose={3000} />
      
      <div className="mb-6 flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800">Room Management</h1>
        <Link 
          to="/AddRoom" 
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors"
        >
          Add New Room
        </Link>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : data && data.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {data.map((item, index) => (
            <div 
              key={index} 
              className="card p-5 rounded-2xl shadow-lg transition-transform hover:scale-105 hover:shadow-xl"
            >
              <div className="image-container h-48 overflow-hidden rounded-lg mb-4">
                <img 
                  className="w-full h-full object-cover" 
                  src={item.image} 
                  alt={`Room ${item.roomNumber}`} 
                  onError={(e) => {
                    e.target.onerror = null; 
                    e.target.src = "https://via.placeholder.com/300x200?text=Room+Image";
                  }}
                />
              </div>
              
              <div className="text-white space-y-2">
                <h2 className="text-xl font-bold">Room {item.roomNumber}</h2>
                <div className="flex justify-between">
                  <span className="bg-blue-600 text-xs px-2 py-1 rounded-full">{item.roomType}</span>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    item.availability ? 'bg-green-500' : 'bg-red-500'
                  }`}>
                    {item.availability ? "Available" : "Booked"}
                  </span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="font-medium">Rs {item.price}</span>
                  <span className="text-sm">{item.bedType} bed</span>
                </div>
                
                {item.features?.length > 0 && (
                  <div className="mt-3">
                    <h4 className="text-sm font-semibold mb-1">Features:</h4>
                    <div className="flex flex-wrap gap-1">
                      {item.features.map((feature, i) => (
                        <span key={i} className="bg-gray-700 text-xs px-2 py-1 rounded">
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                
                {item.description && (
                  <div className="mt-3">
                    <h4 className="text-sm font-semibold mb-1">Description:</h4>
                    <p className="text-sm text-gray-300 line-clamp-2">{item.description}</p>
                  </div>
                )}
              </div>
              
              <div className="flex justify-between gap-3 mt-4">
                <button
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg py-2 transition-colors"
                  onClick={() => navigate("/EditRoom", { state: { item } })}
                >
                  Edit
                </button>
                <button
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg py-2 transition-colors"
                  onClick={() => deleteRoom(item._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-10">
          <p className="text-gray-600 text-lg">No rooms available</p>
          <Link 
            to="/AddRoom" 
            className="mt-4 inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md transition-colors"
          >
            Add Your First Room
          </Link>
        </div>
      )}
      
      <style jsx>{`
        .card {
          background: linear-gradient(to bottom right, rgb(34, 44, 64), rgba(31, 41, 55, 1));
        }
      `}</style>
    </div>
  );
};

export default RoomsList;