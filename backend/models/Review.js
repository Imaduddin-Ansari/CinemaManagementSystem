const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema(
  {
    stars: { type: Number, min: 1, max: 5, required: true },
    comment: { type: String, required: true },
    movieId: { type: mongoose.Schema.Types.ObjectId, ref: 'Movie', required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    date: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Review', reviewSchema);
