import React, { useState } from 'react';
import { useNavigate } from 'react-router';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');  // State to store the error message
  const navigate = useNavigate();

  const handleInputChange = (setter) => (event) => {
    setter(event.target.value);
    if (error) setError('');  // Clear the error when the user starts typing
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');  // Clear previous errors
    const response = await fetch('/users/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });
    if (response.ok) {
      console.log('Login successful');
      const data = await response.text();
      console.log(data);
      navigate('/user-page');
    } else {
      const errorText = await response.text();
      setError(errorText);  // Set the error message to display to the user
      console.error('Login failed:', errorText);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Log In</h2>
      <input type="text" placeholder="Username" value={username} onChange={handleInputChange(setUsername)} required />
      <input type="password" placeholder="Password" value={password} onChange={handleInputChange(setPassword)} required />
      <button type="submit">Log In</button>
      {error && <div style={{ color: 'red', marginTop: '10px' }}>{error}</div>}
    </form>
  );
}

export default Login;
