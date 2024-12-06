const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    id: { type: Number, required: true, unique: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['user', 'employee', 'admin'], required: true },
    socialLogin: {
      googleId: { type: String, default: null },
      facebookId: { type: String, default: null },
    },
    contact: {
      phone: { type: String, required: true },
      address: { type: String, required: true },
    },
    wishlist: [{ type: Number, ref: 'Movie', required: true }],
    notifications: [
      {
        type: { type: String, enum: ['booking', 'marketing'], required: true },
        message: { type: String, required: true },
        date: { type: Date, default: Date.now },
        isRead: { type: Boolean, default: false },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);
