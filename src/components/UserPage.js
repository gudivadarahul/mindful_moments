import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import "./UserPage.css";
import { nanoid } from "nanoid";

function UserPage() {
  const [username, setUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [weeklyGoals, setWeeklyGoals] = useState([]);
  const [unsavedChanges, setUnsavedChanges] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkSession = async () => {
      try {
        const response = await fetch("/users/check-session", {
          credentials: "include",
        });
        const data = await response.json();
        if (!data.isLoggedIn) {
          navigate("/login");
        } else {
          fetchUserPage();
          fetchWeeklyGoals();
        }
      } catch (error) {
        console.error("Session check failed:", error);
      }
    };
    checkSession();
  }, [navigate]);

  const fetchUserPage = async () => {
    try {
      const response = await fetch("/users/user-page");
      if (!response.ok) throw new Error("Failed to fetch user data");
      const data = await response.text();
      setUsername(data);
    } catch (error) {
      console.error("Fetching user data failed:", error);
      navigate("/login");
    }
  };

  const fetchWeeklyGoals = async () => {
    try {
      const response = await fetch(`/api/weekly-goals`, {
        credentials: "include",
      });
      if (!response.ok) throw new Error("Failed to fetch goals");
      const data = await response.json();
      if (data.goals && data.goals.length > 0) {
        const goalsWithIds = data.goals.map((goal) => ({ ...goal, id: nanoid() }));
        setWeeklyGoals(goalsWithIds);
      } else {
        const defaultGoals = [
          { id: nanoid(), text: "", completed: false },
          { id: nanoid(), text: "", completed: false },
          { id: nanoid(), text: "", completed: false },
        ];
        setWeeklyGoals(defaultGoals);
      }
    } catch (error) {
      console.error("Error fetching weekly goals:", error);
    }
  };

  const updateGoalText = (id, text) => {
    setWeeklyGoals((prevGoals) =>
      prevGoals.map((goal) => (goal.id === id ? { ...goal, text: text } : goal))
    );
    setUnsavedChanges(true);
  };

  const toggleGoalCompletion = (id) => {
    setWeeklyGoals((prevGoals) =>
      prevGoals.map((goal) =>
        goal.id === id ? { ...goal, completed: !goal.completed } : goal
      )
    );
    setUnsavedChanges(true);
  };

  const handleLogout = async () => {
    try {
      const response = await fetch("/api/weekly-goals", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ goals: weeklyGoals }),
        credentials: "include",
      });
      if (!response.ok) throw new Error("Failed to save goals");
    } catch (error) {
      console.error("Error saving goals:", error);
    }
    try {
      const response = await fetch("/users/logout");
      if (!response.ok) throw new Error("Logout failed");
      navigate("/");
    } catch (error) {
      alert(error.message);
    }
  };

  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/users/update-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ newPassword }),
      });
      if (!response.ok) throw new Error("Failed to update password");
      alert("Password updated successfully");
      setShowPasswordForm(false);
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="user-page-container">
      <nav className="user-nav">
        <a href="/" className="brand-name">
          Mindful Moments
        </a>
        <div className="nav-links">
          <button onClick={handleLogout} className="logout-button">
            Log Out
          </button>
          <button
            onClick={() => setShowPasswordForm(!showPasswordForm)}
            className="change-password-button"
          >
            <span className="button-text">Change Password</span>
          </button>
        </div>
      </nav>
      <div className="user-info">
        <span className="welcome-message">Welcome, {username}</span>
      </div>
      <div className="main-content">
        <div className="goals-container">
          <h2>Your Weekly Goals</h2>
          {weeklyGoals.length > 0 ? (
            <ol>
              {weeklyGoals.map((goal) => (
                <li
                  key={goal.id}
                  className={`goal-item ${goal.completed ? "completed" : ""}`}
                >
                  <input
                    type="checkbox"
                    checked={goal.completed}
                    onChange={() => toggleGoalCompletion(goal.id)}
                    className="goal-checkbox"
                  />
                  <input
                    type="text"
                    value={goal.text}
                    onChange={(e) => updateGoalText(goal.id, e.target.value)}
                    className="goal-input"
                    name="goal-text"
                  />
                </li>
              ))}
            </ol>
          ) : (
            <ol>
              {[1, 2, 3].map((index) => (
                <li key={index} className="goal-item">
                  <input type="checkbox" className="goal-checkbox" />
                  <input
                    type="text"
                    onChange={(e) => updateGoalText(index, e.target.value)}
                    className="goal-input"
                    name="goal-text"
                  />
                </li>
              ))}
            </ol>
          )}
        </div>
        {showPasswordForm && (
          <form onSubmit={handleUpdatePassword} className="form-container">
            <label className="form-label">
              New Password:
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="input-field"
              />
            </label>
            <button type="submit" className="submit-button">
              Update Password
            </button>
          </form>
        )}
      </div>
      <footer className="user-footer">
        <p>© 2024 Rahul Gudivada. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default UserPage;
