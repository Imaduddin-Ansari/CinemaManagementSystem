const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
  bookingId: { type: mongoose.Schema.Types.ObjectId, ref: 'Booking', required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  seatNumbers: [{ type: String, required: true }],
  issueDate: { type: Date, default: Date.now },
  status: { type: String, enum: ['issued', 'cancelled'], default: 'issued' },
}, { timestamps: true });

module.exports = mongoose.model('Ticket', ticketSchema);
