const express = require('express');
const router = express.Router();
const WeeklyGoals = require('../models/WeeklyGoals');

// Middleware to check if the user is logged in
function checkAuthenticated(req, res, next) {
  if (!req.session.userId) {
      return res.status(401).send('Unauthorized: No session available');
  }
  next();
}

router.get('/', checkAuthenticated, async (req, res) => {
  try {
    const goals = await WeeklyGoals.findOne({ userId: req.session.userId });
    console.log("Fetched goals:", goals);
    res.json(goals || { goals: [] }); // Send an empty array if no goals found
  } catch (error) {
    console.error("Error fetching weekly goals:", error);
    res.status(500).send('Server Error');
  }
});

// POST route to create or update weekly goals
router.post('/', checkAuthenticated, async (req, res) => {
  const { goals } = req.body; 
  console.log("Received request body:", req.body);
  console.log("Session userId:", req.session.userId);
  if (!goals) {
    console.log("Missing data: goals are required.");
    return res.status(400).send('Goals are required.');
  }

  try {
      let updatedGoals = await WeeklyGoals.findOneAndUpdate(
          { userId: req.session.userId },
          { $set: { goals } },
          { new: true, upsert: true }
      );

      console.log("Updated goals:", updatedGoals);
      res.json(updatedGoals);
  } catch (error) {
    console.error("Error updating/creating weekly goals:", error);
    res.status(500).send('Server error');
  }
});

module.exports = router;