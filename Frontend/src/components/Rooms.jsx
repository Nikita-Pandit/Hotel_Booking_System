// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const BookingPage = () => {
//   const [rooms, setRooms] = useState([]);
//   const [selectedRoom, setSelectedRoom] = useState("");
//   const [date, setDate] = useState("");
//   const token = localStorage.getItem("token");

//   useEffect(() => {
//     axios.get("http://localhost:5000/api/admin/rooms").then((res) => setRooms(res.data));
//   }, []);

//   const bookRoom = async () => {
//     try {
//       await axios.post(
//         "http://localhost:5000/api/user/book",
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


// import React, { useState } from "react";
// import axios from "axios";

// const BookingForm = ({ roomId }) => {
//   const [checkInDate, setCheckInDate] = useState("");
//   const [checkOutDate, setCheckOutDate] = useState("");
//   const token = localStorage.getItem("token");

//   const handleBooking = async () => {
//     try {
//       await axios.post(
//         "http://localhost:5000/api/user/book",
//         { roomId, checkInDate, checkOutDate },
//         { headers: { Authorization: token } }
//       );
//       alert("Booking request sent!");
//     } catch (error) {
//       console.error("Error booking room", error);
//       alert("Booking failed");
//     }
//   };

//   return (
//     <div>
//       <h2>Book This Room</h2>
//       <label>Check-in Date:</label>
//       <input type="date" value={checkInDate} onChange={(e) => setCheckInDate(e.target.value)} />

//       <label>Check-out Date:</label>
//       <input type="date" value={checkOutDate} onChange={(e) => setCheckOutDate(e.target.value)} />

//       <button onClick={handleBooking}>Book Now</button>
//     </div>
//   );
// };

// export default BookingForm;




// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const BookingPage = () => {
//   const [rooms, setRooms] = useState([]);
//  // const [filters, setFilters] = useState({ priceMin: "", priceMax: "", roomType: "" });

//   useEffect(() => {
//     fetchRooms();
//   }, []);

//   const backendUrl = import.meta.env.VITE_BACKEND_URL;
//   console.log(backendUrl); // Check if it's loaded correctly

//   const fetchRooms = async () => {
//     try {
//       console.log("fetchRooms",fetchRooms)
//       const response = await axios.get(`${backendUrl}/api/admin/rooms`);
//       console.log("response.data",response.data)
//       setRooms(response.data)
//     } catch (error) {
//       console.error("Error fetching rooms", error);
//     }
//   };

// const userID=localStorage.getItem("userID")
//   const bookRoom = async (roomID) => {
//     try {
  
//       console.log("roomID",roomID)
//       // await axios.post("http://localhost:5000/api/bookings", { roomId }, {
//       //   headers: { Authorization: localStorage.getItem("token") }
//       // });
//       await axios.post(
//         `${backendUrl}/api/bookings`,
//         { roomID, userID},
//         // { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
//       );
      
//       alert("Booking request sent!");
//     } catch (error) {
//       console.error("Error booking room", error);
//     }
//   };

//   return (
//     <div className="container mx-auto p-4">
//       <h2 className="text-2xl font-bold mb-4">Book a Room</h2>

//       {/* Filters */}
//       {/* <div className="mb-4">
//         <input type="number" placeholder="Min Price" value={filters.priceMin} 
//           onChange={(e) => setFilters({ ...filters, priceMin: e.target.value })} />
//         <input type="number" placeholder="Max Price" value={filters.priceMax} 
//           onChange={(e) => setFilters({ ...filters, priceMax: e.target.value })} />
//         <select onChange={(e) => setFilters({ ...filters, roomType: e.target.value })}>
//           <option value="">All</option>
//           <option value="Standard">Standard</option>
//           <option value="Deluxe">Deluxe</option>
//           <option value="Suite">Suite</option>
//         </select>
//       </div> */}

//       {/* Rooms List */}
//       <ul>
//         {rooms.map((room) => (
//           <li key={room._id}>
//             Room {room.roomNumber} - ${room.price} ({room.roomType})
//             <button onClick={() => bookRoom(room._id)}>Book Now</button>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default BookingPage;












// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const Rooms = () => {
//   const [rooms, setRooms] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [bookingDates, setBookingDates] = useState({
//     checkInDate: "",
//     checkOutDate: ""
//   });
//   const navigate = useNavigate();

//   const backendUrl = import.meta.env.VITE_BACKEND_URL;

//   useEffect(() => {
//     const fetchRooms = async () => {
//       try {
//         console.log("Mango Mango")
//         const response = await axios.get(`${backendUrl}/api/admin/rooms`);
//         setRooms(response.data);
//       } catch (err) {
//         setError("Failed to fetch rooms. Please try again later.");
//         console.error("Error fetching rooms", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchRooms();
//   }, [backendUrl]);

