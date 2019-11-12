const mongoose = require('mongoose');

const mealPlanSchema = new mongoose.Schema({
  name: String,
  breakfast: String,
  lunch: String,
  dinner: String,
  daysAssigned: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'day',
  }],
  daysCompleted: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'day',
  }],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
},{
  timestamps: true
  });

module.exports = mongoose.model('MealPlan', mealPlanSchema);