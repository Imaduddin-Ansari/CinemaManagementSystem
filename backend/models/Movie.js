const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    genre: [{ type: String, required: true }],
    releaseDate: { type: Date, required: true },
    rating: { type: Number, min: 0, max: 10, required: true },
    description: { type: String, required: true },
    duration: { type: Number, required: true }, // Duration in minutes
    posterUrl: { type: String, required: true },
    showtimes: [{ type: Date, required: true }] // Array of showtimes
  },
  { timestamps: true }
);

module.exports = mongoose.model('Movie', movieSchema);
