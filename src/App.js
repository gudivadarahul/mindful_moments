import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Signup from './components/auth/Signup';
import Login from './components/auth/Login';
import Navbar from './components/Navbar';
import UserPage from './components/UserPage';

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/user-page" element={<UserPage />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<div>Mindful Moments Landing Page</div>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
