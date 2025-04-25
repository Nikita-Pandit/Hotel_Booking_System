
// import { Link } from 'react-router-dom';
// import { useEffect, useState } from "react";

// const Navbar = () => {
//   const [customerID, setCustomerID] = useState(localStorage.getItem("customerID"));

//   const handleProtectedLinkClick = (e) => {
//     if (!customerID) {
//       e.preventDefault();
//       alert("Please login first");
//     }
//   };

//   const handleLogout = () => {
//     localStorage.removeItem("customerID");
//     localStorage.removeItem("token");
//     setCustomerID(null);
//   };

//   useEffect(() => {
//     const handleStorageChange = () => {
//       setCustomerID(localStorage.getItem("customerID"));
//     };

//     window.addEventListener('storage', handleStorageChange);
//     return () => window.removeEventListener('storage', handleStorageChange);
//   }, []);

//   return (
//     <nav>
//       <Link 
//         to="/dashboard" 
//         onClick={handleProtectedLinkClick}
//         style={!customerID ? { pointerEvents: "none", opacity: 0.6 } : {}}
//       >
//         Dashboard
//       </Link>
//       <Link 
//         to="/rooms" 
//         onClick={handleProtectedLinkClick}
//         style={!customerID ? { pointerEvents: "none", opacity: 0.6 } : {}}
//       >
//         Rooms
//       </Link>
//       {customerID ? (
//         <button onClick={handleLogout}>Logout</button>
//       ) : (
//         <Link to="/Login">Login</Link>
//       )}
//     </nav>
//   );
// };

// export default Navbar;























// import { Link } from 'react-router-dom';
// import { useEffect, useState } from "react";

// const Navbar = () => {
//   const [customerID, setCustomerID] = useState(localStorage.getItem("customerID"));

//   const handleProtectedLinkClick = (e) => {
//     if (!customerID) {
//       e.preventDefault();
//       alert("Please login first");
//     }
//   };

//   const handleLogout = () => {
//     localStorage.removeItem("customerID");
//     localStorage.removeItem("token");
//     setCustomerID(null);
//   };

//   useEffect(() => {
//     const handleStorageChange = () => {
//       setCustomerID(localStorage.getItem("customerID"));
//     };

//     window.addEventListener('storage', handleStorageChange);
//     return () => window.removeEventListener('storage', handleStorageChange);
//   }, []);

//   return (
//     <nav style={{
//       display: 'flex',
//       alignItems: 'center',
//       justifyContent: 'space-between',
//       padding: '1rem 2rem',
//     }}>
//       {/* Logo on the left */}
//       <div style={{ display: 'flex', alignItems: 'center' }}>
//         <img 
//           src="https://via.placeholder.com/40x40?text=HMS" 
//           alt="Hotel Logo" 
//           style={{ marginRight: '10px' }}
//         />
//         {/* <span style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>Hotel Management</span> */}
//       </div>

