// import React from 'react'

// const Signup = () => {
//   return (
//     <div>
//           <div className='flex flex-col items-center justify-center h-screen bg-gray-100'>
//       <h1 className='text-3xl font-semibold text-gray-800'>Sign Up</h1>
//       <form className='mt-4 p-6 bg-white rounded-lg shadow-md'>
//         <input type='text' placeholder='Full Name' className='w-full p-2 border rounded mb-4' />
//         <input type='email' placeholder='Email' className='w-full p-2 border rounded mb-4' />
//         <input type='password' placeholder='Password' className='w-full p-2 border rounded mb-4' />
//         <button className='w-full bg-green-500 text-white py-2 rounded'>Sign Up</button>
//       </form>
//     </div>
//     </div>
//   )
// }

// export default Signup


// import React, { useState } from 'react';
// import axios from 'axios';

// const Signup = () => {
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   const backendUrl = import.meta.env.VITE_BACKEND_URL;
// console.log(backendUrl); 

//   const handleSignup = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post(`${backendUrl}/api/auth/signup`, { name, email, password });
//       alert(response.data.message);
//     } catch (error) {
//       console.error('Signup Error:', error);
//     }
//   };

//   return (
//     <div className='flex flex-col items-center justify-center h-screen bg-black-100'>
//       <h1 className='text-3xl font-semibold text-gray-800'>Sign Up</h1>
//       <form className='mt-4 p-6 bg-white rounded-lg shadow-md' onSubmit={handleSignup}>
//         <input type='text' placeholder='Full Name' className='w-full p-2 border rounded mb-4' value={name} onChange={(e) => setName(e.target.value)} />
//         <input type='email' placeholder='Email' className='w-full p-2 border rounded mb-4' value={email} onChange={(e) => setEmail(e.target.value)} />
//         <input type='password' placeholder='Password' className='w-full p-2 border rounded mb-4' value={password} onChange={(e) => setPassword(e.target.value)} />
//         <button type='submit' className='w-full bg-green-500 text-white py-2 rounded'>Sign Up</button>
//       </form>
//     </div>
//   );
// };
// export default Signup;



import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { UserPlus, Mail, Phone, Lock, User } from 'lucide-react';
import 'react-toastify/dist/ReactToastify.css';

const SignUp = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [contact, setContact] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // useEffect(() => {
  //   const queryParams = new URLSearchParams(location.search);
  //   const id = queryParams.get('id');
  //   if (id) {
  //     localStorage.setItem("customerID", id);
  //   }
  // }, [location]);


  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      
      const backendUrl = import.meta.env.VITE_BACKEND_URL;
      const response = await axios.post(`${backendUrl}/api/auth/signup`, {
        name,
        email,
        contact,
        password,
      });

      if (response.data.success) {
        toast.success('Verification email sent! Please check your inbox.', {
          style: { color: '#1111' },
        });
      }
    } catch (error) {
      console.error('Error sending verification email:', error);
      toast.error('Failed to send verification email.', {
        style: { color: '#111' },
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-gray-900 to-gray-800">
      <ToastContainer 
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      
      <div className="relative w-full max-w-md">
        {/* Animated background elements */}
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-indigo-900 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-purple-900 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/4 -right-10 w-64 h-64 bg-blue-900 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
        
        {/* Main card */}
        <div className="relative bg-gray-800/80 backdrop-blur-lg rounded-2xl shadow-xl overflow-hidden border border-gray-700/30 hover:border-gray-600/50 transition-all duration-300">
          {/* Decorative header */}
          <div className="h-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-blue-500"></div>
          
          <div className="px-8 py-10">
            <div className="flex flex-col items-center mb-8">
              <div className="p-3 rounded-full bg-gradient-to-br from-indigo-500 to-blue-500 shadow-lg">
                <UserPlus className="text-white" size={28} />
              </div>
              <h1 className="mt-4 text-3xl font-bold text-white">Create Account</h1>
              <p className="mt-2 text-gray-400">Join our community today</p>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-4">
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <User className="text-gray-400 group-focus-within:text-indigo-400 transition-colors" size={18} />
                  </div>
                  <input
                    className="w-full pl-10 pr-4 py-3 bg-gray-700/40 text-white rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none transition-all border border-gray-600/30 hover:border-gray-500/50 group-focus-within:border-indigo-400 placeholder-gray-400"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Full Name"
                  />
                </div>
                
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <Mail className="text-gray-400 group-focus-within:text-indigo-400 transition-colors" size={18} />
                  </div>
                  <input
                    className="w-full pl-10 pr-4 py-3 bg-gray-700/40 text-white rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none transition-all border border-gray-600/30 hover:border-gray-500/50 group-focus-within:border-indigo-400 placeholder-gray-400"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email Address"
                  />
                </div>
                
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <Phone className="text-gray-400 group-focus-within:text-indigo-400 transition-colors" size={18} />
                  </div>
                  <input
                    className="w-full pl-10 pr-4 py-3 bg-gray-700/40 text-white rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none transition-all border border-gray-600/30 hover:border-gray-500/50 group-focus-within:border-indigo-400 placeholder-gray-400"
                    type="tel"
                    required
                    value={contact}
                    onChange={(e) => setContact(e.target.value)}
                    placeholder="Phone Number"
                  />
                </div>
                
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <Lock className="text-gray-400 group-focus-within:text-indigo-400 transition-colors" size={18} />
                  </div>
                  <input
                    className="w-full pl-10 pr-4 py-3 bg-gray-700/40 text-white rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none transition-all border border-gray-600/30 hover:border-gray-500/50 group-focus-within:border-indigo-400 placeholder-gray-400"
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                  />
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="terms"
                    aria-describedby="terms"
                    type="checkbox"
                    required
                    className="w-4 h-4 bg-gray-700 rounded border-gray-600 focus:ring-3 focus:ring-indigo-400"
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="terms" className="font-light text-gray-400">
                    I agree to the <a className="font-medium text-indigo-400 hover:underline" href="#">Terms and Conditions</a> and <a className="font-medium text-indigo-400 hover:underline" href="#">Privacy Policy</a>
                  </label>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 px-4 rounded-lg bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-medium hover:opacity-90 transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 focus:ring-offset-gray-800 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 shadow-lg hover:shadow-indigo-500/20"
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Processing...</span>
                  </>
                ) : (
                  <>
                    <UserPlus size={18} />
                    <span>Create Account</span>
                  </>
                )}
              </button>
            </form>

            <div className="mt-6 text-center text-sm text-gray-400">
              Already have an account?{" "}
              <Link 
                to="/login" 
                className="font-medium text-indigo-400 hover:text-indigo-300 transition duration-200 hover:underline"
              >
                Sign in here
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      {/* Add these styles for the animated blobs */}
      <style jsx>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
};

export default SignUp;