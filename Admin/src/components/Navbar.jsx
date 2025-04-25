
import { Link } from 'react-router-dom';


const Navbar = () => {
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
          to="/Home" 
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
          to="/addRoom" 
        
          style={ {
           
            textDecoration: 'none', 
            color: '#FFFFFF',
            fontWeight: '500',
            padding: '0.5rem 0',
            borderBottom: '2px solid transparent',
            transition: 'all 0.3s ease',
          }}
          onMouseOver={(e) => (e.currentTarget.style.borderBottomColor = '#FFD700')}
          onMouseOut={(e) => (e.currentTarget.style.borderBottomColor = 'transparent')}
        >
AddRoom
        </Link>
        <Link 
          to="/roomLists" 
       
          style={{ 
            textDecoration: 'none', 
            color: '#FFFFFF',
            fontWeight: '500',
            padding: '0.5rem 0',
            borderBottom: '2px solid transparent',
            transition: 'all 0.3s ease',
          }}
          onMouseOver={(e) =>  (e.currentTarget.style.borderBottomColor = '#FFD700')}
          onMouseOut={(e) =>  (e.currentTarget.style.borderBottomColor = 'transparent')}
        >
          Rooms
        </Link>
        <Link 
          to="/bookLists" 
       
          style={{ 
            textDecoration: 'none', 
            color: '#FFFFFF',
            fontWeight: '500',
            padding: '0.5rem 0',
            borderBottom: '2px solid transparent',
            transition: 'all 0.3s ease',
          }}
          onMouseOver={(e) =>  (e.currentTarget.style.borderBottomColor = '#FFD700')}
          onMouseOut={(e) =>  (e.currentTarget.style.borderBottomColor = 'transparent')}
        >
          BookedRooms
        </Link>
      </div>

      {/* Login/Logout on the right */}

    </nav>
  );
};

export default Navbar;