import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import "./navbar.css";
const Navbar = ({ loggedState, setLoggedState }) => {
  const handleLogout = async () => {
    localStorage.removeItem('user');
    await axios.post(`${import.meta.env.VITE_BACKEND_DOMAIN}api/logout`, {}, { withCredentials: true });
    
    setLoggedState(false);
    window.location.href = '/'; // Redirect to login page after logout
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <h4>Elanson</h4>
      </div>
      <Link className='user-btn link-btn' to="/userDetails" >User-Table</Link>
      <div className="navbar-menu">
        <div className="navbar-end" style={{ display: "flex", "alignItems": "center" }}>
          {loggedState ? (
            <>
              <div className="navbar-item">
                <Link to="/me">
                  <img src="https://th.bing.com/th?id=OIP.k7dE2dftQijg3KbpTyIObAHaHa&w=250&h=250&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2" alt="User" className="user-icon" />
                </Link>
              </div>
              <div className="navbar-item">
                <button onClick={handleLogout} className="button is-light link-btn">
                  Logout
                </button>
              </div>
            </>
          ) : (
            <div className="navbar-item">
              <Link to="/login" className="button is-light link-btn">
                Login
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
