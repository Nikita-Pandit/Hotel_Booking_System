// import React from 'react'

// const Home = () => {
//   return (
//     <div>
//  <div className='flex flex-col items-center justify-center h-screen'>
//       <h1 className='text-4xl font-bold text-gray-800'>Welcome to Hotel Booking System</h1>
//       <p className='text-lg text-gray-600 mt-4'>Book rooms easily and manage reservations seamlessly.</p>
//     </div> 
//     </div>
//   )
// }

// export default Home


// import React from 'react'

// const Home = () => {
//   return (
//     <div className="">
//       <div className='flex flex-col items-center justify-center h-screen px-4 text-center'>
//         <h1 className='text-4xl md:text-5xl font-bold text-gray-800 mb-6'>
//           Welcome to LuxeStay Hotel Management System
//         </h1>
        
//         <p className='text-lg md:text-xl text-gray-600 max-w-3xl mb-8'>
//           Streamline your hotel operations with our comprehensive management solution. 
//           From reservations to check-out, we provide all the tools you need to deliver 
//           exceptional guest experiences.
//         </p>
        
//         <div className="grid md:grid-cols-3 gap-8 mt-8">
//           <div className=" p-6 rounded-lg shadow-md">
//             <h3 className="text-xl font-semibold text-blue-600 mb-3">Easy Reservations</h3>
//             <p className="text-gray-600">
//               Manage bookings in real-time with our intuitive interface. 
//               Handle online, phone, and walk-in reservations seamlessly.
//             </p>
//           </div>
          
//           <div className="p-6 rounded-lg shadow-md">
//             <h3 className="text-xl font-semibold text-blue-600 mb-3">Room Management</h3>
//             <p className="text-gray-600">
//               Track room status, housekeeping, and maintenance all in one place. 
//               Optimize your room inventory effortlessly.
//             </p>
//           </div>
          
//           <div className="p-6 rounded-lg shadow-md">
//             <h3 className="text-xl font-semibold text-blue-600 mb-3">Guest Services</h3>
//             <p className="text-gray-600">
//               Enhance guest satisfaction with personalized services, 
//               special requests handling, and loyalty program integration.
//             </p>
//           </div>
//         </div>
        
//         <button className="mt-12 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition duration-300">
//           Explore Features
//         </button>
//       </div>
//     </div>
//   )
// }

// export default Home;






// import React from 'react'
// import {useNavigate} from "react-router-dom"
// const Home = () => {
//   const navigate=useNavigate()
//   return (
//     <div className="min-h-screen">
//       <div className='container mx-auto px-4 py-16'>
//         {/* Hero Section */}
//         <div className='flex flex-col items-center justify-center text-center py-20'>
//           <h1 className='text-4xl md:text-5xl font-bold text-gray-800 mb-6'>
//             Welcome to LuxeStay Grand Horizon
//           </h1>
          
//           <p className='text-lg md:text-xl text-gray-600 max-w-3xl mb-8'>
//             Streamline your hotel operations with our comprehensive management solution. 
//             From reservations to check-out, we provide all the tools you need to deliver 
//             exceptional guest experiences.
//           </p>
          
//           <button className="mt-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition duration-300"
//           onClick={()=>navigate("/Login")}
//           >
//             Get Started
//           </button>
//         </div>

//         {/* Features Section */}
//         <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 my-12">
//           {/* Original Features */}
//           <div className="p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
//             <div className="text-blue-600 mb-4 text-3xl">📅</div>
//             <h3 className="text-xl font-semibold text-gray-800 mb-3">Easy Reservations</h3>
//             <p className="text-gray-600">
//               Manage bookings in real-time with our intuitive interface. 
//               Handle online, phone, and walk-in reservations seamlessly.
//             </p>
//           </div>
          
//           <div className=" p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
//             <div className="text-blue-600 mb-4 text-3xl">🛏️</div>
//             <h3 className="text-xl font-semibold text-gray-800 mb-3">Room Management</h3>
//             <p className="text-gray-600">
//               Track room status, housekeeping, and maintenance all in one place. 
//               Optimize your room inventory effortlessly.
//             </p>
//           </div>
          
//           <div className="p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
//             <div className="text-blue-600 mb-4 text-3xl">🌟</div>
//             <h3 className="text-xl font-semibold text-gray-800 mb-3">Guest Services</h3>
//             <p className="text-gray-600">
//               Enhance guest satisfaction with personalized services, 
//               special requests handling, and loyalty program integration.
//             </p>
//           </div>

//           {/* New Additional Features */}
//           <div className="p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
//             <div className="text-blue-600 mb-4 text-3xl">💵</div>
//             <h3 className="text-xl font-semibold text-gray-800 mb-3">Billing & Invoicing</h3>
//             <p className="text-gray-600">
//               Automated billing system with multiple payment options. 
//               Generate detailed invoices and track payments in real-time.
//             </p>
//           </div>
          
//           <div className=" p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
//             <div className="text-blue-600 mb-4 text-3xl">📊</div>
//             <h3 className="text-xl font-semibold text-gray-800 mb-3">Analytics Dashboard</h3>
//             <p className="text-gray-600">
//               Powerful reporting tools with visual dashboards to track occupancy rates, 
//               revenue, and guest preferences.
//             </p>
//           </div>
          
//           <div className="p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
//             <div className="text-blue-600 mb-4 text-3xl">📱</div>
//             <h3 className="text-xl font-semibold text-gray-800 mb-3">Mobile Management</h3>
//             <p className="text-gray-600">
//               Manage your hotel on-the-go with our mobile app. 
//               Receive alerts and handle requests from anywhere.
//             </p>
//           </div>
//         </div>

