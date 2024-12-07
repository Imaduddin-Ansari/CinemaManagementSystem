const mongoose = require('mongoose');
const inquirySchema = new mongoose.Schema({
    customerId: { type: Number, ref: 'User', required: true }, // Customer making the inquiry
    employeeId: { type: Number, ref: 'User' }, // Employee handling the inquiry
    details: { type: String, required: true }, // Inquiry description
    date: { type: Date, default: Date.now },
    status: { type: String, enum: ['open', 'closed'], default: 'open' },
  }, { timestamps: true });
  
  module.exports = mongoose.model('Inquiry', inquirySchema);