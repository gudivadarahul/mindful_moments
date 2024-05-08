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

// Get weekly goals for a specific week using session UserId
router.get('/', checkAuthenticated, async (req, res) => {
  const { weekStartDate } = req.query;
  try {
    const goals = await WeeklyGoals.findOne({
      userId: req.session.userId,
      weekStartDate: new Date(weekStartDate)
    });
    if (!goals) {
      return res.status(404).send('No goals found for this week.');
    }
    res.json(goals);
  } catch (error) {
    res.status(500).send('Server Error: ' + error.message );
  }
});

// POST route to create or update weekly goals
router.post('/', checkAuthenticated, async (req, res) => {
  const { weekStartDate, goals } = req.body;
  try {
      let weeklyGoals = await WeeklyGoals.findOneAndUpdate(
          { userId: req.session.userId, weekStartDate: new Date(weekStartDate) },
          { $set: { goals: goals } },
          { new: true, upsert: true }
      );
      res.json(weeklyGoals);
  } catch (error) {
      res.status(500).send('Server error: ' + error.message);
  }
});

// Delete weekly goals
router.delete('/', checkAuthenticated, async (req, res) => {
  const { weekStartDate } = req.query;
  try {
      const result = await WeeklyGoals.findOneAndDelete({
          userId: req.session.userId,
          weekStartDate: new Date(weekStartDate)
      });
      if (!result) {
          return res.status(404).json({ message: 'No goals found to delete.' });
      }
      res.json({ message: 'Goals deleted successfully' });
  } catch (error) {
      res.status(500).json({ message: 'Server error: ' + error.message });
  }
});

module.exports = router;