const mongoose = require('mongoose');
// Ticket Schema (New)
const ticketSchema = new mongoose.Schema({
    bookingId: { type: Number, ref: 'Booking', required: true }, // References Booking
    userId: { type: Number, ref: 'User', required: true }, // References User
    seatNumbers: [{ type: String, required: true }], // Array of seat numbers
    issueDate: { type: Date, default: Date.now },
    status: { type: String, enum: ['issued', 'cancelled'], default: 'issued' },
  }, { timestamps: true });
  
  module.exports = mongoose.model('Ticket', ticketSchema);
  