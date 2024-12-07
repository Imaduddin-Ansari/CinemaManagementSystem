const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    movie: { type: mongoose.Schema.Types.ObjectId, ref: 'Movie', required: true },
    showtime: { type: Date, required: true },
    seats: [{ type: String, required: true }], // E.g., ['A1', 'A2']
    payment: {
      transactionId: { type: String, required: true },
      amount: { type: Number, required: true },
      status: { type: String, enum: ['success', 'failed', 'pending'], required: true },
    },
    status: { type: String, enum: ['confirmed', 'cancelled'], default: 'confirmed' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Booking', bookingSchema);
