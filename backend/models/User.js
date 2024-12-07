const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    id: { type: Number, required: true, unique: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['user', 'employee', 'admin'], default:'user' },
    socialLogin: {
      googleId: { type: String, default: null },
      facebookId: { type: String, default: null },
    },
    contact: {
      phone: { type: String, default:'' },
      address: { type: String, default:'' },
    },
    wishlist: [{ type: Number, ref: 'Movie', required: false }],
    notifications: [
      {
        type: { type: String, enum: ['booking', 'marketing'], required: false },
        message: { type: String, required: false},
        date: { type: Date, default: Date.now },
        isRead: { type: Boolean, default: false },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);
