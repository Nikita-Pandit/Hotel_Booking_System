// import React, { useState } from 'react';
// import axios from 'axios';
// import { useParams, useNavigate } from 'react-router-dom';
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// const ResetPassword = () => {
//   const backendUrl = import.meta.env.VITE_BACKEND_URL;
  
//   const [password, setPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const { token } = useParams();
//   const navigate = useNavigate();
// console.log(token)
//   const handleResetPassword = async () => {
//     if (password !== confirmPassword) {
//       toast.error('Passwords do not match.');
//       return;
//     }
// console.log(password)
// console.log(token)
//     try {
//       await axios.post(`${backendUrl}/api/auth/reset-password`, {
//         token,
//         password,
//       });
//       toast.success('Password reset successful.');
//       navigate('/Login');
//     } catch (error) {
//       toast.error('Failed to reset password. Please try again.');
//     }
//   };

//   return (
//     <>
//     <ToastContainer/>
//     <div className="flex flex-col form-container items-center justify-center min-h-screen gap-3">
//       <h1>Reset Password</h1>
//       <input
//     className="input-field bg-zinc-500 p-3 text-white"
//         type="password"
//         placeholder="Enter new password"
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//       />
//       <input
//        className="input-field bg-zinc-500 p-3 text-white"
//         type="password"
//         placeholder="Confirm new password"
//         value={confirmPassword}
//         onChange={(e) => setConfirmPassword(e.target.value)}
//       />
//       <button onClick={handleResetPassword}>Reset Password</button>
//       {/* <input onClick={handleResetPassword} className="px-5 py-2 bg-blue-500 rounded-lg" value="Reset Password"/> */}
//     </div>
//     </>
//   );
// };

// export default ResetPassword;











import React, { useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaLock } from 'react-icons/fa';

const ResetPassword = () => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { token } = useParams();
  const navigate = useNavigate();

  const handleResetPassword = async () => {
    if (password !== confirmPassword) {
      toast.error('Passwords do not match.');
      return;
    }

    try {
      await axios.post(`${backendUrl}/api/auth/reset-password`, {
        token,
        password,
      });
      toast.success('Password reset successful.');
      navigate('/Login');
    } catch (error) {
      toast.error('Failed to reset password. Please try again.');
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#0f172a] to-[#1e293b] px-4">
        <div className="bg-[#0f172a] text-white rounded-2xl shadow-xl max-w-md w-full p-8 border-t-4 border-blue-500">
          <div className="flex justify-center mb-4">
            <div className="bg-blue-600 p-3 rounded-full">
              <FaLock className="text-2xl text-white" />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-center mb-1">Reset Password</h2>
          <p className="text-sm text-center mb-6 text-gray-400">Enter your new password below</p>

          <div className="mb-4">
            <input
              type="password"
              placeholder="New Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-[#1e293b] border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-6">
            <input
              type="password"
              placeholder="Confirm New Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-3 bg-[#1e293b] border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            onClick={handleResetPassword}
            className="w-full bg-blue-600 hover:bg-blue-700 transition duration-300 text-white font-semibold py-3 rounded-lg"
          >
            Reset Password
          </button>

          <div className="text-center mt-4 text-sm text-gray-400">
            Remembered your password?{' '}
            <span
              className="text-blue-500 hover:underline cursor-pointer"
              onClick={() => navigate('/Login')}
            >
              Go to login
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default ResetPassword;
