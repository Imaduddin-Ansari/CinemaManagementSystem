const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authMiddleware = async (req, res, next) => {
  // Get the token from the cookies
  const token = req.cookies["token"];

  if (!token) return res.status(403).json({ error: 'No token provided' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id); // Set the user in req.user
    if (!req.user) return res.status(404).json({ error: 'User not found' });
    next(); // Continue to the route handler
  } catch (error) {
    res.status(500).json({ error: 'Failed to authenticate token' });
  }
};

// Authorization Middleware for Admins
const isAdmin = (req, res, next) => {
  if (!req.user || req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Access denied. Admins only.' });
  }
  next();
};

// Authorization Middleware for Employees
const isEmployee = (req, res, next) => {
  if (!req.user || req.user.role !== 'employee') {
    return res.status(403).json({ message: 'Access denied. Employees only.' });
  }
  next();
};

module.exports = {authMiddleware,isAdmin, isEmployee};