//   const handleDateChange = (e) => {
//     const { name, value } = e.target;
//     setBookingDates(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   const bookRoom = async (roomID) => {
//     try {
//     //  const token = localStorage.getItem("token");
//       const userID = localStorage.getItem("customerID");
      
//       // if (!token || !userID) {
//       //   navigate("/login");
//       //   return;
//       // }

//       if (!bookingDates.checkInDate || !bookingDates.checkOutDate) {
//         alert("Please select check-in and check-out dates");
//         return;
//       }

//       const response = await axios.post(
//         `${backendUrl}/api/bookings`,
//         { 
//           roomID, 
//           userID,
//           checkInDate: bookingDates.checkInDate,
//           checkOutDate: bookingDates.checkOutDate
//         },
//         // { 
//         //   headers: { 
//         //     Authorization: `Bearer ${token}` 
//         //   } 
//         // }
//       );
      
//       alert("Booking request sent successfully!");
//       // Optionally redirect to bookings page
//       // navigate("/my-bookings");
//     } catch (error) {
//       console.error("Error booking room", error);
//       alert(error.response?.data?.message || "Error booking room");
//     }
//   };

//   if (loading) return <div className="text-center py-8">Loading rooms...</div>;
//   if (error) return <div className="text-center py-8 text-red-500">{error}</div>;

//   return (
//     <div className="container mx-auto p-4 max-w-6xl">
//       <h2 className="text-2xl font-bold mb-6 text-gray-800">Available Rooms</h2>

//       <div className="mb-6  p-4 rounded-lg shadow">
//         <h3 className="text-lg font-semibold mb-3">Select Dates</h3>
//         <div className="flex gap-4">
//           <div className="flex-1">
//             <label className="block text-sm font-medium text-gray-700 mb-1">Check-in Date</label>
//             <input
//               type="date"
//               name="checkInDate"
//               value={bookingDates.checkInDate}
//               onChange={handleDateChange}
//               className="w-full p-2 border rounded"
//               min={new Date().toISOString().split('T')[0]}
//             />
//           </div>
//           <div className="flex-1">
//             <label className="block text-sm font-medium text-gray-700 mb-1">Check-out Date</label>
//             <input
//               type="date"
//               name="checkOutDate"
//               value={bookingDates.checkOutDate}
//               onChange={handleDateChange}
//               className="w-full p-2 border rounded"
//               min={bookingDates.checkInDate || new Date().toISOString().split('T')[0]}
//             />
//           </div>
//         </div>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {rooms.map((room) => (
//           <div key={room._id} className="rounded-lg cart shadow overflow-hidden">
//               <div className='image-profile-container bg-zinc-200 border-none rounded-md h-40'>
//     <img className='rounded-md w-full h-full object-cover' src={room.image} alt="room" />
//   </div>
//             <div className="p-4">

//               <h3 className="text-xl font-semibold text-gray-800">Room No: {room.roomNumber}</h3>
              
//               <span className="bg-blue-600 text-xs px-2 py-1 rounded-full">{room.roomType}</span>
//                   <span className={`text-xs px-2 py-1 rounded-full ${
//                     rooms.availability ? 'bg-green-500' : 'bg-red-500'
//                   }`}>
//                     {room.availability ? "Available" : "Booked"}
//                   </span>
//                 </div>
//               {room.features?.length > 0 && (
//                   <div className="mt-3">
//                     <h4 className="text-sm font-semibold mb-1">Features:</h4>
//                     <div className="flex flex-wrap gap-1">
//                       {room.features.map((feature, i) => (
//                         <span key={i} className="bg-gray-700 text-xs px-2 py-1 rounded">
//                           {feature}
//                         </span>
//                       ))}
//                     </div>
//                   </div>
//                 )}
//                   <p>{room.bedType}</p>
//               <p className="text-lg font-bold text-blue-600 mt-2">${room.price} <span className="text-sm font-normal text-gray-500">/ night</span></p>
//               <p className="text-sm text-gray-500 mt-2">{room.description}</p>
//               <p>{room.bedType}</p>

//               <button 
//                 onClick={() => bookRoom(room._id)}
//                 className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded transition duration-200"
//                 disabled={!bookingDates.checkInDate || !bookingDates.checkOutDate}
//               >
//                 Book Now
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Rooms;


