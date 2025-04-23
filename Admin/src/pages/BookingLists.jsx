


// import React, {useEffect, useState} from 'react'
// import axios from "axios"


// const BookingLists = () => {
//     const [bookings, setBookings] = useState([]);

//     const backendUrl = import.meta.env.VITE_BACKEND_URL;
//     console.log(backendUrl); // Check if it's loaded correctly

//   useEffect(() => {
//     axios.get(`${backendUrl}/api/user/bookRooms`).then((res) => setBookings(res.data));
//   }, []);
//   const updateBookingStatus = async (id, status) => {
//     await axios.put(`${backendUrl}/api/admin/update-booking/${id}`, { status });
//     setBookings(bookings.map((b) => (b._id === id ? { ...b, status } : b)));
//   };
//   return (
//     <div>
//     <h2 className="text-xl font-semibold">Admin Bookings</h2>
//     {bookings.map((b) => (
//       <div key={b._id} className="border p-4 mb-2 rounded-lg">
//         {/* <p><strong>User:</strong> {b.username}</p> */}
//         <p><strong>Room ID:</strong> {b.room}</p>
//         {/* <p><strong>Room Type:</strong> {b.room}</p> */}
//         <p><strong>Date:</strong> {b.date}</p>
//         <p><strong>Status:</strong> {b.status}</p>
//         <button
//           className="bg-green-500 text-white px-2 py-1 rounded mr-2"
//           onClick={() => updateBookingStatus(b._id, "Confirmed")}
//         >
//           Approve
//         </button>
//         <button
//           className="bg-red-500 text-white px-2 py-1 rounded"
//           onClick={() => updateBookingStatus(b._id, "Rejected")}
//         >
//           Reject
//         </button>
//       </div>
//     ))}
//   </div>
//   )
// }

// export default BookingLists


import React, { useEffect, useState } from 'react';
import axios from "axios";
import { format } from 'date-fns';

const BookingLists = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [userDetails, setUserDetails] = useState({});
    const [roomDetails, setRoomDetails] = useState({});
    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    useEffect(() => {
        const fetchBookings = async () => {
            try {
               console.log("booking booking...")
                const response = await axios.get(`${backendUrl}/api/user/bookRooms`);

                console.log(response.data)
                setBookings(response.data);
                const userIds = [...new Set(response.data.map(b => b.userID))];
                
                // Fetch user details for all unique users
                const usersResponse = await axios.post(`${backendUrl}/api/users/batch`, { 
                    userIds 
                });
                  // Create a mapping of userID to user details
                  const usersMap = {};
                  usersResponse.data.forEach(user => {
                      usersMap[user._id] = user;
                  });
                  
                  setUserDetails(usersMap);
                  const roomIds = [...new Set(response.data.map(b => b.roomID))];
                
                // Fetch user details for all unique users
                const roomsResponse = await axios.post(`${backendUrl}/api/rooms/batch`, { 
                    roomIds 
                });
                  // Create a mapping of userID to user details
                  const roomsMap = {};
                  roomsResponse.data.forEach(room => {
                      roomsMap[room._id] = room;
                  });
                  
                  setRoomDetails(roomsMap);
            } catch (err) {
                setError("Failed to fetch bookings. Please try again later.");
                console.error("Error fetching bookings:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchBookings();
    }, [backendUrl]);

    const updateBookingStatus = async (id, status) => {
        try {
            await axios.put(`${backendUrl}/api/admin/update-booking/${id}`, { status });
            setBookings(bookings.map((b) => (b._id === id ? { ...b, status } : b)));
        } catch (err) {
            console.error("Error updating booking status:", err);
            alert("Failed to update booking status");
        }
    };

    if (loading) return <div className="text-center py-8">Loading bookings...</div>;
    if (error) return <div className="text-center py-8 text-red-500">{error}</div>;

    return (
        <div className="container mx-auto p-4 max-w-6xl">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Booking Management</h2>
            
            <div className="overflow-x-auto">
                <table className="min-w-full  rounded-lg overflow-hidden">
                    <thead >
                        <tr>
                            <th className="py-3 px-4 text-left">Booking ID</th>
                            <th className="py-3 px-4 text-left">User</th>
                            <th className="py-3 px-4 text-left">userID</th>
                            <th className="py-3 px-4 text-left">Room</th>
                            <th className="py-3 px-4 text-left">Check-In</th>
                            <th className="py-3 px-4 text-left">Check-Out</th>
                            <th className="py-3 px-4 text-left">Status</th>
                            <th className="py-3 px-4 text-left">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {bookings.map((booking) => (
                            <tr key={booking._id}>
                                <td className="py-3 px-4">{booking._id.substring(18)}...</td>
                                <td className="py-3 px-4">
                                    {userDetails[booking.userID]?.name || 'N/A'}
                                  
                                </td>
                                <td className="py-3 px-4">
                                 
                                      {booking.userID || 'N/A'}
                                  
                                </td>
                                <td className="py-3 px-4">
                                    {roomDetails[booking.roomID]?.roomType || 'N/A'}
                                  
                                </td>
                                <td className="py-3 px-4">
                                    {booking.checkInDate ? format(new Date(booking.checkInDate), 'MMM dd, yyyy') : 'N/A'}
                                </td>
                                <td className="py-3 px-4">
                                    {booking.checkOutDate ? format(new Date(booking.checkOutDate), 'MMM dd, yyyy') : 'N/A'}
                                </td>
                                <td className="py-3 px-4">
                                    <span className={`px-2 py-1 rounded-full text-xs ${
                                        booking.status === 'Approved' ? 'bg-green-100 text-green-800' :
                                        booking.status === 'Rejected' ? 'bg-red-100 text-red-800' :
                                        'bg-blue-700 text-white-800'
                                    }`}>
                                        {booking.status}
                                    </span>
                                </td>
                                <td className="py-3 px-4 space-x-2">
                                    {booking.status !== 'Approved' && (
                                        <button
                                            onClick={() => updateBookingStatus(booking._id, 'Approved')}
                                            className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-sm transition"
                                        >
                                            Approve
                                        </button>
                                    )}
                                    {booking.status !== 'Rejected' && (
                                        <button
                                            onClick={() => updateBookingStatus(booking._id, 'Rejected')}
                                            className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm transition"
                                        >
                                            Reject
                                        </button>
                                    )}
                                    {['Approved', 'Rejected'].includes(booking.status) && (
                                        <button
                                            onClick={() => updateBookingStatus(booking._id, 'Pending')}
                                            className="bg-gray-500 hover:bg-gray-600 text-white px-3 py-1 rounded text-sm transition"
                                        >
                                            Reset
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {bookings.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                    No bookings found
                </div>
            )}
        </div>
    );
};

export default BookingLists;