//       {/* Navigation links in the center */}
//       <div style={{ 
//         display: 'flex', 
//         gap: '2rem',
//         position: 'absolute',
//         left: '50%',
//         transform: 'translateX(-50%)'
//       }}>
//         <Link 
//           to="/" 
//           style={{ 
//             textDecoration: 'none', 
//             color: '#FFFF',
//             fontWeight: '500',
//             padding: '0.5rem 0',
//             borderBottom: '2px solid transparent',
//             transition: 'all 0.3s ease',
//           }}
//           onMouseOver={(e) => e.currentTarget.style.borderBottomColor = '#007bff'}
//           onMouseOut={(e) => e.currentTarget.style.borderBottomColor = 'transparent'}
//         >
//           Home
//         </Link>
//         <Link 
//           to="/dashboard" 
//           onClick={handleProtectedLinkClick}
//           style={!customerID ? { 
//             pointerEvents: "none", 
//             opacity: 0.6,
//             textDecoration: 'none', 
//             color: '#FFFF',
//             fontWeight: '500',
//             padding: '0.5rem 0',
//           } : { 
//             textDecoration: 'none', 
//             color: '#FFFF',
//             fontWeight: '500',
//             padding: '0.5rem 0',
//             borderBottom: '2px solid transparent',
//             transition: 'all 0.3s ease',
//           }}
//           onMouseOver={(e) => customerID && (e.currentTarget.style.borderBottomColor = '#007bff')}
//           onMouseOut={(e) => customerID && (e.currentTarget.style.borderBottomColor = 'transparent')}
//         >
//           Dashboard
//         </Link>
//         <Link 
//           to="/rooms" 
//           onClick={handleProtectedLinkClick}
//           style={!customerID ? { 
//             pointerEvents: "none", 
//             opacity: 0.6,
//             textDecoration: 'none', 
//             color: '#FFFF',
//             fontWeight: '500',
//             padding: '0.5rem 0',
//           } : { 
//             textDecoration: 'none', 
//           color: '#FFFF',
//             fontWeight: '500',
//             padding: '0.5rem 0',
//             borderBottom: '2px solid transparent',
//             transition: 'all 0.3s ease',
//           }}
//           onMouseOver={(e) => customerID && (e.currentTarget.style.borderBottomColor = '#007bff')}
//           onMouseOut={(e) => customerID && (e.currentTarget.style.borderBottomColor = 'transparent')}
//         >
//           Rooms
//         </Link>
//       </div>

//       {/* Login/Logout on the right */}
//       <div>
//         {customerID ? (
//           <button 
//             onClick={handleLogout}
//             style={{
//               padding: '0.5rem 1.5rem',
//               backgroundColor: 'transparent',
//               color: '#FFFF',
//               border: '1px solid #FFFF',
//               borderRadius: '4px',
//               cursor: 'pointer',
//               fontWeight: '500',
//               transition: 'all 0.3s ease',
//             }}
//             onMouseOver={(e) => {
//               e.currentTarget.backgroundColor = '#f8f9fa';
//               e.currentTarget.color = '#dc3545';
//               e.currentTarget.borderColor = '#dc3545';
//             }}
//             onMouseOut={(e) => {
//               e.currentTarget.backgroundColor = 'transparent';
//               e.currentTarget.color = '#333';
//               e.currentTarget.borderColor = '#333';
//             }}
//           >
//             Logout
//           </button>
//         ) : (
//           <Link 
//             to="/Login"
//             style={{
//               textDecoration: 'none',
//               padding: '0.5rem 1.5rem',
//               backgroundColor: 'transparent',
//               color: '#333',
//               border: '1px solid #333',
//               borderRadius: '4px',
//               fontWeight: '500',
//               transition: 'all 0.3s ease',
//             }}
//             onMouseOver={(e) => {
//               e.currentTarget.backgroundColor = '#f8f9fa';
//               e.currentTarget.color = '#007bff';
//               e.currentTarget.borderColor = '#007bff';
//             }}
//             onMouseOut={(e) => {
//               e.currentTarget.backgroundColor = 'transparent';
//               e.currentTarget.color = '#333';
//               e.currentTarget.borderColor = '#333';
//             }}
//           >
//             Login
//           </Link>
//         )}
//       </div>
//     </nav>
//   );
// };

// export default Navbar;










