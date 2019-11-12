const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
  contents: String,
  daysAssigned: [{
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

module.exports = mongoose.model('Note', noteSchema);