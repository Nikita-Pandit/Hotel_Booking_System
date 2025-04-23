import { useLocation} from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import axios from "axios"
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import { assets} from '../../assets/assets';

const EditRoom= () => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
    //    const [image, setImage] = useState(false);
  const [room, setRoom] = useState({
    roomNumber:'',
    price:'',
    roomType:'Standard'
  });
const location=useLocation()
const editRoom=location?.state?.item
const id=editRoom._id;
console.log("id in EditRoom", id);
useEffect(() => {
  if ( editRoom) {
    setRoom({
      roomNumber: editRoom.roomNumber || '',
      price: editRoom.price || '',
      roomType: editRoom.roomType || 'Standard',
    });
  }
}, []);
  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setRoom({ ...room, [name]: value });
  };


const updateRoom = async () => {
  if (!id) {
    toast.error("Room ID not found. Cannot update.");
    return;
  }

  try {
    const response = await axios.put(
      `${backendUrl}/api/admin/editroom/${id}`,
      room
    );

    if (response.data.success) {
      toast.success("Room updated successfully", { style: { color: "#111" } });
      setRoom(response.data.updatedRoom);
    }
  } catch (error) {
    toast.error(`Error updating room: ${error.message}`);
  }
};

  return (
    <>

<ToastContainer/>
<div className="mb-4 p-4 border rounded-lg">
    <h3 className="text-xl font-semibold mb-2">Add Room</h3>
    <input
      type="text"
      placeholder="Room Number"
      value={room.roomNumber}
      name="roomNumber"
      onChange={onChangeHandler}
      className="border p-2 rounded w-full mb-2"
    />
    <input
      type="number"
      placeholder="Price"
      value={room.price}
      name="price"
      onChange={onChangeHandler}
      className="border p-2 rounded w-full mb-2"
    />
    <select
      className="border p-2 rounded w-full mb-2"
      name="roomType"
      value={room.roomType}
     onChange={onChangeHandler}
    >
      <option value="Standard">Standard</option>
      <option value="Deluxe">Deluxe</option>
      <option value="Suite">Suite</option>
    </select>
    <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={updateRoom}>
    update Room
    </button>
  </div>
       </>
  );
};
export default EditRoom;
