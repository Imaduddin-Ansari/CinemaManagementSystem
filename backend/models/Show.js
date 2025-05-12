const mongoose = require('mongoose');
const ShowSchema = new mongoose.Schema({
    movieId: { type: mongoose.Schema.Types.ObjectId, ref: 'Movie', required: true },
    showDate: { type: Date, required: true },
    showTime: { type: String, required: true }, // e.g., "18:00"
    seatsAvailable: { type: Number, required: true },
    totalSeats: { type: Number, required: true },
    isAvailable: { type: Boolean, default: true },
    createdAt: { type: Date, default: Date.now },
  });
  
  module.exports = mongoose.model('Show', ShowSchema);