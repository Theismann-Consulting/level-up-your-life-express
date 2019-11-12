const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  name: String,
  description: String,
  recurring: Boolean,
  importance: {
    type: Number,
    default: 3,
    enums: [1, 3, 5],
  },
  daysAssigned: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Day',
  }],
  daysCompleted: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Day',
  }],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
},{
  timestamps: true
  });

module.exports = mongoose.model('Task', taskSchema);