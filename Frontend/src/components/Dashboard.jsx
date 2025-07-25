// import { React,useState, useEffect } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import axios from "axios"
// const Dashboard = () => {
//   const backendUrl = import.meta.env.VITE_BACKEND_URL;
//   console.log("Hello, I am in dashboard")
//   const [customer, setCustomer] = useState(null);
//   const [bookings, setBookings] = useState([]);
//   const [activeTab, setActiveTab] = useState('overview');
//   const navigate = useNavigate();

//   useEffect(() => {
//     // Fetch customer data
//     const fetchCustomerData = async () => {
//       try {
//         const customerID = localStorage.getItem('customerID');
//         console.log("customerID", customerID)
//         if (!customerID) {
//           navigate('/login');
//           return;
//         }
// console.log("Mango Mango")
//         const response = await axios.get(`${backendUrl}/api/apple`,{
//           params:   {
//             customerID:customerID
//           }
         
//         });
//         console.log(response.data)
//        setCustomer(response.data);
//       } catch (error) {
//         console.error('Error fetching customer data:', error);
//       }
//     };

//     // // Fetch bookings
//     const fetchBookings = async () => {
//       try {
//         const customerID = localStorage.getItem('customerID');
//         const response = await axios.get(`${backendUrl}/api/bookings?customerID=${customerID}`);
//   console.log(response.data.info)
//         setBookings(response.data.info);
//       } catch (error) {
//         console.error('Error fetching bookings:', error);
//       }
//     };

//     fetchCustomerData();
//   fetchBookings();
//   },[]);

//   // const handleLogout = () => {
//   //   localStorage.removeItem('customerID');
//   //   localStorage.removeItem('token');
//   //   navigate('/login');
//   // };

//   const cancelBooking = async (bookingId) => {
//     try {
//       await axios.delete(`${backendUrl}/api/bookings/${bookingId}`);
//       setBookings(bookings.filter(booking => booking._id !== bookingId));
//     } catch (error) {
//       console.error('Error canceling booking:', error);
//     }
//   };

//   if (!customer) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div className="dashboard-container">
//       <header className="dashboard-header">
//         <h1>Welcome, {customer.name}!</h1>
//         {/* <button onClick={handleLogout} className="logout-btn">Logout</button> */}
//       </header>

//       <div className="dashboard-content">
//         <nav className="dashboard-sidebar">
//           <button 
//             className={`sidebar-btn ${activeTab === 'overview' ? 'active' : ''}`}
//             onClick={() => setActiveTab('overview')}
//           >
//             Overview
//           </button>
//           <button 
//             className={`sidebar-btn ${activeTab === 'bookings' ? 'active' : ''}`}
//             onClick={() => setActiveTab('bookings')}
//           >
//             My Bookings
//           </button>
//           <button 
//             className={`sidebar-btn ${activeTab === 'profile' ? 'active' : ''}`}
//             onClick={() => setActiveTab('profile')}
//           >
//             Profile Settings
//           </button>
//           <Link to="/rooms" className="sidebar-btn">
//             Book a Room
//           </Link>
//         </nav>

//         <main className="dashboard-main">
//           {activeTab === 'overview' && (
//             <div className="overview-section">
//               <div className="stats-cards">
//                 <div className="stat-card">
//                   <h3>Upcoming Stays</h3>
//                   <p>{bookings.filter(b => new Date(b.checkInDate) > new Date()).length}</p>
//                 </div>
//                 <div className="stat-card">
//                   <h3>Past Stays</h3>
//                   <p>{bookings.filter(b => new Date(b.checkOutDate) < new Date()).length}</p>
//                 </div>
//                 <div className="stat-card">
//                   <h3>Loyalty Points</h3>
//                   <p>{customer.loyaltyPoints || 0}</p>
//                 </div>
//               </div>

//               <div className="quick-actions">
//                 <h2>Quick Actions</h2>
//                 <div className="action-buttons">
//                   <Link to="/rooms" className="action-btn">Book a Room</Link>
//                   <button className="action-btn">Contact Support</button>
//                   <button className="action-btn">View Special Offers</button>
//                 </div>
//               </div>
//             </div>
//           )}

