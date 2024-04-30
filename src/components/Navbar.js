import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 20px', backgroundColor: '#f0f0f0' }}>
      <div>
        <Link to="/" style={{ textDecoration: 'none', color: 'black', fontWeight: 'bold' }}>
          Mindful Moments
        </Link>
      </div>
      <div>
        <Link to="/login" style={{ marginRight: '10px', textDecoration: 'none', color: 'black' }}>Log In</Link>
        <Link to="/signup" style={{ textDecoration: 'none', color: 'black' }}>Sign Up</Link>
      </div>
    </nav>
  );
}

export default Navbar;
