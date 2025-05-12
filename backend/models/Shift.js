const mongoose = require('mongoose');
const shiftSchema = new mongoose.Schema({
    employeeId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // References User by ID
    date: { type: Date, required: true },
    shift: { type: String, enum: ['morning', 'afternoon', 'evening'], required: true },
    status: { type: String, enum: ['assigned', 'requested', 'approved', 'declined'], default: 'assigned' },
    requestDetails: { // Optional field for change requests
      requestedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Employee who requested
      requestedShift: { type: String, enum: ['morning', 'afternoon', 'evening'] },
      requestDate: { type: Date }
    }
  }, { timestamps: true });
  
  module.exports = mongoose.model('Shift', shiftSchema);