const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    id: { type: Number, required: true, unique: true }, // Unique integer ID
    user: { type: Number, ref: 'User', required: true }, // References User by integer ID
    movie: { type: Number, ref: 'Movie', required: true }, // Reference by custom `id` field
    showtime: { type: Date, required: true },
    seats: [{ type: String, required: true }], // E.g., ['A1', 'A2']
    payment: {
      transactionId: { type: String, required: true },
      amount: { type: Number, required: true },
      status: { type: String, enum: ['success', 'failed', 'pending'], required: true }
    },
    status: { type: String, enum: ['confirmed', 'cancelled'], default: 'confirmed' }
  }, { timestamps: true });
  
  module.exports = mongoose.model('Booking', bookingSchema);