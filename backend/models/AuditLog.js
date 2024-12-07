const mongoose = require('mongoose');
// Audit Log Schema (New)
const auditLogSchema = new mongoose.Schema({
    action: { type: String, required: true }, // Description of the action
    userId: { type: Number, ref: 'User', required: true }, // References User performing the action
    date: { type: Date, default: Date.now },
    details: { type: mongoose.Schema.Types.Mixed, required: true }, // Flexible field for extra data
  }, { timestamps: true });
  
  module.exports = mongoose.model('AuditLog', auditLogSchema);