import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Rooms = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [bookingDates, setBookingDates] = useState({
    checkInDate: "",
    checkOutDate: ""
  });
  const navigate = useNavigate();

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await axios.get(`${backendUrl}/api/admin/rooms`);
        setRooms(response.data);
      } catch (err) {
        setError("Failed to fetch rooms. Please try again later.");
        console.error("Error fetching rooms", err);
      } finally {
        setLoading(false);
      }
    };

    fetchRooms();
  }, [backendUrl]);

  const handleDateChange = (e) => {
    const { name, value } = e.target;
    setBookingDates(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const bookRoom = async (roomID) => {
    try {
      const userID = localStorage.getItem("customerID");
      
      if (!bookingDates.checkInDate || !bookingDates.checkOutDate) {
        alert("Please select check-in and check-out dates");
        return;
      }

      const response = await axios.post(
        `${backendUrl}/api/bookings`,
        { 
          roomID, 
          userID,
          checkInDate: bookingDates.checkInDate,
          checkOutDate: bookingDates.checkOutDate
        }
      );
      
      alert("Booking request sent successfully!");
    } catch (error) {
      console.error("Error booking room", error);
    toast.error(error.response?.data?.message || "Error booking room");
    }
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );

  if (error) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-red-500 text-center p-4 bg-red-50 rounded-lg max-w-md">
        {error}
      </div>
    </div>
  );

  return (
    
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <ToastContainer />
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Find Your Perfect Room</h1>
          <p className="mt-2 text-lg text-gray-600">Select your dates to check availability</p>
        </div>

        {/* Date Selection Card */}
        <div className="rounded-xl shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Select Your Stay Dates</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Check-in Date</label>
              <input
                type="date"
                name="checkInDate"
                value={bookingDates.checkInDate}
                onChange={handleDateChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                min={new Date().toISOString().split('T')[0]}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Check-out Date</label>
              <input
                type="date"
                name="checkOutDate"
                value={bookingDates.checkOutDate}
                onChange={handleDateChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                min={bookingDates.checkInDate || new Date().toISOString().split('T')[0]}
                disabled={!bookingDates.checkInDate}
              />
            </div>
          </div>
        </div>

        {/* Rooms Grid */}
        {rooms.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {rooms.map((room) => (
              <div key={room._id} className="cart rounded-xl overflow-hidden shadow-lg transform transition-all hover:scale-[1.02]">
                <div className="relative h-48 overflow-hidden">
                  <img 
                    className="w-full h-full object-cover" 
                    src={room.image} 
                    alt={`Room ${room.roomNumber}`}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "https://via.placeholder.com/400x300?text=Room+Image";
                    }}
                  />
                  <div className="absolute top-3 right-3 flex space-x-2">
                    <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded-full">
                      {room.roomType}
                    </span>
                    <span className={`text-white text-xs px-2 py-1 rounded-full ${
                      room.availability ? 'bg-green-500' : 'bg-red-500'
                    }`}>
                      {room.availability ? "Available" : "Booked"}
                    </span>
                  </div>
                </div>

                <div className="p-5 text-white">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold">Room {room.roomNumber}</h3>
                
                    <p className="text-lg font-bold text-blue-400">
                      ${room.price}<span className="text-sm font-normal text-gray-300">/night</span>
                    </p>
                    
                  </div>
               
                  <p className="text-gray-300 mb-4 line-clamp-2">{room.description}</p>

                  {room.features?.length > 0 && (
                    <div className="mb-4">
                      <h4 className="text-sm font-semibold mb-2">Room Features:</h4>
                      <div className="flex flex-wrap gap-2">
                        {room.features.map((feature, i) => (
                          <span key={i} className="bg-gray-700 text-white text-xs px-2 py-1 rounded">
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="flex items-center justify-between mt-4">
                    <span className="text-sm text-gray-300">
                      <i className="fas fa-bed mr-1"></i> {room.bedType} bed
                    </span>
                    <button
                      onClick={() => bookRoom(room._id)}
                      className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                        (!bookingDates.checkInDate || !bookingDates.checkOutDate)
                          ? "bg-gray-500 cursor-not-allowed"
                          : "bg-blue-600 hover:bg-blue-700"
                      }`}
                      disabled={!bookingDates.checkInDate || !bookingDates.checkOutDate}
                    >
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-xl shadow">
            <h3 className="text-xl font-medium text-gray-700">No rooms available</h3>
            <p className="mt-2 text-gray-500">Please check back later or contact us</p>
          </div>
        )}
      </div>

      <style jsx>{`
        .cart {
          background: linear-gradient(to bottom right, rgb(34, 44, 64), rgba(31, 41, 55, 1));
        }
      `}</style>
    </div>
  );
};

export default Rooms;