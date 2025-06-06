const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['user', 'employee', 'admin'], default: 'user' },
    socialLogin: {
      googleId: { type: String, default: null },
      facebookId: { type: String, default: null },
    },
    contact: {
      phone: { type: String, default: '' },
      address: { type: String, default: '' },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);