//           {activeTab === 'bookings' && (
//             <div className="bookings-section">
//               <h2>Your Bookings</h2>
//               {bookings.length === 0 ? (
//                 <p>You don't have any bookings yet. <Link to="/rooms">Book a room now!</Link></p>
//               ) : (
//                 <div className="bookings-list">
//                   {bookings.map(booking => (
//                     <div key={booking.id} className="booking-card">
//                       <div className="booking-info">
//                         <h3>{booking.roomType} Room</h3>
//                         <p><strong>Check-in:</strong> {new Date(booking.checkInDate).toLocaleDateString()}</p>
//                         <p><strong>Check-out:</strong> {new Date(booking.checkOutDate).toLocaleDateString()}</p>
//                         <p><strong>Status:</strong> <span className={`status-${booking.status.toLowerCase()}`}>{booking.status}</span></p>
//                         {/* <p><strong>Total:</strong> ${booking.price}</p> */}
//                       </div>
//                       <div className="booking-actions">
//                         {new Date(booking.checkInDate) > new Date() && (
//                           <button 
//                             onClick={() => cancelBooking(booking._id)}
//                             className="cancel-btn"
//                           >
//                             Cancel Booking
//                           </button>
//                         )}
//                         <button className="details-btn">View Details</button>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>
//           )}

//           {activeTab === 'profile' && (
//             <div className="profile-section">
//               <h2>Profile Settings</h2>
//               <form className="profile-form">
//                 <div className="form-group">
//                   <label>Full Name</label>
//                   <input type="text" defaultValue={customer.name} />
//                 </div>
//                 <div className="form-group">
//                   <label>Email</label>
//                   <input type="email" defaultValue={customer.email} />
//                 </div>
//                 <div className="form-group">
//                   <label>Phone Number</label>
//                   <input type="tel" defaultValue={customer.phone} />
//                 </div>
//                 <div className="form-group">
//                   <label>Password</label>
//                   <input type="password" placeholder="Enter new password" />
//                 </div>
//                 <button type="submit" className="save-btn">Save Changes</button>
//               </form>
//             </div>
//           )}
//         </main>
//       </div>
//     </div>
   
//   );
// };

// export default Dashboard





// import { React, useState, useEffect } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import axios from "axios";
// import { FiHome, FiCalendar, FiUser, FiLogOut, FiPlusCircle, FiHelpCircle, FiStar } from 'react-icons/fi';
// import { BsArrowRightShort, BsCheckCircle, BsXCircle } from 'react-icons/bs';
// import { FiEdit } from 'react-icons/fi';

// const Dashboard = () => {

//   const backendUrl = import.meta.env.VITE_BACKEND_URL;
//   const [customer, setCustomer] = useState(null);
//   const [bookings, setBookings] = useState([]);
//   const [activeTab, setActiveTab] = useState('overview');
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();
// const [isEditing, setIsEditing] = useState(false);
// const [human, setHuman]=useState("")
// // Initialize human state with customer data when it loads
// useEffect(() => {
//   if (customer) {
//     setHuman({
//       name: customer.name,
//       email: customer.email,
//       contact: customer.contact
//     });
//   }
// }, [customer]);
// // Add these functions
// const handleCancelEdit = () => {
//   setIsEditing(false);
//   // Reset form fields to original values
//   setHuman({
//     name: customer.name,
//     email: customer.email,
//     contact: customer.contact
//   });
// };

// const onChangeHandler = (e) => {
//   const { name, value } = e.target;
//   setHuman({ ...human, [name]: value });
// };
// const handleSaveChanges = async (e) => {
//   e.preventDefault();
  
//   try {
//     // const updatedData = {

// console.log("solo solo ")
//     const customerID = localStorage.getItem('customerID');
//     const response = await axios.put(`${backendUrl}/api/updateCustomer/${customerID}`, human);
//     console.log("molo", response.data.data)
//     setCustomer(response.data.data);
//     setHuman(response.data.data);
//     setIsEditing(false);
//     // Show success message
//     alert('Profile updated successfully!');
    
//   } catch (error) {
//     console.error('Error updating profile:', error);
//     alert('Failed to update profile. Please try again.');
//   }
// };


//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const customerID = localStorage.getItem('customerID');
//         if (!customerID) {
//           navigate('/login');
//           return;
//         }

//         // Fetch customer data
//         const customerResponse = await axios.get(`${backendUrl}/api/apple`, {
//           params: { customerID }
//         });
//         setCustomer(customerResponse.data);

//         // Fetch bookings
//         const bookingsResponse = await axios.get(`${backendUrl}/api/bookings?customerID=${customerID}`);
//         setBookings(bookingsResponse.data.info);
        
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [navigate, backendUrl]);

// const cancelBooking = async (bookingId) => {
//   try {
//     const response = await axios.delete(`${backendUrl}/api/bookings/${bookingId}`);
    
//     if (response.data.success) {

//       setBookings(prevBookings => 
//         prevBookings.filter(booking => booking._id !== bookingId)
//       );
      
//       // Optional: Show success notification
//       alert('Booking canceled successfully!');
//     } else {
//       throw new Error(response.data.message || 'Failed to cancel booking');
//     }
//   } catch (error) {
//     console.error('Error canceling booking:', error);
//     // Show error to user
//     alert(error.message || 'Error canceling booking. Please try again.');
//   }
// };
//   if (loading) {
//     return (
//       <div className="flex items-center justify-center min-h-screen">
//         <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
//       </div>
//     );
//   }

