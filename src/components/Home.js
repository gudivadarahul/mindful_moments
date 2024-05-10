import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import progressImage from "../images/progress.png";
import reflectionImage from "../images/reflection.png";
import mindfulnessImage from "../images/mindfulness.png";

function Home() {
  return (
    <div className="home-container">
      <div className="main-content">
        <nav className="home-nav">
          <h1>Mindful Moments</h1>
          <div>
            <Link to="/login" className="nav-link">
              Login
            </Link>
            <Link to="/signup" className="nav-link signup">
              Sign Up
            </Link>
          </div>
        </nav>
        <header className="home-header">
          <div className="header-content">
            <h2>Welcome to Your Personal Growth Path</h2>
            <p>
              Discover mindfulness and self-improvement with Kaizen Journal,
              your daily companion for personal growth.
            </p>
            <Link to="/signup" className="signup-button">
              Get Started
            </Link>
          </div>
        </header>
        <section className="features">
          <div className="feature">
            <img src={progressImage} alt="Progress" />
            <h3>Track Your Progress</h3>
            <p>
              Monitor your daily habits, visualize your progress, and see how
              you improve over time.
            </p>
          </div>
          <div className="feature">
            <img src={reflectionImage} alt="Reflection" />
            <h3>Reflect Daily</h3>
            <p>
              Engage in daily reflections to better understand your thoughts and
              emotions, fostering a deeper sense of self-awareness.
            </p>
          </div>
          <div className="feature">
            <img src={mindfulnessImage} alt="Mindfulness" />
            <h3>Stay Mindful</h3>
            <p>
              Access guided meditations and mindfulness exercises to stay
              balanced and centered, no matter where you are.
            </p>
          </div>
        </section>
      </div>
      <footer className="home-footer">
        <p>© 2024 Kaizen Journal. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default Home;
