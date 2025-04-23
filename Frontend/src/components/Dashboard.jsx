import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
// import './Dashboard.css';
import axios from "axios"
const Dashboard = () => {
  const [customer, setCustomer] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [activeTab, setActiveTab] = useState('overview');
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch customer data
    const fetchCustomerData = async () => {
      try {
        const customerID = localStorage.getItem('customerID');
        if (!customerID) {
          navigate('/login');
          return;
        }

        const response = await axios.get(`/api/customers/${customerID}`);
        const data = response.data;
        console.log("data in fetchCustomerData", data)
        setCustomer(data);
      } catch (error) {
        console.error('Error fetching customer data:', error);
      }
    };

    // Fetch bookings
    const fetchBookings = async () => {
      try {
        const customerID = localStorage.getItem('customerID');
        const response = await fetch(`/api/bookings?customerID=${customerID}`);
        const data =response.data.info
        setBookings(data);
      } catch (error) {
        console.error('Error fetching bookings:', error);
      }
    };

    fetchCustomerData();
    fetchBookings();
  }, [navigate]);

  // const handleLogout = () => {
  //   localStorage.removeItem('customerID');
  //   localStorage.removeItem('token');
  //   navigate('/login');
  // };

  const cancelBooking = async (bookingId) => {
    try {
      await fetch(`/api/bookings/${bookingId}`, { method: 'DELETE' });
      setBookings(bookings.filter(booking => booking.id !== bookingId));
    } catch (error) {
      console.error('Error canceling booking:', error);
    }
  };

  if (!customer) {
    return <div>Loading...</div>;
  }

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>Welcome, {customer.name}!</h1>
        {/* <button onClick={handleLogout} className="logout-btn">Logout</button> */}
      </header>

      <div className="dashboard-content">
        <nav className="dashboard-sidebar">
          <button 
            className={`sidebar-btn ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            Overview
          </button>
          <button 
            className={`sidebar-btn ${activeTab === 'bookings' ? 'active' : ''}`}
            onClick={() => setActiveTab('bookings')}
          >
            My Bookings
          </button>
          <button 
            className={`sidebar-btn ${activeTab === 'profile' ? 'active' : ''}`}
            onClick={() => setActiveTab('profile')}
          >
            Profile Settings
          </button>
          <Link to="/rooms" className="sidebar-btn">
            Book a Room
          </Link>
        </nav>

        <main className="dashboard-main">
          {activeTab === 'overview' && (
            <div className="overview-section">
              <div className="stats-cards">
                <div className="stat-card">
                  <h3>Upcoming Stays</h3>
                  <p>{bookings.filter(b => new Date(b.checkInDate) > new Date()).length}</p>
                </div>
                <div className="stat-card">
                  <h3>Past Stays</h3>
                  <p>{bookings.filter(b => new Date(b.checkOutDate) < new Date()).length}</p>
                </div>
                <div className="stat-card">
                  <h3>Loyalty Points</h3>
                  <p>{customer.loyaltyPoints || 0}</p>
                </div>
              </div>

              <div className="quick-actions">
                <h2>Quick Actions</h2>
                <div className="action-buttons">
                  <Link to="/rooms" className="action-btn">Book a Room</Link>
                  <button className="action-btn">Contact Support</button>
                  <button className="action-btn">View Special Offers</button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'bookings' && (
            <div className="bookings-section">
              <h2>Your Bookings</h2>
              {bookings.length === 0 ? (
                <p>You don't have any bookings yet. <Link to="/rooms">Book a room now!</Link></p>
              ) : (
                <div className="bookings-list">
                  {bookings.map(booking => (
                    <div key={booking.id} className="booking-card">
                      <div className="booking-info">
                        <h3>{booking.roomType} Room</h3>
                        <p><strong>Check-in:</strong> {new Date(booking.checkInDate).toLocaleDateString()}</p>
                        <p><strong>Check-out:</strong> {new Date(booking.checkOutDate).toLocaleDateString()}</p>
                        <p><strong>Status:</strong> <span className={`status-${booking.status.toLowerCase()}`}>{booking.status}</span></p>
                        <p><strong>Total:</strong> ${booking.totalPrice}</p>
                      </div>
                      <div className="booking-actions">
                        {new Date(booking.checkInDate) > new Date() && (
                          <button 
                            onClick={() => cancelBooking(booking.id)}
                            className="cancel-btn"
                          >
                            Cancel Booking
                          </button>
                        )}
                        <button className="details-btn">View Details</button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'profile' && (
            <div className="profile-section">
              <h2>Profile Settings</h2>
              <form className="profile-form">
                <div className="form-group">
                  <label>Full Name</label>
                  <input type="text" defaultValue={customer.name} />
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input type="email" defaultValue={customer.email} />
                </div>
                <div className="form-group">
                  <label>Phone Number</label>
                  <input type="tel" defaultValue={customer.phone} />
                </div>
                <div className="form-group">
                  <label>Password</label>
                  <input type="password" placeholder="Enter new password" />
                </div>
                <button type="submit" className="save-btn">Save Changes</button>
              </form>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;