//   if (!customer) {
//     return (
//       <div className="flex items-center justify-center min-h-screen">
//         <div className="text-center">
//           <p className="text-lg text-gray-700">Unable to load customer data</p>
//           <button 
//             onClick={() => navigate('/login')}
//             className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
//           >
//             Return to Login
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen">
//       {/* Header */}
//       <header className="shadow-sm">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
//           <h1 className="text-2xl font-bold text-gray-800">Welcome back, <span className="text-blue-600">{customer.name.split(' ')[0]}</span>!</h1>
//           <div className="flex items-center space-x-4">
//             <div className="flex items-center">
//               <FiStar className="mr-1" />
//               <span className="font-medium">{customer.loyaltyPoints || 0} points</span>
//             </div>
//             <button 
//               onClick={() => {
//                 localStorage.removeItem('customerID');
//                 localStorage.removeItem('token');
//                 navigate('/login');
//               }}
//               className="flex items-center text-gray-600 hover:text-gray-900"
//             >
//               <FiLogOut className="mr-1" /> Logout
//             </button>
//           </div>
//         </div>
//       </header>

//       {/* Main Content */}
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         <div className="flex flex-col md:flex-row gap-8">
//           {/* Sidebar */}
//           <nav className="w-full md:w-64 flex-shrink-0">
//             <div className=" rounded-lg shadow-sm p-4 space-y-2">
//               <button 
//                 className={`w-full flex items-center px-4 py-3 rounded-lg transition ${activeTab === 'overview' ? 'bg-blue-50 text-blue-600 font-medium' : 'text-gray-700 '}`}
//                 onClick={() => setActiveTab('overview')}
//               >
//                 <FiHome className="mr-3" /> Overview
//               </button>
//               <button 
//                 className={`w-full flex items-center px-4 py-3 rounded-lg transition ${activeTab === 'bookings' ? 'bg-blue-50 text-blue-600 font-medium' : 'text-gray-700'}`}
//                 onClick={() => setActiveTab('bookings')}
//               >
//                 <FiCalendar className="mr-3" /> My Bookings
//               </button>
//               <button 
//                 className={`w-full flex items-center px-4 py-3 rounded-lg transition ${activeTab === 'profile' ? 'bg-blue-50 text-blue-600 font-medium' : 'text-gray-700 hover:bg-gray-100'}`}
//                 onClick={() => setActiveTab('profile')}
//               >
//                 <FiUser className="mr-3" /> Profile Settings
//               </button>
//               <Link 
//                 to="/rooms" 
//                 className="w-full flex items-center px-4 py-3 rounded-lg transition bg-blue-600 text-white hover:bg-blue-700 font-medium"
//               >
//                 <FiPlusCircle className="mr-3" /> Book a Room
//               </Link>
//             </div>

//             {/* Help Card */}
//             <div className="mt-6 rounded-lg shadow-sm p-4">
//               <div className="flex items-start">
//                 <div className="p-2 bg-blue-100 rounded-full text-blue-600">
//                   <FiHelpCircle size={20} />
//                 </div>
//                 <div className="ml-3">
//                   <h3 className="font-medium text-gray-800">Need help?</h3>
//                   <p className="text-sm text-gray-600 mt-1">Our support team is available 24/7</p>
//                   <button className="mt-2 text-sm text-blue-600 hover:text-blue-800 font-medium">
//                     Contact us
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </nav>

//           {/* Main Panel */}
//           <main className="flex-1">
//             {activeTab === 'overview' && (
//               <div className="space-y-6">
//                 {/* Stats Cards */}
//                 <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                   <div className=" p-6 rounded-lg shadow-sm border-l-4 border-blue-500">
//                     <h3 className="text-gray-500 text-sm font-medium">Upcoming Stays</h3>
//                     <p className="text-3xl font-bold mt-1 text-gray-800">
//                       {bookings.filter(b => new Date(b.checkInDate) > new Date()).length}
//                     </p>
//                   </div>
//                   <div className=" p-6 rounded-lg shadow-sm border-l-4 border-green-500">
//                     <h3 className="text-gray-500 text-sm font-medium">Past Stays</h3>
//                     <p className="text-3xl font-bold mt-1 text-gray-800">
//                       {bookings.filter(b => new Date(b.checkOutDate) < new Date()).length}
//                     </p>
//                   </div>
//                   <div className=" p-6 rounded-lg shadow-sm border-l-4 border-yellow-500">
//                     <h3 className="text-gray-500 text-sm font-medium">Loyalty Points</h3>
//                     <p className="text-3xl font-bold mt-1 text-gray-800">
//                       {customer.loyaltyPoints || 0}
//                     </p>
//                   </div>
//                 </div>

