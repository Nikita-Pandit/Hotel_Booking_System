// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const BookingPage = () => {
  
//   const backendUrl = import.meta.env.VITE_BACKEND_URL;
//   const [rooms, setRooms] = useState([]);
//   const [selectedRoom, setSelectedRoom] = useState("");
//   const [date, setDate] = useState("");
//   const token = localStorage.getItem("token");

//   useEffect(() => {
//     axios.get(`${backendUrl}/api/rooms`).then((res) => setRooms(res.data));
//   }, []);

//   const bookRoom = async () => {
//     try {
//       await axios.post(
//         `${backendUrl}/api/user/book`,
//         { roomId: selectedRoom, date },
//         { headers: { Authorization: token } }
//       );
//       alert("Booking request sent!");
//     } catch (error) {
//       console.error("Booking failed", error);
//     }
//   };

//   return (
//     <div className="p-4">
//       <h2 className="text-2xl font-bold">Book a Room</h2>
//       <select onChange={(e) => setSelectedRoom(e.target.value)} className="border p-2 rounded">
//         <option value="">Select Room</option>
//         {rooms.map((room) => (
//           <option key={room._id} value={room._id}>
//             Room {room.roomNumber} - ${room.price}
//           </option>
//         ))}
//       </select>
//       <input
//         type="date"
//         className="border p-2 rounded"
//         value={date}
//         onChange={(e) => setDate(e.target.value)}
//       />
//       <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={bookRoom}>
//         Book Now
//       </button>
//     </div>
//   );
// };

// export default BookingPage;
