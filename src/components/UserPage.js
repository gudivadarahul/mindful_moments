import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './UserPage.css';

function UserPage() {
  const [username, setUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [showEmailForm, setShowEmailForm] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('/users/user-page').then(response => {
      if (response.ok) return response.text();
      throw new Error('Network response was not ok.');
    }).then(data => setUsername(data)).catch(() => navigate('/'));
  }, [navigate]);

  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    const response = await fetch('/users/update-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ newPassword })
    });
    if (response.ok) {
      alert('Password updated successfully');
      setShowPasswordForm(false); // Hide the form after update
    } else {
      alert('Failed to update password');
    }
  };

  const handleUpdateEmail = async (e) => {
    e.preventDefault();
    const response = await fetch('/users/update-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ newEmail })
    });
    if (response.ok) {
      alert('Email updated successfully');
      setShowEmailForm(false); // Hide the form after update
    } else {
      alert('Failed to update email');
    }
  };

  const handleLogout = async () => {
    const response = await fetch('/users/logout');
    if (response.ok) {
      navigate('/');
    } else {
      alert('Logout failed');
    }
  };

  return (
    <div className="user-page-container">
      <h1>Welcome {username}</h1>
      <button onClick={handleLogout} className="logout-button">Log Out</button>
      <button onClick={() => setShowPasswordForm(!showPasswordForm)} className="change-password-button">Change Password</button>
      {showPasswordForm && (
        <form onSubmit={handleUpdatePassword} className="form-container">
          <label className="form-label">
            New Password:
            <input type="password" value={newPassword} onChange={e => setNewPassword(e.target.value)} className="input-field" />
          </label>
          <button type="submit" className="submit-button">Update Password</button>
        </form>
      )}
      <button onClick={() => setShowEmailForm(!showEmailForm)} className="change-email-button">Change Email</button>
      {showEmailForm && (
        <form onSubmit={handleUpdateEmail} className="form-container">
          <label className="form-label">
            New Email:
            <input type="email" value={newEmail} onChange={e => setNewEmail(e.target.value)} className="input-field" />
          </label>
          <button type="submit" className="submit-button">Update Email</button>
        </form>
      )}
    </div>
  );

}

export default UserPage;