//                 {/* Quick Actions */}
//                 <div className="p-6 rounded-lg shadow-sm">
//                   <h2 className="text-xl font-bold text-gray-800 mb-4">Quick Actions</h2>
//                   <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                     <Link 
//                       to="/rooms" 
//                       className="hover:bg-blue-100 p-4 rounded-lg transition flex flex-col items-center text-center"
//                     >
//                       <FiPlusCircle className="text-blue-600 mb-2" size={24} />
//                       <span className="font-medium text-gray-800">Book a Room</span>
//                       <p className="text-sm text-gray-600 mt-1">Find your perfect stay</p>
//                     </Link>
//                     <button className=" hover:bg-gray-100 p-4 rounded-lg transition flex flex-col items-center text-center">
//                       <FiHelpCircle className="text-gray-600 mb-2" size={24} />
//                       <span className="font-medium text-gray-800">Contact Support</span>
//                       <p className="text-sm text-gray-600 mt-1">We're here to help</p>
//                     </button>
//                     <button className=" hover:bg-purple-100 p-4 rounded-lg transition flex flex-col items-center text-center">
//                       <FiStar className="text-purple-600 mb-2" size={24} />
//                       <span className="font-medium text-gray-800">Special Offers</span>
//                       <p className="text-sm text-gray-600 mt-1">Exclusive deals for you</p>
//                     </button>
//                   </div>
//                 </div>

//                 {/* Upcoming Bookings Preview */}
//                 {bookings.filter(b => new Date(b.checkInDate) > new Date()).length > 0 && (
//                   <div className="p-6 rounded-lg shadow-sm">
//                     <div className="flex justify-between items-center mb-4">
//                       <h2 className="text-xl font-bold text-gray-800">Upcoming Stays</h2>
//                       <button 
//                         onClick={() => setActiveTab('bookings')}
//                         className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center"
//                       >
//                         View all <BsArrowRightShort size={18} />
//                       </button>
//                     </div>
//                     <div className="space-y-4">
//                       {bookings
//                         .filter(b => new Date(b.checkInDate) > new Date())
//                         .slice(0, 2)
//                         .map(booking => (
//                           <div key={booking.id} className="border rounded-lg p-4 hover:shadow-md transition">
//                             <div className="flex justify-between">
//                               <div>
//                                 <h3 className="font-medium text-gray-800">{booking.roomType} Room</h3>
//                                 <div className="flex items-center text-sm text-gray-600 mt-1">
//                                   <span>{new Date(booking.checkInDate).toLocaleDateString()}</span>
//                                   <BsArrowRightShort className="mx-1" />
//                                   <span>{new Date(booking.checkOutDate).toLocaleDateString()}</span>
//                                 </div>
//                               </div>
//                               <span className={`px-2 py-1 text-xs rounded-full ${
//                                 booking.status === 'Confirmed' 
//                                   ? 'bg-green-100 text-green-800' 
//                                   : 'bg-blue-800 text-blue-800'
//                               }`}>
//                                 {booking.status}
//                               </span>
//                             </div>
//                           </div>
//                         ))}
//                     </div>
//                   </div>
//                 )}
//               </div>
//             )}

//             {activeTab === 'bookings' && (
//               <div className="rounded-lg shadow-sm overflow-hidden">
//                 <div className="p-6 border-b">
//                   <h2 className="text-xl font-bold text-gray-800">Your Bookings</h2>
//                 </div>
//                 {bookings.length === 0 ? (
//                   <div className="p-6 text-center">
//                     <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
//                       <FiCalendar className="text-gray-400" size={32} />
//                     </div>
//                     <h3 className="text-lg font-medium text-gray-800">No bookings yet</h3>
//                     <p className="text-gray-600 mt-1">You don't have any bookings yet</p>
//                     <Link 
//                       to="/rooms" 
//                       className="mt-4 inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
//                     >
//                       <FiPlusCircle className="mr-2" /> Book a room now
//                     </Link>
//                   </div>
//                 ) : (
//                   <div className="divide-y">
//                     {bookings.map(booking => (
//                       <div key={booking.id} className="p-6  transition">
//                         <div className="flex flex-col md:flex-row md:items-center md:justify-between">
//                           <div className="mb-4 md:mb-0">
//                             <div className="flex items-center">
//                               <h3 className="font-medium text-gray-800 mr-3">{booking.roomType} Room</h3>
//                               <span className={`px-2 py-1 text-xs rounded-full ${
//                                 booking.status === 'Confirmed' 
//                                   ? 'bg-green-100 text-green-800' 
//                                   : 'bg-blue-800 text-blue-800'
//                               }`}>
//                                 {booking.status}
//                               </span>
//                             </div>
//                             <div className="flex items-center text-sm text-gray-600 mt-1">
//                               <span>{new Date(booking.checkInDate).toLocaleDateString()}</span>
//                               <BsArrowRightShort className="mx-1" />
//                               <span>{new Date(booking.checkOutDate).toLocaleDateString()}</span>
//                             </div>
//                             {/* <p className="text-sm text-gray-600 mt-1">Total: ${booking.price}</p> */}
//                           </div>
//                           <div className="flex space-x-2">
//                             {new Date(booking.checkInDate) > new Date() && (
//                               <button 
//                                 onClick={() => cancelBooking(booking._id)}
//                                 className="flex items-center px-3 py-2 text-red-600 rounded-md hover:bg-red-100 transition text-sm"
//                               >
//                                 <BsXCircle className="mr-1" /> Cancel
//                               </button>
//                             )}
//                             <button className="flex items-center px-3 py-2 text-gray-700 rounded-md  transition text-sm">
//                               View Details
//                             </button>
//                           </div>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 )}
//               </div>
//             )}


