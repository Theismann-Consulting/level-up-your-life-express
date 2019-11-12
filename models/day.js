const mongoose = require('mongoose');

const daySchema = new mongoose.Schema({
  dayNum: Number,
  date: String,
  day: Number,
  dayOfWeek: String,
  month: Number,
  monthName: String,
  year: Number,
  dayOfYear: Number,
},{
  timestamps: true
  });

module.exports = mongoose.model('Day', daySchema);