//-----------------------------------------------------------------------------------------------------------

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
    <nav style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '1rem 2rem',
      backgroundColor: '#1a2a3a',
      boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
      position: 'sticky',
      top: 0,
      zIndex: 1000,
    }}>
      {/* Logo on the left */}
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <svg 
          width="40" 
          height="40" 
          viewBox="0 0 40 40" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          style={{ marginRight: '10px' }}
        >
          <path d="M20 5L5 15V35H35V15L20 5Z" fill="#FFD700" stroke="#FFD700" strokeWidth="2"/>
          <path d="M15 20H25V30H15V20Z" fill="#1a2a3a"/>
          <path d="M10 15H30V20H10V15Z" fill="#1a2a3a"/>
          <circle cx="20" cy="25" r="2" fill="#FFD700"/>
        </svg>
        <span style={{ 
          fontWeight: 'bold', 
          fontSize: '1.2rem',
          color: '#FFD700',
          fontFamily: "'Montserrat', sans-serif"
        }}>
          Grand Horizon
        </span>
      </div>

      {/* Navigation links in the center */}
      <div style={{ 
        display: 'flex', 
        gap: '2rem',
        position: 'absolute',
        left: '50%',
        transform: 'translateX(-50%)'
      }}>
        <Link 
          to="/" 
          style={{ 
            textDecoration: 'none', 
            color: '#FFFFFF',
            fontWeight: '500',
            padding: '0.5rem 0',
            borderBottom: '2px solid transparent',
            transition: 'all 0.3s ease',
          }}
          onMouseOver={(e) => e.currentTarget.style.borderBottomColor = '#FFD700'}
          onMouseOut={(e) => e.currentTarget.style.borderBottomColor = 'transparent'}
        >
          Home
        </Link>
        <Link 
          to="/dashboard" 
          onClick={handleProtectedLinkClick}
          style={!customerID ? { 
            pointerEvents: "none", 
            opacity: 0.6,
            textDecoration: 'none', 
            color: '#FFFFFF',
            fontWeight: '500',
            padding: '0.5rem 0',
          } : { 
            textDecoration: 'none', 
            color: '#FFFFFF',
            fontWeight: '500',
            padding: '0.5rem 0',
            borderBottom: '2px solid transparent',
            transition: 'all 0.3s ease',
          }}
          onMouseOver={(e) => customerID && (e.currentTarget.style.borderBottomColor = '#FFD700')}
          onMouseOut={(e) => customerID && (e.currentTarget.style.borderBottomColor = 'transparent')}
        >
          Dashboard
        </Link>
        <Link 
          to="/rooms" 
          onClick={handleProtectedLinkClick}
          style={!customerID ? { 
            pointerEvents: "none", 
            opacity: 0.6,
            textDecoration: 'none', 
            color: '#FFFFFF',
            fontWeight: '500',
            padding: '0.5rem 0',
          } : { 
            textDecoration: 'none', 
            color: '#FFFFFF',
            fontWeight: '500',
            padding: '0.5rem 0',
            borderBottom: '2px solid transparent',
            transition: 'all 0.3s ease',
          }}
          onMouseOver={(e) => customerID && (e.currentTarget.style.borderBottomColor = '#FFD700')}
          onMouseOut={(e) => customerID && (e.currentTarget.style.borderBottomColor = 'transparent')}
        >
          Rooms
        </Link>
      </div>

      {/* Login/Logout on the right */}
      <div>
        {customerID ? (
          <button 
            onClick={handleLogout}
            style={{
              padding: '0.5rem 1.5rem',
              backgroundColor: 'transparent',
              color: '#FFFFFF',
              border: '1px solid #FFD700',
              borderRadius: '4px',
              cursor: 'pointer',
              fontWeight: '500',
              transition: 'all 0.3s ease',
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(255, 215, 0, 0.1)';
              e.currentTarget.style.color = '#FFD700';
              e.currentTarget.style.borderColor = '#FFD700';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.color = '#FFFFFF';
              e.currentTarget.style.borderColor = '#FFD700';
            }}
          >
            Logout
          </button>
        ) : (
          <Link 
            to="/Login"
            style={{
              textDecoration: 'none',
              padding: '0.5rem 1.5rem',
              backgroundColor: 'transparent',
              color: '#FFFFFF',
              border: '1px solid #FFD700',
              borderRadius: '4px',
              fontWeight: '500',
              transition: 'all 0.3s ease',
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(255, 215, 0, 0.1)';
              e.currentTarget.style.color = '#FFD700';
              e.currentTarget.style.borderColor = '#FFD700';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.color = '#FFFFFF';
              e.currentTarget.style.borderColor = '#FFD700';
            }}
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;