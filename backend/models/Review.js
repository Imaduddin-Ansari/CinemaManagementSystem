const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    id: { type: Number, required: true, unique: true }, // Unique integer ID
    stars: { type: Number, min: 1, max: 5, required: true },
    comment: { type: String, required: true },
    movieId: { type: Number, ref: 'Movie', required: true }, // Reference by custom `id` field
    userId: { type: Number, ref: 'User', required: true }, // References User by integer ID
    date: { type: Date, default: Date.now }
  }, { timestamps: true });
  
  module.exports = mongoose.model('Review', reviewSchema);