// {activeTab === 'profile' && (
//   <div className="rounded-lg shadow-sm overflow-hidden">
//     <div className="p-6 border-b">
//       <h2 className="text-xl font-bold text-gray-800">Profile Settings</h2>
//     </div>
//     <div className="p-6">
//       <form className="space-y-4">
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
//             <input 
//               type="text" 
//               value={human.name} 
//               disabled={!isEditing}
//               onChange={onChangeHandler}
//              name="name"
//               className={`w-full px-3 py-2 border ${isEditing ? 'border-gray-300' : 'border-gray-200'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
//             <input 
//               type="email" 
//               onChange={onChangeHandler}
//               value={human.email} 
//               disabled={!isEditing}
//               name="email"
//               className={`w-full px-3 py-2 border ${isEditing ? 'border-gray-300' : 'border-gray-200'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
//             <input 
//               type="tel" 
//               value={human.contact} 
//               disabled={!isEditing}
//               onChange={onChangeHandler}
//             name="contact"
//               className={`w-full px-3 py-2 border ${isEditing ? 'border-gray-300' : 'border-gray-200'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
//             />
//           </div>

//         </div>
//         <div className="pt-4 flex justify-end space-x-3">
//           {!isEditing ? (
//             <button 
//               type="button"
//               onClick={() => setIsEditing(true)}
//               className="px-4 py-2  text-gray-800 rounded-md transition font-medium flex items-center"
//             >
//               <FiEdit className="mr-2" /> Edit Profile
//             </button>
//           ) : (
//             <>
//               <button 
//                 type="button"
//                 onClick={handleCancelEdit}
//                 className="px-4 py-2  text-gray-800 rounded-md  transition font-medium"
//               >
//                 Cancel
//               </button>
//               <button 
//                 type="submit" 
//                 onClick={handleSaveChanges}
//                 className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition font-medium flex items-center"
//               >
//                 <BsCheckCircle className="mr-2" /> Save Changes
//               </button>
//             </>
//           )}
//         </div>
//       </form>
//     </div>
//   </div>
// )}

//           </main>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;













//==============================================



