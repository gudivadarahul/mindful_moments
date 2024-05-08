const mongoose = require('mongoose');

const weeklyGoalsSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  weekStartDate: {
    type: Date, 
    required: true
  },
  goals: [{
    text: String, 
    completed: { type: Boolean, default: false}
  }]
});

const WeeklyGoals = mongoose.model('WeeklyGoals', weeklyGoalsSchema);

module.exports = WeeklyGoals;