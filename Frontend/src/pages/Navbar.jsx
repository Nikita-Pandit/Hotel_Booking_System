// import { Link } from 'react-router-dom';
// import { useEffect, useState } from "react";

// const Navbar = () => {
//   const [customerID, setCustomerID] = useState(localStorage.getItem("customerID"));

//   // Check if current route matches nav link
//   const handleLogout = () => {
//     localStorage.removeItem("customerID");
//     localStorage.removeItem("token"); // Remove token on logout
//     setCustomerID(null);

//   };

//   // Optional: Listen for changes in localStorage
//   useEffect(() => {
//     const handleStorageChange = () => {
//       setCustomerID(localStorage.getItem("customerID"));
//     };

//     window.addEventListener('storage', handleStorageChange);
//     return () => window.removeEventListener('storage', handleStorageChange);
//   }, []);

//   return (
//     <nav>
//    <Link to="/DashBoard">Dashboard</Link>
//    <Link to="/rooms">Rooms</Link>      
//       {customerID ? (
     
         
//           <button onClick={handleLogout}>Logout</button>
 
//       ) : (
//         <Link to="/Login">Login</Link>
//       )}
//     </nav>
//   );
// };

// export default Navbar;

import { Link } from 'react-router-dom';
import { useEffect, useState } from "react";

const Navbar = () => {
  const [customerID, setCustomerID] = useState(localStorage.getItem("customerID"));

  const handleProtectedLinkClick = (e) => {
    if (!customerID) {
      e.preventDefault();
      alert("Please login first");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("customerID");
    localStorage.removeItem("token");
    setCustomerID(null);
  };

  useEffect(() => {
    const handleStorageChange = () => {
      setCustomerID(localStorage.getItem("customerID"));
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  return (
    <nav>
      <Link 
        to="/dashboard" 
        onClick={handleProtectedLinkClick}
        style={!customerID ? { pointerEvents: "none", opacity: 0.6 } : {}}
      >
        Dashboard
      </Link>
      <Link 
        to="/rooms" 
        onClick={handleProtectedLinkClick}
        style={!customerID ? { pointerEvents: "none", opacity: 0.6 } : {}}
      >
        Rooms
      </Link>
      {customerID ? (
        <button onClick={handleLogout}>Logout</button>
      ) : (
        <Link to="/Login">Login</Link>
      )}
    </nav>
  );
};

export default Navbar;

