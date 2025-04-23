
import React, {useEffect,useState}from 'react'
import axios from "axios"
import {  Link ,useNavigate} from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const RoomsList = () => {
  
         const [data,setData]=useState([])
         const navigate=useNavigate()
         const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const getAllRoomDetails=async()=>{
        try{
      const response=await axios.get(`${backendUrl}/api/admin/rooms`)
      console.log(response.data)
      const reversedRooms=response.data.reverse()
      setData(reversedRooms)
        }
        catch(error)
        {
      console.error("Error in fetching productDetails")
        }
        }

        const deleteRoom = async (id) => {
          try {
            const response= await axios.delete(`http://localhost:8000/api/admin/deleteRooms/${id}`, {
              // headers: { Authorization: token },
            });
        if(response.data.success){
toast.success("Room deteted successfully", 
  
  { style: { color: "#111" } });
          }
            setData(data.filter((room) => room._id !== id));
            //setFilteredRooms(filteredRooms.filter((room) => room._id !== id));
          } catch (error) {
             toast.error(`Error deleting room: ${error.message}`);
          }
        };



          useEffect(()=>{
            getAllRoomDetails()
          }
        ,[])
  return (
<>
<ToastContainer/>
         <div className='p-5'>
  <div className='p-5 justify-center  flex flex-row flex-wrap gap-5'>
{
  data && data.length>0 ? (data.map((item,index)=>{
    return (
      <div key={index} className='bg-zinc-500 card p-3'>
    
   <div className='image-profile-container bg-zinc-200  border-none rounded-md'>
{/* <img className='rounded-md w-full  h-full object-contain' src={`http://localhost:20000/images/`+item.image} alt="" />  */}
{/* <img className='rounded-md w-full  h-full object-contain' src={`http://localhost:20000${item.image}`} alt="" />  */}
</div>
<div className='heading'>
<h1 className="student-name">{item.roomNumber}</h1>
</div>
    <p>Rs {item.price} </p>
    <p>{item.roomType}</p>
  <div className="flex items-center justify-center gap-10">
  <button
                    type="button"
                    className="more-info text-white bg-green-500 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                    onClick={() => navigate("/EditRoom", { state: { item } })}
                  >
                    Edit
                  </button>
                  <button     
                    type="button" 
                    className="more-info text-white bg-red-500  hover:bg-red-600 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                    onClick={() => deleteRoom(item._id)}
                    >
                      
                    Delete
                  </button>
            
                </div>


   </div>
    )
  })) : ( <p>No data available</p>)
}
  </div>
     </div>
</>
  )
}

export default RoomsList
