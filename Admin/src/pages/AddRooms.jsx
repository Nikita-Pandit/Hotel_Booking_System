
import React, {useState} from 'react'
import axios from "axios"
const AddRooms = () => { 

    //backend url
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    console.log(backendUrl);


  const [roomNumber, setRoomNumber] = useState("");
  const [price, setPrice] = useState("");
  const [roomType, setRoomType] = useState("Standard");
  // const token = localStorage.getItem("token");

  const addRoom = async () => {
    try {
      console.log("room added")
      console.log(roomNumber)
      const response = await axios.post(
        `${backendUrl}/api/admin/addRooms`,
        { roomNumber, price, roomType },
        // { headers: { Authorization: token } }
      );
      if(response.data.success){
        alert("room added successfully")
      }
      else{
        alert("room not added successfully")      
      }
    //   setRooms([...rooms, response.data]);
    //   setRoomNumber("");
    //   setPrice("");
    } catch (error) {
      console.error("Error adding room", error);
    }
  };
  return (
    <div className="mb-4 p-4 border rounded-lg">
    <h3 className="text-xl font-semibold mb-2">Add Room</h3>
    <input
      type="text"
      placeholder="Room Number"
      value={roomNumber}
      name="roomNumber"
      onChange={(e) => setRoomNumber(e.target.value)}
      className="border p-2 rounded w-full mb-2"
    />
    <input
      type="number"
      placeholder="Price"
      value={price}
      name="price"
      onChange={(e) => setPrice(e.target.value)}
      className="border p-2 rounded w-full mb-2"
    />
    <select
      className="border p-2 rounded w-full mb-2"
      value={roomType}
      onChange={(e) => setRoomType(e.target.value)}
    >
      <option value="Standard">Standard</option>
      <option value="Deluxe">Deluxe</option>
      <option value="Suite">Suite</option>
    </select>
    <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={addRoom}>
      Add Room
    </button>
  </div>
  )
}

export default AddRooms
