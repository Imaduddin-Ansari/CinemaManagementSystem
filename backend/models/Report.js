const mongoose = require('mongoose');
const reportSchema = new mongoose.Schema({
    generatedBy: { type: Number, ref: 'User', required: true }, // Employee generating the report
    date: { type: Date, required: true },
    type: { type: String, enum: ['booking', 'inquiry', 'other'], required: true },
    data: { type: mongoose.Schema.Types.Mixed, required: true }, // Flexible field for storing report data
  }, { timestamps: true });
  
  module.exports = mongoose.model('Report', reportSchema);