import { React, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import { FiHome, FiCalendar, FiUser, FiLogOut, FiPlusCircle, FiHelpCircle, FiStar } from 'react-icons/fi';
import { BsArrowRightShort, BsCheckCircle, BsXCircle } from 'react-icons/bs';
import { FiEdit } from 'react-icons/fi';

const Dashboard = () => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [customer, setCustomer] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [activeTab, setActiveTab] = useState('overview');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [human, setHuman] = useState("");

  useEffect(() => {
    if (customer) {
      setHuman({
        name: customer.name,
        email: customer.email,
        contact: customer.contact
      });
    }
  }, [customer]);

  const handleCancelEdit = () => {
    setIsEditing(false);
    setHuman({
      name: customer.name,
      email: customer.email,
      contact: customer.contact
    });
  };

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setHuman({ ...human, [name]: value });
  };

  const handleSaveChanges = async (e) => {
    e.preventDefault();
    try {
      const token=localStorage.getItem("token")
      console.log("handleSaveChanges", token);
      const customerID = localStorage.getItem('customerID');

      // const response = await axios.put(`${backendUrl}/api/updateCustomer/${customerID}`, 
        
      //   {
      //     headers: {
      //         'Authorization': `Bearer ${token}`
      //       }
      // },
        
      //   human);



      const response = await axios.put(`${backendUrl}/api/updateCustomer/${customerID}`, 
  human, 
  {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  }
);

      setCustomer(response.data.data);
      setHuman(response.data.data);
      setIsEditing(false);
      alert('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile. Please try again.');
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
      const token=localStorage.getItem("token")
        const customerID = localStorage.getItem('customerID');
        if (!customerID) {
          navigate('/login');
          return;
        }

        const customerResponse = await axios.get(`${backendUrl}/api/apple`, {
          headers: {
            'Authorization': `Bearer ${token}`
          },
          params: { customerID }
        });
        setCustomer(customerResponse.data);

        const bookingsResponse = await axios.get(`${backendUrl}/api/bookings?customerID=${customerID}`);
        setBookings(bookingsResponse.data.info);
        
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [navigate, backendUrl]);

  const cancelBooking = async (bookingId) => {
    try {
      const token=localStorage.getItem("token")
      const response = await axios.delete(`${backendUrl}/api/bookings/${bookingId}`,
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );
      
      if (response.data.success) {
        setBookings(prevBookings => 
          prevBookings.filter(booking => booking._id !== bookingId)
        );
        alert('Booking canceled successfully!');
      } else {
        throw new Error(response.data.message || 'Failed to cancel booking');
      }
    } catch (error) {
      console.error('Error canceling booking:', error);
      alert(error.message || 'Error canceling booking. Please try again.');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!customer) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-lg text-gray-700">Unable to load customer data</p>
          <button 
            onClick={() => navigate('/login')}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition transform hover:scale-105"
          >
            Return to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">Welcome back, <span className="text-blue-600">{customer.name.split(' ')[0]}</span>!</h1>
          <div className="flex items-center space-x-4">
            <div className="flex items-center  px-3 py-1 rounded-full">
              <FiStar className="mr-1 text-yellow-500" />
              <span className="font-medium text-gray-700">{customer.loyaltyPoints || 0} points</span>
            </div>
            <button 
              onClick={() => {
                localStorage.removeItem('customerID');
                localStorage.removeItem('token');
                navigate('/login');
              }}
              className="flex items-center text-gray-600 hover:text-gray-900 transition-colors duration-200"
            >
              <FiLogOut className="mr-1" /> Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <nav className="w-full md:w-64 flex-shrink-0 ">
            <div className="rounded-lg shadow-sm p-4 space-y-2 border border-gray-200 bg-[#1e293b]">
              <button 
                className={`w-full flex items-center px-4 py-3 rounded-lg transition-all duration-200 ${activeTab === 'overview' ? 'text-blue-600 font-medium' : 'text-gray-700  hover:text-gray-900'}`}
                onClick={() => setActiveTab('overview')}
              >
                <FiHome className="mr-3 " /> Overview
              </button>
              <button 
                className={`w-full flex items-center px-4 py-3 rounded-lg  ${activeTab === 'bookings' ? ' text-blue-600 font-medium' : 'text-gray-700'}`}
                onClick={() => setActiveTab('bookings')}
              >
                <FiCalendar className="mr-3" /> My Bookings
              </button>
              <button 
                className={`w-full flex items-center px-4 py-3 rounded-lg transition-all duration-200 ${activeTab === 'profile' ? ' text-blue-600 font-medium' : 'text-gray-700  hover:text-gray-900'}`}
                onClick={() => setActiveTab('profile')}
              >
                <FiUser className="mr-3" /> Profile Settings
              </button>
              <Link 
                to="/rooms" 
                className="w-full flex items-center px-4 py-3 rounded-lg transition-all duration-200 bg-gradient-to-r from-blue-600 to-blue-500 text-white hover:from-blue-700 hover:to-blue-600 font-medium shadow-md hover:shadow-lg"
              >
                <FiPlusCircle className="mr-3" /> Book a Room
              </Link>
            </div>

            {/* Help Card */}
            <div className="bg-[#1e293b] mt-6 rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow duration-200 border border-gray-200">
              <div className="flex items-start">
                <div className="p-2 bg-blue-400 rounded-full text-blue-600">
                  <FiHelpCircle size={20} />
                </div>
                <div className="ml-3 ">
                  <h3 className="font-medium">Need help?</h3>
                  <p className="text-sm text-gray-600 mt-1">Our support team is available 24/7</p>
                  <button className="mt-2 text-sm text-blue-600 hover:text-blue-800 font-medium transition-colors duration-200">
                    Contact us
                  </button>
                </div>
              </div>
            </div>
          </nav>

          {/* Main Panel */}
          <main className="flex-1">
            {activeTab === 'overview' && (
              <div className="space-y-6">
                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-6 rounded-lg shadow-sm border-l-4 border-blue-500 hover:shadow-md border border-gray-200">
                    <h3 className="text-gray-500 text-sm font-medium">Upcoming Stays</h3>
                    <p className="text-3xl font-bold mt-1 text-gray-800">
                      {bookings.filter(b => new Date(b.checkInDate) > new Date()).length}
                    </p>
                  </div>
                  <div className=" p-6 rounded-lg shadow-sm border-l-4 border-green-500 hover:shadow-md  border border-gray-200">
                    <h3 className="text-gray-500 text-sm font-medium">Past Stays</h3>
                    <p className="text-3xl font-bold mt-1 text-gray-800">
                      {bookings.filter(b => new Date(b.checkOutDate) < new Date()).length}
                    </p>
                  </div>
                  <div className="p-6 rounded-lg shadow-sm border-l-4 border-yellow-500 hover:shadow-md  border border-gray-200">
                    <h3 className="text-gray-500 text-sm font-medium">Loyalty Points</h3>
                    <p className="text-3xl font-bold mt-1 text-gray-800">
                      {customer.loyaltyPoints || 0}
                    </p>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className=" bg-[#1e293b] p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 border border-gray-200">
                  <h2 className="text-xl font-bold text-gray-800 mb-4">Quick Actions</h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Link 
                      to="/rooms" 
                      className=" p-4 rounded-lg transition-all duration-200 flex flex-col items-center text-center border border-gray-200 hover:border-blue-200"
                    >
                      <div className="p-3 bg-blue-400 rounded-full mb-2">
                        <FiPlusCircle className="text-blue-600" size={20} />
                      </div>
                      <span className="font-medium text-gray-800">Book a Room</span>
                      <p className="text-sm text-gray-600 mt-1">Find your perfect stay</p>
                    </Link>
                    <button className="p-4 rounded-lg transition-all duration-200 flex flex-col items-center text-center border border-gray-200 hover:border-gray-300">
                      <div className="p-3  rounded-full mb-2">
                        <FiHelpCircle className="text-gray-600" size={20} />
                      </div>
                      <span className="font-medium text-gray-800">Contact Support</span>
                      <p className="text-sm text-gray-600 mt-1">We're here to help</p>
                    </button>
                    <button className=" p-4 rounded-lg transition-all duration-200 flex flex-col items-center text-center border border-gray-200 ">
                      <div className="p-3 bg-purple-400 rounded-full mb-2 ">
                        <FiStar className="text-purple-600" size={20} />
                      </div>
                      <span className="font-medium text-gray-800">Special Offers</span>
                      <p className="text-sm text-gray-600 mt-1">Exclusive deals for you</p>
                    </button>
                  </div>
                </div>

                {/* Upcoming Bookings Preview */}
                {bookings.filter(b => new Date(b.checkInDate) > new Date()).length > 0 && (
                  <div className=" p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 border border-gray-200">
                    <div className="flex justify-between items-center mb-4">
                      <h2 className="text-xl font-bold text-gray-800">Upcoming Stays</h2>
                      <button 
                        onClick={() => setActiveTab('bookings')}
                        className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center transition-colors duration-200"
                      >
                        View all <BsArrowRightShort size={18} />
                      </button>
                    </div>
                    <div className="space-y-4">
                      {bookings
                        .filter(b => new Date(b.checkInDate) > new Date())
                        .slice(0, 2)
                        .map(booking => (
                          <div key={booking.id} className="border rounded-lg p-4 hover:shadow-md transition-all duration-200 border-gray-200">
                            <div className="flex justify-between">
                              <div>
                                <h3 className="font-medium text-gray-800">{booking.roomType} Room</h3>
                                <div className="flex items-center text-sm text-gray-600 mt-1">
                                  <span>{new Date(booking.checkInDate).toLocaleDateString()}</span>
                                  <BsArrowRightShort className="mx-1" />
                                  <span>{new Date(booking.checkOutDate).toLocaleDateString()}</span>
                                </div>
                              </div>
                              <span className={`px-2 py-1 text-xs rounded-full mt-5 ${
                                booking.status === 'Approved' 
                                  ? 'bg-green-400 text-green-800 ' 
                                  : 'bg-yellow-400 text-blue-800'
                              }`}>
                                {booking.status}
                              </span>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'bookings' && (
              <div className="rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-200 border border-gray-200">
                <div className="p-6 border-b border-gray-200">
                  <h2 className="text-xl font-bold text-gray-800">Your Bookings</h2>
                </div>
                {bookings.length === 0 ? (
                  <div className="p-6 text-center">
                    <div className="mx-auto w-24 h-24 rounded-full flex items-center justify-center mb-4">
                      <FiCalendar className="text-gray-400" size={32} />
                    </div>
                    <h3 className="text-lg font-medium text-gray-800">No bookings yet</h3>
                    <p className="text-gray-600 mt-1">You don't have any bookings yet</p>
                    <Link 
                      to="/rooms" 
                      className="mt-4 inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition transform hover:scale-105"
                    >
                      <FiPlusCircle className="mr-2" /> Book a room now
                    </Link>
                  </div>
                ) : (
                  <div className="divide-y divide-gray-200">
                    {bookings.map(booking => (
                      <div key={booking.id} className="p-6   transition-colors duration-200">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                          <div className="mb-4 md:mb-0">
                            <div className="flex items-center">
                              <h3 className="font-medium text-gray-800 mr-3">{booking.roomType} Room</h3>
                              <span className={`px-2 py-1 text-xs rounded-full ${
                                booking.status === 'Approved' 
                                  ? 'bg-green-500 text-green-800' 
                                  : 'bg-yellow-500'
                              }`}>
                                {booking.status}
                              </span>
                            </div>
                            <div className="flex items-center text-sm text-gray-600 mt-1">
                              <span>{new Date(booking.checkInDate).toLocaleDateString()}</span>
                              <BsArrowRightShort className="mx-1" />
                              <span>{new Date(booking.checkOutDate).toLocaleDateString()}</span>
                            </div>
                          </div>
                          <div className="flex space-x-2">
                            {new Date(booking.checkInDate) > new Date() && (
                              <button 
                                onClick={() => cancelBooking(booking._id)}
                                // className="flex items-center px-3 py-2 text-red-600 rounded-md hover:bg-red-50 transition-all duration-200 text-sm border border-red-100 hover:border-red-200"
                                                 className="flex items-center px-3 py-2 text-red-600 rounded-md transition-all duration-200 text-sm border border-red-100 "
                              >
                                <BsXCircle className="mr-1" /> Cancel
                              </button>
                            )}
 <button
//  className="flex items-center px-3 py-2 text-gray-700 rounded-md hover:bg-gray-200 transition-all duration-200 text-sm border border-gray-200 hover:border-gray-300"
 className="flex items-center px-3 py-2 text-gray-700 rounded-md transition-all duration-200 text-sm border border-gray-200"
 >
                              View Details
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'profile' && (
              <div className="rounded-lg shadow-sm overflow-hidden   border border-gray-200">
                <div className="p-6 border-b border-gray-200">
                  <h2 className="text-xl font-bold text-gray-800">Profile Settings</h2>
                </div>
                <div className="p-6">
                  <form className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                        <input 
                          type="text" 
                          value={human.name} 
                          disabled={!isEditing}
                          onChange={onChangeHandler}
                          name="name"
                          className={`w-full px-3 py-2 border ${isEditing ? 'border-gray-300 focus:ring-2 focus:ring-blue-500' : 'border-gray-200'} rounded-md focus:outline-none focus:border-blue-500 transition-all duration-200`}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <input 
                          type="email" 
                          onChange={onChangeHandler}
                          value={human.email} 
                          disabled={!isEditing}
                          name="email"
                          className={`w-full px-3 py-2 border ${isEditing ? 'border-gray-300 focus:ring-2 focus:ring-blue-500 ' : 'border-gray-200'} rounded-md focus:outline-none focus:border-blue-500 transition-all duration-200`}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                        <input 
                          type="tel" 
                          value={human.contact} 
                          disabled={!isEditing}
                          onChange={onChangeHandler}
                          name="contact"
                          className={`w-full px-3 py-2 border ${isEditing ? 'border-gray-300 focus:ring-2 focus:ring-blue-500 ' : 'border-gray-200'} rounded-md focus:outline-none focus:border-blue-500 transition-all duration-200`}
                        />
                      </div>
                    </div>
                    <div className="pt-4 flex justify-end space-x-3">
                      {!isEditing ? (
                        <button 
                          type="button"
                          onClick={() => setIsEditing(true)}
                          // className="px-4 py-2  text-gray-800 rounded-md border border-gray-200 hover:bg-gray-200 transition-all duration-200 font-medium flex items-center hover:shadow-sm"
                                               className="px-4 py-2  text-gray-800 rounded-md border border-gray-200  transition-all duration-200 font-medium flex items-center"
                        >
                          <FiEdit className="mr-2" /> Edit Profile
                        </button>
                      ) : (
                        <>
                          <button 
                            type="button"
                            onClick={handleCancelEdit}
                            // className="px-4 py-2 text-gray-800 rounded-md hover:bg-gray-200 transition-all duration-200 font-medium border border-gray-200"
                             className="px-4 py-2 text-gray-800 rounded-md  transition-all duration-200 font-medium border border-gray-200"
                          >
                            Cancel
                          </button>
                          <button 
                            type="submit" 
                            onClick={handleSaveChanges}
                            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-all duration-200 font-medium flex items-center shadow-md hover:shadow-lg"
                          >
                            <BsCheckCircle className="mr-2" /> Save Changes
                          </button>
                        </>
                      )}
                    </div>
                  </form>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;