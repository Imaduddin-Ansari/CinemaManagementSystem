const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // Encrypted
  role: { type: String, enum: ['user', 'employee', 'admin'], required: true }, // User role
  socialLogin: {
    googleId: { type: String, required: false, default: null },
    facebookId: { type: String, required: false, default: null }
  },
  contact: {
    phone: { type: String, required: true },
    address: { type: String, required: true },
  },
  wishlist: [{ type: Number, ref: 'Movie', required: false }], // References Movie by integer ID
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);