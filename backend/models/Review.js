const mongoose = require('mongoose');
const reviewSchema = new mongoose.Schema({
    stars: { type: Number, min: 1, max: 5, required: true },
    comment: { type: String, required: true },
    movieId: { type: Number, ref: 'Movie', required: true }, // References Movie by integer ID
    userId: { type: Number, ref: 'User', required: true }, // References User by integer ID
    date: { type: Date, default: Date.now }
  }, { timestamps: true });
  
  module.exports = mongoose.model('Review', reviewSchema);