
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true }, // Unique integer ID
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
  wishlist: [{ type: Number, ref: 'Movie', required: true }], // References Movie by integer ID
  notifications: [
    {
      type: { type: String, enum: ['booking', 'marketing'], required: true },
      message: { type: String, required: true },
      date: { type: Date, default: Date.now },
      isRead: { type: Boolean, default: false }
    }
  ], employeeDetails: {
    assignedShifts: [{ 
      date: { type: Date, required: true },
      shift: { type: String, enum: ['morning', 'afternoon', 'evening'], required: true },
    }],
    isActive: { type: Boolean, default: true }, // Track active employees
    }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);


const movieSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true }, // Unique integer ID
  title: { type: String, required: true },
  genre: [{ type: String, required: true }],
  releaseDate: { type: Date, required: true },
  rating: { type: Number, min: 0, max: 10, required: true },
  description: { type: String, required: true },
  duration: { type: Number, required: true }, // Duration in minutes
  posterUrl: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Movie', movieSchema);

const reviewSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true }, // Unique integer ID
  stars: { type: Number, min: 1, max: 5, required: true },
  comment: { type: String, required: true },
  movieId: { type: Number, ref: 'Movie', required: true }, // References Movie by integer ID
  userId: { type: Number, ref: 'User', required: true }, // References User by integer ID
  date: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model('Review', reviewSchema);

const bookingSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true }, // Unique integer ID
  user: { type: Number, ref: 'User', required: true }, // References User by integer ID
  movie: { type: Number, ref: 'Movie', required: true }, // References Movie by integer ID
  showtime: { type: Date, required: true },
  seats: [{ type: String, required: true }], // E.g., ['A1', 'A2']
  payment: {
    transactionId: { type: String, required: true },
    amount: { type: Number, required: true },
    status: { type: String, enum: ['success', 'failed', 'pending'], required: true }
  },
  status: { type: String, enum: ['confirmed', 'cancelled'], default: 'confirmed' },
  printed: { type: Boolean, default: false }, // Indicates if a ticket was printed
  handledBy: { type: Number, ref: 'User' }, // Employee who managed the booking
}, { timestamps: true });

module.exports = mongoose.model('Booking', bookingSchema);

const reportSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true }, // Unique integer ID
  generatedBy: { type: Number, ref: 'User', required: true }, // Employee generating the report
  date: { type: Date, required: true },
  type: { type: String, enum: ['booking', 'inquiry', 'other'], required: true },
  data: { type: mongoose.Schema.Types.Mixed, required: true }, // Flexible field for storing report data
}, { timestamps: true });

module.exports = mongoose.model('Report', reportSchema);

const shiftSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true }, // Unique integer ID
  employeeId: { type: Number, ref: 'User', required: true }, // References User by ID
  date: { type: Date, required: true },
  shift: { type: String, enum: ['morning', 'afternoon', 'evening'], required: true },
  status: { type: String, enum: ['assigned', 'requested', 'approved', 'declined'], default: 'assigned' },
  requestDetails: { // Optional field for change requests
    requestedBy: { type: Number, ref: 'User' }, // Employee who requested
    requestedShift: { type: String, enum: ['morning', 'afternoon', 'evening'] },
    requestDate: { type: Date }
  }
}, { timestamps: true });

module.exports = mongoose.model('Shift', shiftSchema);

const inquirySchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  customerId: { type: Number, ref: 'User', required: true }, // Customer making the inquiry
  employeeId: { type: Number, ref: 'User' }, // Employee handling the inquiry
  details: { type: String, required: true }, // Inquiry description
  date: { type: Date, default: Date.now },
  status: { type: String, enum: ['open', 'closed'], default: 'open' },
}, { timestamps: true });

module.exports = mongoose.model('Inquiry', inquirySchema);


const ShowSchema = new mongoose.Schema({
  movieId: { type: mongoose.Schema.Types.ObjectId, ref: 'Movie', required: true },
  showDate: { type: Date, required: true },
  showTime: { type: String, required: true }, // e.g., "18:00"
  seatsAvailable: { type: Number, required: true },
  totalSeats: { type: Number, required: true },
  isAvailable: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Show', ShowSchema);

const bcrypt = require('bcryptjs');
const adminSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['admin'], default: 'admin', required: true },
}, { timestamps: true });

adminSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

adminSchema.methods.matchPassword = async function(password) {
  return await bcrypt.compare(password, this.password);
};

module.exports = mongoose.model('Admin', adminSchema);


const EmployeeSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  phone: { type: String, required: true },
  position: { type: String, required: true },
  shift: { type: String }, 
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Employee', EmployeeSchema);