//         {/* Additional Sections */}
//         <div className="my-20 grid md:grid-cols-2 gap-12 items-center">
//           <div>
//             <h2 className="text-3xl font-bold text-gray-800 mb-6">Integrated Channel Manager</h2>
//             <p className="text-gray-600 mb-6">
//               Sync your inventory across all booking channels (OTA, GDS, direct) in real-time 
//               to prevent overbooking and maximize revenue.
//             </p>
//             <ul className="space-y-3">
//               <li className="flex items-center"><span className="text-blue-500 mr-2">✓</span> Automatic rate updates</li>
//               <li className="flex items-center"><span className="text-blue-500 mr-2">✓</span> Centralized availability control</li>
//               <li className="flex items-center"><span className="text-blue-500 mr-2">✓</span> Multi-property support</li>
//             </ul>
//           </div>
//           <div className="h-64 rounded-xl flex items-center justify-center">
//             <span className="text-gray-400">Channel Manager Visualization</span>
//           </div>
//         </div>

//         <div className="bg-blue-600 rounded-xl p-12 text-center text-white my-20">
//           <h2 className="text-3xl font-bold mb-6">Ready to Transform Your Hotel Operations?</h2>
//           <p className="text-xl mb-8 max-w-2xl mx-auto">
//             Join hundreds of hotels that trust our system to deliver exceptional guest experiences while boosting efficiency.
//           </p>
//           <button className="text-blue-600 font-semibold py-3 px-8 rounded-lg transition duration-300">
//             Request a Demo
//           </button>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default Home;





      import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#0f172a] text-white">
      <div className="container mx-auto px-4 py-16">

        {/* Hero Section */}
        <div className="flex flex-col items-center justify-center text-center py-20">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Welcome to LuxeStay Grand Horizon
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mb-8">
            Streamline your hotel operations with our comprehensive management solution.
            From reservations to check-out, we provide all the tools you need to deliver
            exceptional guest experiences.
          </p>
          <button
            onClick={() => navigate('/Login')}
            className="mt-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition duration-300"
          >
            Get Started
          </button>
        </div>

        {/* Features Section */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 my-12">
          {[
            {
              icon: '📅',
              title: 'Easy Reservations',
              desc:
                'Manage bookings in real-time with our intuitive interface. Handle online, phone, and walk-in reservations seamlessly.',
            },
            {
              icon: '🛏️',
              title: 'Room Management',
              desc:
                'Track room status, housekeeping, and maintenance all in one place. Optimize your room inventory effortlessly.',
            },
            {
              icon: '🌟',
              title: 'Guest Services',
              desc:
                'Enhance guest satisfaction with personalized services, special requests handling, and loyalty program integration.',
            },
            {
              icon: '💵',
              title: 'Billing & Invoicing',
              desc:
                'Automated billing system with multiple payment options. Generate detailed invoices and track payments in real-time.',
            },
            {
              icon: '📊',
              title: 'Analytics Dashboard',
              desc:
                'Powerful reporting tools with visual dashboards to track occupancy rates, revenue, and guest preferences.',
            },
            {
              icon: '📱',
              title: 'Mobile Management',
              desc:
                'Manage your hotel on-the-go with our mobile app. Receive alerts and handle requests from anywhere.',
            },
          ].map((feature, index) => (
            <div
              key={index}
              className="p-6  bg-[#1e293b]  cursor-pointer  hover:bg-[#2d3748] transition-all duration-300 rounded-xl shadow-md"
            >
              <div className="text-3xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-gray-300 text-sm">{feature.desc}</p>
            </div>
          ))}
        </div>

        {/* Additional Section */}
        <div className="my-20 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6">Integrated Channel Manager</h2>
            <p className="text-gray-300 mb-6">
              Sync your inventory across all booking channels (OTA, GDS, direct) in real-time
              to prevent overbooking and maximize revenue.
            </p>
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-center">
                <span className="text-blue-500 mr-2">✓</span> Automatic rate updates
              </li>
              <li className="flex items-center">
                <span className="text-blue-500 mr-2">✓</span> Centralized availability control
              </li>
              <li className="flex items-center">
                <span className="text-blue-500 mr-2">✓</span> Multi-property support
              </li>
            </ul>
          </div>
          <div className="h-64 rounded-xl flex items-center cursor-pointer justify-center bg-[#1e293b]">
            <span className="text-gray-400">Channel Manager Visualization</span>
          </div>
        </div>

        {/* Call to Action */}
        {/* <div className="bg-blue-600 rounded-xl p-12 text-center text-white my-20">
          <h2 className="text-3xl font-bold mb-6">Ready to Transform Your Hotel Operations?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join hundreds of hotels that trust our system to deliver exceptional guest experiences while boosting efficiency.
          </p>
          <button className="bg-white text-blue-600 font-semibold py-3 px-8 rounded-lg transition duration-300 hover:bg-gray-100">
            Request a Demo
          </button>
        </div> */}

        <div className="bg-blue-600 rounded-xl p-12 text-center text-white my-20">
      <h2 className="text-3xl font-bold mb-6">Ready to Transform Your Hotel Operations?</h2>
        <p className="text-xl mb-8 max-w-2xl mx-auto">
         Join hundreds of hotels that trust our system to deliver exceptional guest experiences while boosting efficiency.
          </p>
           <button className="text-blue-600 font-semibold py-3 px-8 rounded-lg transition duration-300">
       Request a Demo
       </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
