import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';  // Importing the CSS for styling

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/" className="navbar-link">
          Mindful Moments
        </Link>
      </div>
      <div className="navbar-links">
        <Link to="/login" className="navbar-link">Log In</Link>
        <Link to="/signup" className="navbar-link">Sign Up</Link>
      </div>
    </nav>
  );
}

export default Navbar;
