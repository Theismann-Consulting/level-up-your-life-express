const mongoose = require('mongoose');

const workoutSchema = new mongoose.Schema({
  name: String,
  description: String,
  importance: {
    type: Number,
    default: 3,
    enums: [1, 3, 5],
  },
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

module.exports = mongoose.model('Workout', workoutSchema);