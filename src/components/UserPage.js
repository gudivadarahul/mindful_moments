import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';

function UserPage() {
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetch('/users/user-page').then(response => {
      if (response.ok) return response.text();
      throw new Error('Network response was not ok.');
    }).then(data => setUsername(data)).catch(() => navigate('/'));
  }, [navigate]);

  const handleLogout = () => {
    fetch('/users/logout').then(response => {
      if (response.ok) {
        navigate('/');
      } else {
        alert('Logout failed');
      }
    });
  };

  return (
    <div>
      <h1>{username}</h1>
      <button onClick={handleLogout}>Log Out</button>
    </div>
  );
}

export default UserPage;