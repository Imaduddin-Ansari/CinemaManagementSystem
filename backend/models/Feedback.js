const mongoose = require('mongoose');
// Feedback Schema (New)
const feedbackSchema = new mongoose.Schema({
    userId: { type: Number, ref: 'User', required: true }, // References User
    message: { type: String, required: true },
    date: { type: Date, default: Date.now },
    rating: { type: Number, min: 1, max: 5, required: true }, // Rating out of 5
  }, { timestamps: true });
  
  module.exports = mongoose.model('Feedback', feedbackSchema);