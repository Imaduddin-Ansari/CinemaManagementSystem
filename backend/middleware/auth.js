const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authMiddleware = async (req, res, next) => {
  const token = req.cookies["token"] || req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Authentication required" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    console.log("Token verification failed");
    return res.status(401).json({ message: "Invalid token" });
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
