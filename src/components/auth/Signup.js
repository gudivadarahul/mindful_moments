import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Signup.css";  // Assuming you're using the same CSS file for simplicity

function Signup() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await fetch('/users/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });
    if (response.ok) {
      navigate('/user-page');
    } else {
      const errorText = await response.text();
      setError(errorText);
    }
  };

  return (
    <div className="signup-page">
      <nav className="home-nav">
        <Link to="/" className="brand-name">Mindful Moments</Link>
      </nav>
      <div className="signup-container">
        <form onSubmit={handleSubmit} className="signup-form">
          <h2>Sign Up</h2>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Sign Up</button>
          <button
            type="button"
            onClick={() => navigate('/login')}
            className="button"
          >
            Log in
          </button>
          {error && <div className="error">{error}</div>}
        </form>
      </div>
    </div>
  );
}

export default Signup;
