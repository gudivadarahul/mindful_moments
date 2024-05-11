import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Login.css";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (setter) => (event) => {
    setter(event.target.value);
    if (error) setError("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    const response = await fetch("/users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    if (response.ok) {
      navigate("/user-page");
    } else {
      const errorText = await response.text();
      setError(errorText);
    }
  };

  return (
    <div className="login-page">
      <nav className="home-nav">
        <Link to="/" className="brand-name">Mindful Moments</Link>
      </nav>
      <div className="login-container">
        <form onSubmit={handleSubmit} className="login-form">
          <h2>Log In</h2>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={handleInputChange(setUsername)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={handleInputChange(setPassword)}
            required
          />
          <button type="submit">Log In</button>
          <button
            type="button"
            onClick={() => navigate('/signup')}
            className="button"
          >
            Sign Up
          </button>
          {error && <div className="error">{error}</div>}
        </form>
      </div>
    </div>
  );
}

export default Login;
